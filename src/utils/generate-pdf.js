import * as JsPdf from 'jspdf';

const readFile = (file) => {
  const reader = new FileReader();
  const image = new Image();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    reader.onload = () => {
      image.onerror = () => {
        reject(new DOMException('Problem loading image from FileLoader.'));
      };

      image.onload = () => {
        resolve(image);
      };

      image.src = reader.result;
    };

    reader.readAsDataURL(file);
  });
};

const boldText = (doc, string, x, y, options) => {
  doc.setFontType('bold');
  doc.text(string, x, y, options);
  doc.setFontType('normal');
};

const generateBill = (doc, bill, date) => {
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
    doc.text(expense.price.toFixed(2), 195 - 2, 115 + 2 + offset, { align: 'right' });

    return expense;
  });

  doc.rect(15, 110 + 2 + totalOffset, 150, 7);
  boldText(doc, 'YHTEENSÄ', 15 + 2, 115 + 2 + totalOffset);
  doc.rect(165, 110 + 2 + totalOffset, 30, 7);
  boldText(doc, bill.expensesTotal.toFixed(2), 195 - 2, 115 + 2 + totalOffset, { align: 'right' });

  doc.rect(15, 270, 90, 12);
  doc.text('IBAN:', 15 + 2, 275);
  doc.text(bill.biller.iban, 15 + 2, 280);

  doc.rect(105, 270, 90, 12);
  doc.text('Yhteensä EUR:', 105 + 2, 275);
  doc.text(bill.expensesTotal.toFixed(2), 105 + 2, 280);
};

const generatePdf = async (bill) => {
  const doc = new JsPdf();
  const date = new Date();

  generateBill(doc, bill, date);

  const generatedAttachments = bill.attachments.map(async (attachment) => {
    try {
      const image = await readFile(attachment);
      const aspectRatio = image.width / image.height;

      doc.addPage();
      doc.addImage(image, 'JPEG', 15, 15, 180, 180 * aspectRatio);
    } catch (error) {
      console.error(error);
    }
  });

  Promise.all(generatedAttachments)
    .then(() => doc.save(`lasku_${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.pdf`))
    .catch((error) => console.error(error));
};

export default generatePdf;
