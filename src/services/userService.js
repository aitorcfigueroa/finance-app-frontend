import axios from '../utils/config/axios.config';

export const userInfo = (token, hashid, id) => {
  const options = {
    headers: {
      'x-access-token': token,
      'sessionid': hashid
    },
    params: {
      id
    }
  }
  
  return axios.get('/user/me', options)
}