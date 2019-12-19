export const fileTypeFromDataURL = (dataURL) => {
  return dataURL.split(';')[0].split(':')[1];
};

export const readFile = (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
};

export const loadImage = (fileDataUrl) => {
  const image = new Image();

  return new Promise((resolve, reject) => {
    image.onerror = () => {
      reject(new DOMException('Problem loading image from FileLoader.'));
    };

    image.onload = () => {
      resolve(image);
    };

    image.src = fileDataUrl;
  });
};
