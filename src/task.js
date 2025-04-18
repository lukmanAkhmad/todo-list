import { lists, getList, getListIndex } from "./list";
import { saveToLocalStorage } from "./localStorage";

function Task(titleTask, descriptions, dueDates, prioritys) {
    let id = Date.now().toString();
    let title = titleTask;
    let description = descriptions;
    let dueDate = dueDates;
    let priority = prioritys;
    let complete = false;
    return {
        id,
        title,
        description,
        dueDate,
        priority,
        complete,
    };
};

const createTask = (listId, titleTask, descriptions, dueDates, prioritys) => {
    const task = Task(titleTask, descriptions, dueDates, prioritys);
    const list = getList(listId);
    list.tasks.push(task);
    saveToLocalStorage(lists, listId);
};

const getTaskIndex = (taskItem, taskId) => taskItem.findIndex((task) => task.id === taskId);

const getTask = (taskItem, taskId) => taskItem.find((task) => task.id === taskId);

const deleteTask = (list, taskId) => {
    const taskItem = list.tasks;
    const listId = list.id;
    console.log("test");
    const taskIndex = getTaskIndex(taskItem, taskId);
    taskItem.splice(taskIndex, 1);
    saveToLocalStorage(lists, listId);
};

const editTask = (list, taskId, newName) => {
    const taskItem = list.tasks;
    const listId = list.id;
    const task = getTask(taskItem, taskId);
    task.name = newName;
    saveToLocalStorage(lists, listId);
};

export { createTask, deleteTask, editTask };
