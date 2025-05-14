import { lists, createList, deleteList, editList, getList } from "./list";
import { createTask, deleteTask, editTask, completeTask, getTask } from "./task";
import { format } from "date-fns";

import logoIcon from "./assets/img/logo-icon.svg";
import editIcon from "./assets/img/edit-icon.svg";
import deleteIcon from "./assets/img/delete-icon.svg";

function renderScreen() {
    const body = document.querySelector("body");
    const divContainer = document.createElement("div");
    divContainer.setAttribute("id", "div-container");
    body.appendChild(divContainer);
    renderSidebar(divContainer);
    renderHeaderContent(divContainer);
    renderBodyContent(divContainer);
};

function renderSidebar(parentNode) {
    const sidebar = document.createElement("div");
    sidebar.setAttribute("id", "sidebar")
    const headerSidebar = document.createElement("div");
    headerSidebar.classList.add("header-sidebar");

    const imgLogoIcon = document.createElement("img");
    imgLogoIcon.src = logoIcon;
    imgLogoIcon.alt = "Logo Todo List App";
    imgLogoIcon.title = "Logo Todo List App";
    imgLogoIcon.classList.add("logo-icon");
    imgLogoIcon.alt = "Todo List App Logo";

    const nameApp = document.createElement("p");
    nameApp.classList.add("name-app");
    nameApp.textContent = "Todo List App";

    const containerBtnSidebar = document.createElement("div");
    containerBtnSidebar.classList.add("container-button-sidebar");
    const paraSidebar = document.createElement("p");
    paraSidebar.classList.add("para-sidebar");
    paraSidebar.textContent = "My Lists";

    const btnNewList = document.createElement("button");
    btnNewList.setAttribute("id", "btn-new-list");
    btnNewList.textContent = "New List";
    btnNewList.addEventListener("click", () => {
        const dialogElement = document.querySelector("#dialog-create-list");
        dialogElement.showModal();
    });

    const containerTodolist = document.createElement("div");
    containerTodolist.classList.add("container-todolist");

    containerBtnSidebar.appendChild(paraSidebar);
    containerBtnSidebar.appendChild(btnNewList);

    headerSidebar.appendChild(imgLogoIcon);
    headerSidebar.appendChild(nameApp);

    sidebar.appendChild(headerSidebar);
    sidebar.appendChild(containerBtnSidebar);
    renderDialogCreateList(sidebar)
    sidebar.appendChild(containerTodolist);
    createCardList(containerTodolist);

    parentNode.appendChild(sidebar);
};

