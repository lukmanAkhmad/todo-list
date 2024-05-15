const lists = [
    {
        id: '1',
        name: 'Beli Buku'
    },
    {
        id: '2',
        name: 'beli mobil'
    },
];

const List = (name) => {
    let id = Date.now().toString();
    let tasks = [];
    let completed = [];
    return {
        id,
        name,
        tasks,
        completed,
    };
};

const createList = (name) => {
    if(lists.find((lists) => lists.name === name)){
        const list = List(name);
    } else {
        const list = List(name);
    }
    lists.push(list);
} 

export { lists, createList }