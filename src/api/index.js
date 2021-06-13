import axios from 'axios';

const API_URL = process.env.REACT_API_URL || 'http://93.78.146.224:9000/api/v1' ;

const url = {
    ping: '/',
    auth: '/auth',
    item: '/item',
    sync: '/sync-list'
};

const getUrl = (key) => {
    return `${API_URL}${url[key]}`
};

export const checkServer = async () => {
  try {
      await axios.get(getUrl('ping'));
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

export const createOtUpdateItem = (item, type) => {
    try {
        switch (type) {
            case 'delete':
                axios[type](getUrl('item') + `?id=${item.id}&user=${item.user}`).then();
                break;
            default:
                axios[type](getUrl('item'), {item}).then();
                break
        }
    } catch (e) {

    }
};

export const syncListItems = async (user, list) => {
    try {
        if (!user) return;
        const items = list.map((el) => el.items ).flat();
        const {data} = await axios.post(getUrl('sync'), {user, items});
        return data
    } catch (e) {

    }
};