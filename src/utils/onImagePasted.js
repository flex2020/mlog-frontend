import fileUpload from './fileUpload';
import insertToTextArea from './insertToTextArea';

const onImagePasted = async (dataTransfer, setContent, type) => {
  const files = [];
  for (let index = 0; index < dataTransfer.items.length; index += 1) {
    const file = dataTransfer.files.item(index);
    if (file) files.push(file);
  }

  await Promise.all(
    files.map(async (file) => {
      const url = await fileUpload(file, type);
      const insertedMarkdown = insertToTextArea(`![](${url})`);
      if (!insertedMarkdown) {
        return;
      }
      setContent(insertedMarkdown);
    }),
  );
};

export default onImagePasted;