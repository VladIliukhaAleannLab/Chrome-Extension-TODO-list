import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1' ;
const url = {
    main: '/',
    auth: '/auth'
};

const getUrl = (key) => {
    return `${API_URL}${url[key]}`
};

export const checkServer = async () => {
  try {
      await axios.get(getUrl('main'));
      return true
  } catch (e) {
      return false
  }
};

export const authUser = async (user) => {
    try {
        const {data} = await axios.post(getUrl('auth'), user);
        return data;
    } catch (e) {
        return {...user, isUnavailable: true, message: 'The server is unavailable. To continue offline?'}
    }
};