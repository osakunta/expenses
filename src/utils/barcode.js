import JsBarcode from "jsbarcode";

const _canvasConfiguration = { 
    width: 1.5,
    height: 40,
    fontSize: 10
};

const getSerialNumber = (iban, price, referenceNumber, dueDate) => {
    // spec: https://www.finanssiala.fi/maksujenvalitys/dokumentit/Pankkiviivakoodi-opas.pdf
    const padChar = "0";
    var result = "4";
    result += iban.split(" ").join("").substring(2);
    result += Math.floor(price).toString().padStart(6, padChar);
    result += Math.floor((price - Math.floor(price)) * 100).toString();
    result += padChar.repeat(3);
    result += referenceNumber.toString().padStart(20, padChar);
    result += dueDate.getFullYear().toString().substring(2);
    result += (dueDate.getMonth() + 1).toString().padStart(2, padChar);
    result += (dueDate.getDate()).toString().padStart(2, padChar);
    return result;
  }
  
  const writeOnCanvas = (canvas, content) => {
      return JsBarcode(canvas, content, _canvasConfiguration);
  }

  export { getSerialNumber, writeOnCanvas }
