import { saveToLocalStorage, getFromLocalStorage } from './localStorage';

const lists = getFromLocalStorage() || [
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
    if (lists.find((list) => list.name === name)) {
        const list = List(name + '1');
        lists.push(list);
    } else {
        const list = List(name);
        lists.push(list);
    }
    saveToLocalStorage(lists)
}

const editListName = (listId, newName) => {
    const list = getList(listId);
    list.name = newName;
    saveToLocalStorage(lists, listId);
}

const deleteList = (listId) => {
    const listIndex = getListIndex(listId);
    lists.splice(listIndex, 1);
    saveToLocalStorage(lists, listId);
}

const getList = (listId) => lists.find((list) => list.id === listId);
const getListIndex = (listId) => lists.findIndex((list) => list.id === listId);

export { lists, createList, editListName, deleteList }