function renderDialogCreateList(parentNode) {
    const dialogCreateList = document.createElement("dialog");
    dialogCreateList.setAttribute("id", "dialog-create-list");
    const headerDialogCreateList = document.createElement("div");
    headerDialogCreateList.classList.add("header-dialog-create-list");
    const txtHeaderDialogCreateList = document.createElement("h1");
    txtHeaderDialogCreateList.classList.add("txt-header-dialog-create-list");
    txtHeaderDialogCreateList.textContent = "Create List";
    const containerFormList = document.createElement("div");
    containerFormList.setAttribute("id", "container-form-create-list");
    const formList = document.createElement("form");
    formList.setAttribute("action", "");
    formList.setAttribute("id", "form-create-list");
    const inputSectionList = document.createElement("section");
    inputSectionList.classList.add("input-section-create-list");

    const formDivList = document.createElement("div");
    formDivList.classList.add("form-div-create-list");
    const labelListName = document.createElement("label");
    labelListName.classList.add("label-list-name-create-list");
    labelListName.setAttribute("for", "list-name-create-list");
    labelListName.textContent = "List Name";
    const inputListName = document.createElement("input");
    inputListName.setAttribute("id", "list-name-create-list");
    inputListName.setAttribute("type", "text");
    inputListName.setAttribute("name", "list-name-create-list");

    const btnSectionList = document.createElement("section");
    btnSectionList.classList.add("btn-section-create-list");
    const btnCloseModalList = document.createElement("button");
    btnCloseModalList.setAttribute("id", "btn-close-modal-create-list");
    btnCloseModalList.setAttribute("type", "button");
    btnCloseModalList.textContent = "Cancel";
    const btnCreateList = document.createElement("button");
    btnCreateList.setAttribute("id", "btn-save-create-list");
    btnCreateList.setAttribute("type", "submit");
    btnCreateList.textContent = "Create List";

    btnCloseModalList.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogElement = document.querySelector("#dialog-create-list");
        dialogElement.close();
        formList.reset();
    });

    btnCreateList.addEventListener("click", (e) => {
        e.preventDefault();
        const listName = document.querySelector("#list-name-create-list").value;
        const containerTodolist = document.querySelector(".container-todolist");
        containerTodolist.textContent = "";
        createList(listName);
        createCardList(containerTodolist);
        formList.reset();
    });

    formDivList.appendChild(labelListName);
    formDivList.appendChild(inputListName);
    inputSectionList.appendChild(formDivList)
    formList.appendChild(inputSectionList);
    btnSectionList.appendChild(btnCloseModalList);
    btnSectionList.appendChild(btnCreateList);
    formList.appendChild(btnSectionList);
    headerDialogCreateList.appendChild(txtHeaderDialogCreateList);
    containerFormList.appendChild(formList);
    dialogCreateList.appendChild(headerDialogCreateList);
    dialogCreateList.appendChild(containerFormList);
    parentNode.appendChild(dialogCreateList);
};

function createCardList(parentNode) {
    lists.forEach((val) => {
        const card = document.createElement("div");
        card.classList.add("card-list");
        const subCardList = document.createElement("div");
        subCardList.classList.add("sub-card-list");
        const cardListName = document.createElement("p");
        cardListName.classList.add("card-list-name");
        cardListName.textContent = val.name;

        const currentListId = val.id;
        const btnContainerCardList = document.createElement("div");
        btnContainerCardList.classList.add("btn-container-card-list");

        const imgEditIconList = document.createElement("img");
        imgEditIconList.classList.add("edit-icon-img-list");
        imgEditIconList.src = editIcon;
        imgEditIconList.alt = "Edit icon";
        imgEditIconList.title = "Edit icon";

        const imgDeleteIconList = document.createElement("img");
        imgDeleteIconList.classList.add("delete-icon-img-list");
        imgDeleteIconList.src = deleteIcon;
        imgDeleteIconList.alt = "Delete icon";
        imgDeleteIconList.title = "Delete icon";

        imgEditIconList.addEventListener("click", (e) => {
            e.preventDefault();
            renderDialogEditList(parentNode, currentListId);
            const dialogList = document.querySelector("#dialog-edit-list");
            dialogList.showModal();
        });

        imgDeleteIconList.addEventListener("click", () => {
            deleteList(currentListId);
            renderCardList();
            const headerContainer = document.querySelector("#header-content");
            const bodyContent = document.querySelector("#body-content");
            headerContainer.textContent = "";
            bodyContent.textContent = "";
        });

        card.addEventListener("click", () => {
            const cardListsName = document.querySelectorAll(".card-list-active");
            cardListsName.forEach((elem) => {
                elem.classList.remove("card-list-active");
            });
            cardListName.classList.add("card-list-active");

            let findList = getList(currentListId);
            createHeaderContent(findList);
            createCardTaskItem(findList);
        });

        btnContainerCardList.appendChild(imgEditIconList);
        btnContainerCardList.appendChild(imgDeleteIconList);
        subCardList.appendChild(cardListName);
        subCardList.appendChild(btnContainerCardList);
        card.appendChild(subCardList);
        parentNode.appendChild(card);
    });
};

