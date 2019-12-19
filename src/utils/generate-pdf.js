import * as JsPdf from 'jspdf';
import { PDFDocument } from 'pdf-lib';

import { fileTypeFromDataURL, readFile, loadImage } from 'utils/file-reader';

const savePdf = async (pdf, fileName) => {
  const pdfBytes = await pdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

const boldText = (doc, string, x, y, options) => {
  doc.setFontType('bold');
  doc.text(string, x, y, options);
  doc.setFontType('normal');
};

const generateBill = (bill, date) => {
  const doc = new JsPdf();
  const splitDescription = doc.splitTextToSize(bill.expensesDescription, 280);
  const totalOffset = 7 * (bill.expenses.length + 1);

  doc.setFontSize(10);

  boldText(doc, 'LASKU', 170, 20);
  doc.text(`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`, 170, 25);

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

  boldText(doc, 'LIITTEET', 15, 260);
  doc.text(`Kappaletta: ${bill.attachments.length}`, 15, 265);

  doc.rect(15, 270, 90, 12);
  doc.text('IBAN:', 15 + 2, 275);
  doc.text(bill.biller.iban, 15 + 2, 280);

  doc.rect(105, 270, 90, 12);
  doc.text('Yhteensä EUR:', 105 + 2, 275);
  doc.text(bill.expensesTotal, 105 + 2, 280);

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
  const fileName = `lasku_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.pdf`;
  const pdfDoc = await PDFDocument.load(generateBill(bill, date));

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
