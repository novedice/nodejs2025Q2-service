export const incrementFilename = (filename: string) => {
  const [fName, ext] = filename.split('.');
  const numbers = '0123456789';
  let end = '';
  let letterName = '';
  for (let i = 0; i < fName.length; i++) {
    if (numbers.includes(fName[i])) {
      end = end + fName[i];
    } else {
      letterName = letterName + fName[i];
    }
  }
  const res = `${letterName}${+end + 1}.${ext}`;
  return res;
};