function renderDialogEditList(parentNode, listId) {
    const dialogEditList = document.createElement("dialog");
    dialogEditList.setAttribute("id", "dialog-edit-list");
    const headerDialogEditList = document.createElement("div");
    headerDialogEditList.classList.add("header-dialog-edit-list");
    const txtHeaderDialogAddItem = document.createElement("h1");
    txtHeaderDialogAddItem.classList.add("txt-header-dialog-edit-list");
    txtHeaderDialogAddItem.textContent = "Edit List";
    const containerFormList = document.createElement("div");
    containerFormList.setAttribute("id", "container-form-edit-list");
    const formList = document.createElement("form");
    formList.setAttribute("action", "");
    formList.setAttribute("id", "form-edit-list");
    const inputSectionList = document.createElement("section");
    inputSectionList.classList.add("input-section-edit-list");

    const formDivList = document.createElement("div");
    formDivList.classList.add("form-div-edit-list");
    const labelList = document.createElement("label");
    labelList.classList.add("label-list-name-edit-list");
    labelList.setAttribute("for", "list-name-edit-list");
    labelList.textContent = "List Name";
    const inputList = document.createElement("input");
    inputList.setAttribute("id", "list-name-edit-list");
    inputList.setAttribute("type", "text");
    inputList.setAttribute("name", "list-name-edit-list");

    const btnSectionList = document.createElement("section");
    btnSectionList.classList.add("btn-section-edit-list");
    const btnCloseModalList = document.createElement("button");
    btnCloseModalList.setAttribute("id", "btn-close-modal-edit-list");
    btnCloseModalList.setAttribute("type", "button");
    btnCloseModalList.textContent = "Cancel";
    const btnRenameList = document.createElement("button");
    btnRenameList.setAttribute("id", "btn-save-edit-list");
    btnRenameList.setAttribute("type", "submit");
    btnRenameList.textContent = "Save";

    btnCloseModalList.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogListElement = document.querySelector("#dialog-edit-list");
        dialogListElement.close();
    });

    btnRenameList.addEventListener("click", (e) => {
        e.preventDefault();
        const listNameEditList = document.querySelector("#list-name-edit-list").value;
        editList(listId, listNameEditList);
        renderCardList();
        let findList = getList(listId);
        createHeaderContent(findList);
    });

    formDivList.appendChild(labelList);
    formDivList.appendChild(inputList);
    inputSectionList.appendChild(formDivList)
    formList.appendChild(inputSectionList);
    btnSectionList.appendChild(btnCloseModalList);
    btnSectionList.appendChild(btnRenameList);
    formList.appendChild(btnSectionList);
    headerDialogEditList.appendChild(txtHeaderDialogAddItem);
    containerFormList.appendChild(formList);
    dialogEditList.appendChild(headerDialogEditList);
    dialogEditList.appendChild(containerFormList);
    parentNode.appendChild(dialogEditList);
};

function renderCardList() {
    const containerTodolist = document.querySelector(".container-todolist");
    containerTodolist.textContent = "";
    createCardList(containerTodolist);
}

function renderHeaderContent(parentNode) {
    const headerContainer = document.createElement("div");
    headerContainer.setAttribute("id", "header-content");

    parentNode.appendChild(headerContainer);
};

function createHeaderContent(list) {
    if (list === undefined) return;
    const headerContainer = document.querySelector("#header-content");
    headerContainer.textContent = "";
    const divListName = document.createElement("div");
    divListName.setAttribute("id", "div-list-name");
    divListName.textContent = list.name;
    const btnAddItem = document.createElement("button");
    btnAddItem.setAttribute("id", "btn-add-task");
    btnAddItem.setAttribute("type", "submit");
    btnAddItem.textContent = "Add Task";

    const currentListId = list.id;

    btnAddItem.addEventListener("click", (e) => {
        e.preventDefault();
        renderDialogAddTask(headerContainer, currentListId);
        const dialogAddItem = document.querySelector("#dialog-add-task");
        dialogAddItem.showModal();
    });

    headerContainer.appendChild(divListName);
    headerContainer.appendChild(btnAddItem);
};

