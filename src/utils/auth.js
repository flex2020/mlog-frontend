import axios from "axios";
import Cookies from "js-cookie"

const auth = () => {
  const jwt = Cookies.get('jwt');
  return axios.post('/admin/auth', null, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  .then(() => {
    return true;
  })
  .catch(() => {
    return false;
  });
}

export default auth;
