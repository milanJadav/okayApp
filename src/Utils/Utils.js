import RNFS from 'react-native-fs';
import _ from 'lodash';

export const isFunction = funCtion => _.isFunction(funCtion);

export const getBase64 = image => {
  if (!image) {
    return;
  }

  RNFS.readFile(image, 'base64').then(res => {
    return res;
  });
};

export const getFileName = (filePath = undefined) => {
  if (filePath == undefined) return;

  return filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
};