function renderDialogAddTask(parentNode, listId) {
    const dialogAddItem = document.createElement("dialog");
    dialogAddItem.setAttribute("id", "dialog-add-task");
    const headerDialogAddItem = document.createElement("div");
    headerDialogAddItem.classList.add("header-dialog-add-task");
    const txtHeaderDialogAddItem = document.createElement("h1");
    txtHeaderDialogAddItem.classList.add("txt-header-dialog-add-task");
    txtHeaderDialogAddItem.textContent = "Add Task";
    const containerFormAddItem = document.createElement("div");
    containerFormAddItem.setAttribute("id", "container-form-add-task");
    const formAddItem = document.createElement("form");
    formAddItem.setAttribute("action", "");
    formAddItem.setAttribute("id", "form-add-task");
    const inputSectionAddItem = document.createElement("section");
    inputSectionAddItem.classList.add("input-section-add-task");

    const formDivTitleTask = document.createElement("div");
    formDivTitleTask.classList.add("form-div-add-task");
    const labelTitleTask = document.createElement("label");
    labelTitleTask.classList.add("label-title-add-task");
    labelTitleTask.setAttribute("for", "title-task");
    labelTitleTask.textContent = "Task Name";
    const inputTitleTask = document.createElement("input");
    inputTitleTask.setAttribute("id", "title-task-add-task");
    inputTitleTask.setAttribute("type", "text");
    inputTitleTask.setAttribute("name", "title-task");

    const formDivDescriptionTask = document.createElement("div");
    formDivDescriptionTask.classList.add("form-div-add-task");
    const labelDescriptionTask = document.createElement("label");
    labelDescriptionTask.classList.add("label-description-add-task");
    labelDescriptionTask.setAttribute("for", "description-task");
    labelDescriptionTask.textContent = "Description";
    const inputDescriptionTask = document.createElement("textarea");
    inputDescriptionTask.setAttribute("id", "description-task-add-task");
    inputDescriptionTask.setAttribute("type", "text");
    inputDescriptionTask.setAttribute("name", "description-task");

    const today = new Date();
    const formDivDueDateTask = document.createElement("div");
    formDivDueDateTask.classList.add("form-div-add-task");
    const labelDueDateTask = document.createElement("label");
    labelDueDateTask.classList.add("label-dueDate-add-task");
    labelDueDateTask.setAttribute("for", "dueDate-task");
    labelDueDateTask.textContent = "Due Date";
    const inputDueDateTask = document.createElement("input");
    inputDueDateTask.setAttribute("id", "dueDate-task-add-task");
    inputDueDateTask.setAttribute("min", format(today, "yyyy-mm-dd"));
    inputDueDateTask.setAttribute("type", "date");
    inputDueDateTask.setAttribute("name", "dueDate-task");

    const formDivPriorityTask = document.createElement("div");
    formDivPriorityTask.classList.add("form-div-add-task");
    const labelPriorityTask = document.createElement("label");
    labelPriorityTask.classList.add("label-priority-add-task");
    labelPriorityTask.setAttribute("for", "priority-task");
    labelPriorityTask.textContent = "Priority";
    const selectPriorityTask = document.createElement("select");
    selectPriorityTask.setAttribute("id", "priority-task-add-task");
    selectPriorityTask.setAttribute("name", "priority");
    const lowOptionPriorityTask = document.createElement("option");
    lowOptionPriorityTask.classList.add("option-priority-task");
    lowOptionPriorityTask.setAttribute("value", "low");
    lowOptionPriorityTask.textContent = "Low";
    const mediumOptionPriorityTask = document.createElement("option");
    mediumOptionPriorityTask.classList.add("option-priority-task");
    mediumOptionPriorityTask.setAttribute("value", "medium");
    mediumOptionPriorityTask.textContent = "Medium";
    const highOptionPriorityTask = document.createElement("option");
    highOptionPriorityTask.classList.add("option-priority-task");
    highOptionPriorityTask.setAttribute("value", "high");
    highOptionPriorityTask.textContent = "High";

    const btnSectionAddItem = document.createElement("section");
    btnSectionAddItem.classList.add("btn-section-add-task");
    const btnCloseModalAddItem = document.createElement("button");
    btnCloseModalAddItem.setAttribute("id", "btn-close-modal-add-task");
    btnCloseModalAddItem.setAttribute("type", "button");
    btnCloseModalAddItem.textContent = "Cancel";
    const btnAddTask = document.createElement("button");
    btnAddTask.setAttribute("id", "btn-submit-add-task");
    btnAddTask.setAttribute("type", "submit");
    btnAddTask.textContent = "Add Task";

    btnCloseModalAddItem.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogAddItemElement = document.querySelector("#dialog-add-task");
        dialogAddItemElement.close();
        formAddItem.reset();
    });

    btnAddTask.addEventListener("click", (e) => {
        e.preventDefault();
        const titlTask = document.querySelector("#title-task-add-task").value;
        const descriptionTask = document.querySelector("#description-task-add-task").value;
        const dueDateTask = document.querySelector("#dueDate-task-add-task").value;
        const priorityTask = document.querySelector("#priority-task-add-task").value;
        createTask(listId, titlTask, descriptionTask, dueDateTask, priorityTask);
        let findList = getList(listId);
        renderCardTaskItem(findList);
        formAddItem.reset();
    });

    selectPriorityTask.appendChild(lowOptionPriorityTask);
    selectPriorityTask.appendChild(mediumOptionPriorityTask);
    selectPriorityTask.appendChild(highOptionPriorityTask);

    formDivTitleTask.appendChild(labelTitleTask);
    formDivTitleTask.appendChild(inputTitleTask);
    inputSectionAddItem.appendChild(formDivTitleTask);
    formDivDescriptionTask.appendChild(labelDescriptionTask);
    formDivDescriptionTask.appendChild(inputDescriptionTask);
    inputSectionAddItem.appendChild(formDivDescriptionTask);
    formDivDueDateTask.appendChild(labelDueDateTask);
    formDivDueDateTask.appendChild(inputDueDateTask);
    inputSectionAddItem.appendChild(formDivDueDateTask);
    formDivPriorityTask.appendChild(labelPriorityTask);
    formDivPriorityTask.appendChild(selectPriorityTask);
    inputSectionAddItem.appendChild(formDivPriorityTask);
    formAddItem.appendChild(inputSectionAddItem);
    btnSectionAddItem.appendChild(btnCloseModalAddItem);
    btnSectionAddItem.appendChild(btnAddTask);
    formAddItem.appendChild(btnSectionAddItem);
    headerDialogAddItem.appendChild(txtHeaderDialogAddItem);
    containerFormAddItem.appendChild(formAddItem);
    dialogAddItem.appendChild(headerDialogAddItem);
    dialogAddItem.appendChild(containerFormAddItem);
    parentNode.appendChild(dialogAddItem);
};

