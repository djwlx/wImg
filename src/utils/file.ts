export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      resolve(reader.result as string);
    });

    reader.addEventListener("error", function () {
      reject(reader.error);
    });

    reader.readAsDataURL(file);
  });
};

export const getSizeLabelByByted = (size: number) => {
  const kb1 = 1024;
  const mb1 = 1048576;
  const gb1 = 1000000000;

  if (size > mb1) {
    return (size / mb1).toFixed(2) + "MB";
  } else if (size > kb1) {
    return (size / kb1).toFixed(2) + "KB";
  }

  return size + "B";
};

export const transArrayToObj = (
  array: any[],
  param: {
    key: string;
    value: any;
  }
) => {
  const { key, value } = param as any;
  const result: any = {};
  array.forEach((item) => {
    const objKey = item[key];
    result[objKey] = value;
  });

  return result;
};
