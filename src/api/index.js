import axios from 'axios';
import {getLocalStoreItem} from "../helpers";

const getApiUrl = () => {
    return getLocalStoreItem('api_url')
};


const url = {
    ping: '/ping',
    auth: '/auth',
    item: '/item',
    sync: '/sync-list'
};

const getUrl = (key) => {
    return `${getApiUrl()}${url[key]}`
};

export const checkServer = async () => {
  try {
      const {data: pong} = await axios.get(getUrl('ping'));
      return pong === 'pong'
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
        checkServer().then((status) => {
            if (status) {
                switch (type) {
                    case 'delete':
                        axios[type](getUrl('item') + `?id=${item.id}&user=${item.user}`).then();
                        break;
                    default:
                        axios[type](getUrl('item'), {item}).then();
                        break
                }
            }
        });

    } catch (e) {

    }
};

export const syncListItems = async (user, list) => {
    try {
        if (!user) return;
        const status = await checkServer();
        if (!status) return;
        const items = list.map((el) => el.items ).flat();
        const {data} = await axios.post(getUrl('sync'), {user, items});
        return data
    } catch (e) {

    }
};

export const syncListItemsForBtn = async (user) => {
    try {
        if (!user) return;
        const {data} = await axios.get(getUrl('sync') + '?user=' + user);
        return data
    } catch (e) {

    }
};