function renderBodyContent(parentNode) {
    const bodyContent = document.createElement("div");
    bodyContent.setAttribute("id", "body-content");
    bodyContent.textContent = "Body Content";

    parentNode.appendChild(bodyContent);
};

function createCardTaskItem(list) {
    if (list === undefined) return;
    const bodyContent = document.querySelector("#body-content");
    bodyContent.textContent = "";

    let taskItem = list.tasks;
    taskItem.forEach((val) => {
        const card = document.createElement("div");
        card.classList.add("cards-task");
        const priorityColor = document.createElement("div");
        priorityColor.classList.add("priority-color");
        const subCardTask = document.createElement("div");
        subCardTask.classList.add("sub-card-task");
        const checkbox = document.createElement("input");
        checkbox.setAttribute("id", "checklist");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", "complete-task");

        const containerNameAndDueDate = document.createElement("div");
        containerNameAndDueDate.classList.add("container-name-and-dueDate-task");
        const cardListName = document.createElement("p");
        cardListName.classList.add("card-task-name");
        cardListName.textContent = val.title;
        const dueDateTask = document.createElement("p");
        dueDateTask.classList.add("dueDate-task");
        dueDateTask.textContent = val.dueDate;

        const currentTaskItemId = val.id;
        const priorityLevel = val.priority;

        if (priorityLevel === "low") priorityColor.className = "priority-color priority-color-green";
        if (priorityLevel === "medium") priorityColor.className = "priority-color priority-color-yellow";
        if (priorityLevel === "high") priorityColor.className = "priority-color priority-color-red";

        const imgEditIconTask = document.createElement("img");
        imgEditIconTask.classList.add("edit-icon-img-task");
        imgEditIconTask.src = editIcon;
        imgEditIconTask.alt = "Edit icon";
        imgEditIconTask.title = "Edit icon";

        const imgDeleteIconTask = document.createElement("img");
        imgDeleteIconTask.classList.add("delete-icon-img-task");
        imgDeleteIconTask.src = deleteIcon;
        imgDeleteIconTask.alt = "Delete icon";
        imgDeleteIconTask.title = "Delete icon";

        checkbox.addEventListener("change", () => {
            if (checkbox.checked === true) {
                const completeStatus = true;
                completeTask(list, currentTaskItemId, completeStatus);
            };
            if (checkbox.checked === false) {
                const completeStatus = false;
                completeTask(list, currentTaskItemId, completeStatus);
            };
        });

        imgEditIconTask.addEventListener("click", (e) => {
            e.preventDefault();
            renderDialogTaskDetail(bodyContent, list, currentTaskItemId);
            const currentTask = getTask(taskItem, currentTaskItemId);
            showTaskDetail(currentTask);
            const dialogTaskDetail = document.querySelector("#dialog-task-detail");
            dialogTaskDetail.showModal();
        });

        imgDeleteIconTask.addEventListener("click", () => {
            deleteTask(list, currentTaskItemId);
            renderCardTaskItem(list);
        });

        containerNameAndDueDate.addEventListener("click", () => {
            renderDialogTaskDetail(bodyContent, list, currentTaskItemId);
            const currentTask = getTask(taskItem, currentTaskItemId);
            showTaskDetail(currentTask);
            const dialogTask = document.querySelector("#dialog-task-detail");
            dialogTask.showModal();
        });

        containerNameAndDueDate.appendChild(cardListName);
        containerNameAndDueDate.appendChild(dueDateTask);
        subCardTask.appendChild(containerNameAndDueDate);
        subCardTask.appendChild(imgEditIconTask);
        subCardTask.appendChild(imgDeleteIconTask);
        card.appendChild(priorityColor);
        card.appendChild(checkbox);
        card.appendChild(subCardTask);
        bodyContent.appendChild(card);
    });
};

