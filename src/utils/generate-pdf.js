import * as JsPdf from 'jspdf';

const generatePdf = async (attachments) => {
  const doc = new JsPdf();
  const reader = new FileReader();

  reader.onload = () => {
    doc.addImage(reader.result, 'JPEG', 20, 20, 30, 30);
    doc.save('lasku.pdf');
  };

  reader.readAsDataURL(attachments[0]);
};

export default generatePdf;
