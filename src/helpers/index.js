export const updateLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const getLocalStoreItem = (key) => JSON.parse(localStorage.getItem(key));

export const hardCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
};

export const getRandomInt = () => {
    const min = 1;
    const max = 999999;
    return Math.floor(Math.random() * (max - min)) + min;
};
