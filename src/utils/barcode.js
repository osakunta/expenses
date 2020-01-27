import JsBarcode from 'jsbarcode';

const canvasConfiguration = {
  width: 4,
  height: 160,
  fontSize: 36,
};

const getSerialNumber = (iban, price, referenceNumber, dueDate) => {
  // spec: https://www.finanssiala.fi/maksujenvalitys/dokumentit/Pankkiviivakoodi-opas.pdf
  const padChar = '0';
  let result = '4';
  result += iban.split(' ').join('').substring(2);
  result += Math.floor(price).toString().padStart(6, padChar);
  result += Math.floor((price - Math.floor(price)) * 100).toString().padStart(2, padChar);
  result += padChar.repeat(3);
  result += referenceNumber.toString().padStart(20, padChar);
  result += dueDate.getFullYear().toString().substring(2);
  result += (dueDate.getMonth() + 1).toString().padStart(2, padChar);
  result += (dueDate.getDate()).toString().padStart(2, padChar);
  return result;
};

const writeOnCanvas = (canvas, content) => {
  return JsBarcode(canvas, content, canvasConfiguration);
};

export default function generateBarcode({ iban, totalPrice, referenceNumber, dueDate }) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const serialNumber = getSerialNumber(
    iban,
    totalPrice,
    referenceNumber,
    dueDate,
  );

  writeOnCanvas(canvas, serialNumber);
  context.fill();

  const barcodeAsDataURL = canvas.toDataURL('image/png');

  return barcodeAsDataURL;
}

export { getSerialNumber, writeOnCanvas };
