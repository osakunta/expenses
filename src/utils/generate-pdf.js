import * as JsPdf from 'jspdf';
import { PDFDocument } from 'pdf-lib';

import { fileTypeFromDataURL, readFile, loadImage } from 'utils/file-reader';
import { getDatePlusDeltaDays, getFinnishDateRepr } from 'utils/date';
import generateBarcode from 'utils/barcode';

const savePdf = async (pdf, fileName) => {
  const pdfBytes = await pdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

const writeBarcodeToDoc = async (doc, bill, dueDate) => {
  const barcode = generateBarcode({
    iban: bill.biller.iban,
    totalPrice: bill.expensesTotal,
    referenceNumber: '13',
    dueDate,
  });

  const barcodeImage = await loadImage(barcode);
  const ratio = barcodeImage.height / barcodeImage.width;

  // The barcode specification sets the maximum width and height.
  // It also states that the barcode must be at the bottom center of the page.
  const width = 100;
  const height = width * ratio;
  const centeredX = (doc.internal.pageSize.getWidth() - width) / 2;
  const pageBottomY = 275;

  doc.addImage(barcodeImage, 'PNG', centeredX, pageBottomY, width, height);
};

const boldText = (doc, string, x, y, options) => {
  doc.setFontType('bold');
  doc.text(string, x, y, options);
  doc.setFontType('normal');
};

const generateBill = async (bill, date) => {
  const doc = new JsPdf();
  const splitDescription = doc.splitTextToSize(bill.expensesDescription, 280);
  const totalOffset = 7 * (bill.expenses.length + 1);
  const dueDate = getDatePlusDeltaDays(new Date(), 14);

  doc.setFontSize(10);

  boldText(doc, 'LASKU', 170, 20);
  doc.text(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`, 170, 25);

  boldText(doc, 'LASKUTTAJA', 15, 20);
  doc.text(bill.biller.name, 15, 25);
  doc.text(bill.biller.address, 15, 30);
  doc.text(`${bill.biller.zipCode} ${bill.biller.postOffice}`, 15, 35);

  boldText(doc, 'LASKUTETTAVA', 15, 50);
  doc.text('Satalinnan Säätiö', 15, 55);
  doc.text('Lapinrinne 1 A 8', 15, 60);
  doc.text('00180 Helsinki', 15, 65);

  doc.text('Sarjanro 27810795', 50, 55);
  doc.text('PL 872', 50, 60);
  doc.text('00019 SSC', 50, 65);

  boldText(doc, 'KUVAUS', 15, 80);
  doc.text(15, 85, splitDescription);


  boldText(doc, 'ERITTELY', 15, 110);
  doc.rect(15, 110 + 2, 150, 7);
  boldText(doc, 'Nimike', 15 + 2, 115 + 2);
  doc.rect(165, 110 + 2, 30, 7);
  boldText(doc, 'Hinta, EUR', 195 - 2, 115 + 2, { align: 'right' });

  bill.expenses.map((expense, index) => {
    const offset = 7 * (index + 1);

    doc.rect(15, 110 + 2 + offset, 150, 7);
    doc.text(expense.name, 15 + 2, 115 + 2 + offset);
    doc.rect(165, 110 + 2 + offset, 30, 7);
    doc.text(parseFloat(expense.price).toFixed(2), 195 - 2, 115 + 2 + offset, { align: 'right' });

    return expense;
  });

  doc.rect(15, 110 + 2 + totalOffset, 150, 7);
  boldText(doc, 'YHTEENSÄ', 15 + 2, 115 + 2 + totalOffset);
  doc.rect(165, 110 + 2 + totalOffset, 30, 7);
  boldText(doc, bill.expensesTotal, 195 - 2, 115 + 2 + totalOffset, { align: 'right' });

  boldText(doc, 'LIITTEET', 15, 250);
  doc.text(`Kappaletta: ${bill.attachments.length}`, 15, 255);

  doc.rect(15, 260, 60, 12);
  doc.text('IBAN:', 15 + 2, 265);
  doc.text(bill.biller.iban, 15 + 2, 270);

  doc.rect(75, 260, 60, 12);
  doc.text('Yhteensä EUR:', 75 + 2, 265);
  doc.text(bill.expensesTotal, 75 + 2, 270);

  doc.rect(135, 260, 60, 12);
  doc.text('Eräpäivä:', 135 + 2, 265);
  doc.text(getFinnishDateRepr(dueDate), 135 + 2, 270);

  await writeBarcodeToDoc(doc, bill, dueDate);

  return doc.output('arraybuffer');
};

const generateImagePage = async (pdfDoc, image) => {
  try {
    const doc = new JsPdf();
    const ratio = image.height / image.width;

    doc.addImage(image, 'JPEG', 15, 15, 180, 180 * ratio);

    const attachmentDoc = await PDFDocument.load(doc.output('arraybuffer'));
    const [attachmentPage] = await pdfDoc.copyPages(attachmentDoc, [0]);

    pdfDoc.addPage(attachmentPage);
  } catch (error) {
    console.error(error);
  }
};

const concatPdf = async (pdfDoc, pdfDataURL) => {
  const attachmentDoc = await PDFDocument.load(pdfDataURL);
  const attachmentPages = await pdfDoc.copyPages(attachmentDoc, attachmentDoc.getPageIndices());

  attachmentPages.forEach((attachmentPage) => pdfDoc.addPage(attachmentPage));
};

const generatePdf = async (bill) => {
  const date = new Date();
  const fileName = `lasku_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.pdf`;
  const pdfDoc = await PDFDocument.load(await generateBill(bill, date));

  const generatedAttachments = bill.attachments.map(async (attachment) => {
    const dataURL = await readFile(attachment);

    if (fileTypeFromDataURL(dataURL) === 'application/pdf') {
      await concatPdf(pdfDoc, dataURL);
    } else {
      const image = await loadImage(dataURL);

      await generateImagePage(pdfDoc, image);
    }
  });

  Promise.all(generatedAttachments)
    .then(() => savePdf(pdfDoc, fileName))
    .catch((error) => console.error(error));
};

export default generatePdf;
