import axios from "axios";

const fileUpload = async (file) => {
  const FILE_API= process.env.REACT_APP_FILE_API ?? '';

  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axios.post(FILE_API, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(data.fileName);
  return `/files/original/${data.fileName}`;
}

export default fileUpload;