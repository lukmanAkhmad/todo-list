import { lists, getList} from "./list";
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

const editTask = (list, taskId, newTitle, newDescriptions, newDueDates, newPrioritys) => {
    const taskItem = list.tasks;
    const listId = list.id;
    const task = getTask(taskItem, taskId);
    task.title = newTitle;
    task.description = newDescriptions;
    task.dueDate = newDueDates;
    task.priority = newPrioritys;
    saveToLocalStorage(lists, listId);
};

const completeTask = (list, taskId, completeStatus) => {
    const taskItem = list.tasks;
    const listId = list.id;
    const task = getTask(taskItem, taskId);
    task.complete = completeStatus;
    saveToLocalStorage(lists, listId);
}

export { createTask, deleteTask, editTask, completeTask, getTask };
