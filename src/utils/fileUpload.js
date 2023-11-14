import axios from "axios";
import Cookies from "js-cookie";

const fileUpload = async (file, type) => {
  let FILE_API = ''
  if (type === '포스트') {
    FILE_API = '/api/posts/file';
  } else if (type === '프로젝트') {
    FILE_API = '/api/projects/file';
  }
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
  return `/api/files/original/${data}`;
}

export default fileUpload;