function renderDialogTaskDetail(parentNode, list, taskId) {
    const dialogTaskDetail = document.createElement("dialog");
    dialogTaskDetail.setAttribute("id", "dialog-task-detail");
    const headerDialogTaskDetail = document.createElement("div");
    headerDialogTaskDetail.classList.add("header-dialog-task-detail");
    const txtHeaderDialogTaskDetail = document.createElement("h1");
    txtHeaderDialogTaskDetail.classList.add("txt-header-dialog-task-detail")
    txtHeaderDialogTaskDetail.textContent = "Task Detail"
    const containerFormTaskDetail = document.createElement("div");
    containerFormTaskDetail.setAttribute("id", "container-form-task-detail");
    const formTaskDetail = document.createElement("form");
    formTaskDetail.setAttribute("action", "");
    formTaskDetail.setAttribute("id", "form-task-detail");
    const inputSectionTaskDetail = document.createElement("section");
    inputSectionTaskDetail.classList.add("input-section-task-detail");

    const formDivTaskTitleDetail = document.createElement("div");
    formDivTaskTitleDetail.classList.add("form-div-task-detail");
    const labelTitleTaskDetail = document.createElement("label");
    labelTitleTaskDetail.classList.add("label-title-task-detail");
    labelTitleTaskDetail.setAttribute("for", "title-task-detail");
    labelTitleTaskDetail.textContent = "Task Name";
    const inputTaskDetail = document.createElement("input");
    inputTaskDetail.setAttribute("id", "title-task-detail");
    inputTaskDetail.setAttribute("type", "text");
    inputTaskDetail.setAttribute("name", "title-task-detail");

    const formDivTaskDescriptionDetail = document.createElement("div");
    formDivTaskDescriptionDetail.classList.add("form-div-task-detail");
    const labelTaskDescriptionDetail = document.createElement("label");
    labelTaskDescriptionDetail.classList.add("label-description-task-detail");
    labelTaskDescriptionDetail.setAttribute("for", "description-task-detail");
    labelTaskDescriptionDetail.textContent = "Description";
    const inputTaskDescriptionDetail = document.createElement("textarea");
    inputTaskDescriptionDetail.setAttribute("id", "description-task-detail");
    inputTaskDescriptionDetail.setAttribute("type", "text");
    inputTaskDescriptionDetail.setAttribute("name", "description-task-detail");

    const formDivTaskDueDateDetail = document.createElement("div");
    formDivTaskDueDateDetail.classList.add("form-div-task-detail");
    const labelTaskDueDateDetail = document.createElement("label");
    labelTaskDueDateDetail.classList.add("label-dueDate-task-detail");
    labelTaskDueDateDetail.setAttribute("for", "dueDate-task-detail");
    labelTaskDueDateDetail.textContent = "Due Date";
    const inputTaskDueDateDetail = document.createElement("input");
    inputTaskDueDateDetail.setAttribute("id", "dueDate-task-detail");
    inputTaskDueDateDetail.setAttribute("type", "date");
    inputTaskDueDateDetail.setAttribute("name", "dueDate-task-detail");

    const formDivTaskPriorityDetail = document.createElement("div");
    formDivTaskPriorityDetail.classList.add("form-div-task-detail");
    const labelTaskPriorityDetail = document.createElement("label");
    labelTaskPriorityDetail.classList.add("label-priority-task-detail");
    labelTaskPriorityDetail.setAttribute("for", "priority-task-detail");
    labelTaskPriorityDetail.textContent = "Priority";
    const selectTaskPriorityDetail = document.createElement("select");
    selectTaskPriorityDetail.setAttribute("id", "priority-task-detail");
    selectTaskPriorityDetail.setAttribute("name", "priority");
    const lowOptionTaskPriorityDetail = document.createElement("option");
    lowOptionTaskPriorityDetail.classList.add("option-priority-task-detail");
    lowOptionTaskPriorityDetail.setAttribute("value", "low");
    lowOptionTaskPriorityDetail.textContent = "Low";
    const mediumOptionTaskPriorityDetail = document.createElement("option");
    mediumOptionTaskPriorityDetail.classList.add("option-priority-task-detail");
    mediumOptionTaskPriorityDetail.setAttribute("value", "medium");
    mediumOptionTaskPriorityDetail.textContent = "Medium";
    const highOptionTaskPriorityDetail = document.createElement("option");
    highOptionTaskPriorityDetail.classList.add("option-priority-task-detail");
    highOptionTaskPriorityDetail.setAttribute("value", "high");
    highOptionTaskPriorityDetail.textContent = "High";

    const btnSectionTaskDetail = document.createElement("section");
    btnSectionTaskDetail.classList.add("btn-section-task-detail");
    const btnCloseModalTaskDetail = document.createElement("button");
    btnCloseModalTaskDetail.setAttribute("id", "btn-close-modal-task-detail");
    btnCloseModalTaskDetail.setAttribute("type", "button");
    btnCloseModalTaskDetail.textContent = "Cancel";
    const btnSaveTaskDetail = document.createElement("button");
    btnSaveTaskDetail.setAttribute("id", "btn-save-task-detail");
    btnSaveTaskDetail.setAttribute("type", "submit");
    btnSaveTaskDetail.textContent = "Save";

    btnCloseModalTaskDetail.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogTaskDetailll = document.querySelector("#dialog-task-detail");
        dialogTaskDetailll.close();
    });

    btnSaveTaskDetail.addEventListener("click", (e) => {
        e.preventDefault();
        const taskTitle = document.querySelector("#title-task-detail").value;
        const taskDescription = document.querySelector("#description-task-detail").value;
        const taskDuedate = document.querySelector("#dueDate-task-detail").value;
        const taskPriority = document.querySelector("#priority-task-detail").value;
        const bodyContent = document.querySelector("#body-content");
        bodyContent.textContent = "";
        console.log(taskTitle);
        editTask(list, taskId, taskTitle, taskDescription, taskDuedate, taskPriority);
        renderCardTaskItem(list)
    });

    selectTaskPriorityDetail.appendChild(lowOptionTaskPriorityDetail);
    selectTaskPriorityDetail.appendChild(mediumOptionTaskPriorityDetail);
    selectTaskPriorityDetail.appendChild(highOptionTaskPriorityDetail);

    formDivTaskTitleDetail.appendChild(labelTitleTaskDetail);
    formDivTaskTitleDetail.appendChild(inputTaskDetail);
    inputSectionTaskDetail.appendChild(formDivTaskTitleDetail);

    formDivTaskDescriptionDetail.appendChild(labelTaskDescriptionDetail);
    formDivTaskDescriptionDetail.appendChild(inputTaskDescriptionDetail);
    inputSectionTaskDetail.appendChild(formDivTaskDescriptionDetail);

    formDivTaskDueDateDetail.appendChild(labelTaskDueDateDetail);
    formDivTaskDueDateDetail.appendChild(inputTaskDueDateDetail);
    inputSectionTaskDetail.appendChild(formDivTaskDueDateDetail);

    formDivTaskPriorityDetail.appendChild(labelTaskPriorityDetail);
    formDivTaskPriorityDetail.appendChild(selectTaskPriorityDetail);
    inputSectionTaskDetail.appendChild(formDivTaskPriorityDetail);

    formTaskDetail.appendChild(inputSectionTaskDetail);
    btnSectionTaskDetail.appendChild(btnCloseModalTaskDetail);
    btnSectionTaskDetail.appendChild(btnSaveTaskDetail);
    formTaskDetail.appendChild(btnSectionTaskDetail);
    headerDialogTaskDetail.appendChild(txtHeaderDialogTaskDetail);
    containerFormTaskDetail.appendChild(formTaskDetail);
    dialogTaskDetail.appendChild(headerDialogTaskDetail);
    dialogTaskDetail.appendChild(containerFormTaskDetail);
    parentNode.appendChild(dialogTaskDetail);
};

function showTaskDetail(currentTask) {
    const taskTitle = document.querySelector("#title-task-detail");
    taskTitle.value = currentTask.title;

    const taskDescription = document.querySelector("#description-task-detail");
    taskDescription.value = currentTask.description;

    const taskDuedate = document.querySelector("#dueDate-task-detail");
    taskDuedate.value = currentTask.dueDate;

    const taskPriority = document.querySelector("#priority-task-detail");
    taskPriority.value = currentTask.priority;
};

function renderCardTaskItem(list) {
    createCardTaskItem(list);
};

export { renderScreen };