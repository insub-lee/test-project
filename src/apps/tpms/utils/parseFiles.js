export default function(payload) {
  const nextContent = payload;
  let files = [];
  Object.keys(nextContent).forEach(key => {
    if (key.includes('_UPLOADED_FILES')) {
      const uploadedFiles = JSON.parse(nextContent[key]);
      const translatedFiles = uploadedFiles.map(({ docNo, seq }) => ({ docNo, seq }));
      files = files.concat(translatedFiles);
      delete nextContent[key];
    }
  });
  return { nextContent, files };
}
