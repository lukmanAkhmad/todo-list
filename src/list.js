import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";

let lists = getFromLocalStorage() || [];

function List(names) {
    let id = Date.now().toString();
    let name = names;
    let tasks = [];
    return {
        id,
        name,
        tasks
    };
};

const createList = (names) => {
    const list = List(names);
    lists.push(list);
    saveToLocalStorage(lists);
    console.table(lists);
};

const getListIndex = (listId) => lists.findIndex((list) => list.id === listId);

const deleteList = (listId) => {
    const listIndex = getListIndex(listId);
    lists.splice(listIndex, 1);
    saveToLocalStorage(lists, listId);
};

export { lists, createList, deleteList };