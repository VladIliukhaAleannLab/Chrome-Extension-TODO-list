
export const hardCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
};

export const getRandomInt = () => {
    const min = 1;
    const max = 999999;
    return Math.floor(Math.random() * (max - min)) + min;
};


export const INIT_DATA = [
    {
        id: 'Todo',
        items: []
    },
    {
        id: 'In progress',
        items: []
    },
    {
        id: 'Complete',
        items: []
    }
];
