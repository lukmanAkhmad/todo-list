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

export { createList, lists };