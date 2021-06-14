export const updateLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        localStorage.setItem(key, JSON.stringify(null));
    }
};

export const getLocalStoreItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (e) {
        updateLocalStorage(key, null);
        return null
    }
};

export const hardCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
};

export const getRandomInt = () => {
    const min = 1;
    const max = 999999;
    return Math.floor(Math.random() * (max - min)) + min;
};
