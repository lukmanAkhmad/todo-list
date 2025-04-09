import { lists, getList, getListIndex } from "./list";
import { saveToLocalStorage } from "./localStorage";

function Task(names) {
    let id = Date.now().toString();
    let name = names;
    let complete = false;
    return {
        id,
        name,
        complete,
    };
};

const createTask = (listId, names) => {
    const task = Task(names);
    const list = getList(listId);
    list.tasks.push(task);
    saveToLocalStorage(lists,listId);
};

export { createTask };

// buat task lalu simpan di lists.task