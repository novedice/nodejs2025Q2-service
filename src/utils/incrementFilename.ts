export const incrementFilename = (filename: string) => {
  const [fName, ext] = filename.split('.');
  const match = fName.match(/(\d+)$/);

  if (match) {
    const num = Number(match[1]) + 1;
    const base = fName.replace(/\d+$/, '');
    return `${base}${num}.${ext}`;
  }

  return `${fName}1.${ext}`;
};
