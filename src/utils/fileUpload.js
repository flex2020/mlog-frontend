import axios from "axios";
import Cookies from "js-cookie";

const fileUpload = async (file) => {
  const FILE_API= '/api/post/file';
  const jwt = Cookies.get('jwt');

  const formData = new FormData();
  formData.append('file', file);
  const { data } = await axios.post(FILE_API, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${jwt}`
    },
  });
  console.log(`업로드한 파일명: ${data}`);
  return `/files/original/${data}`;
}

export default fileUpload;