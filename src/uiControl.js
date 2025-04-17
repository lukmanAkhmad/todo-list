import { lists, createList, deleteList, editList, getList } from "./list";
import { createTask, deleteTask, editTask } from "./task";
import { saveToLocalStorage } from "./localStorage";

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
    headerSidebar.textContent = "Header Sidebar";
    const containerBtnSidebar = document.createElement("div");
    containerBtnSidebar.classList.add("container-button-sidebar");
    const paraSidebar = document.createElement("p");
    paraSidebar.classList.add("p-sidebar");
    paraSidebar.textContent = "My Lists";

    const sidebarBtn = document.createElement("button");
    sidebarBtn.textContent = "Sidebar Button";
    sidebarBtn.addEventListener("click", () => {
        const dialogElement = document.querySelector("#dialog-list");
        dialogElement.showModal();
    });

    const containerTodolist = document.createElement("div");
    containerTodolist.classList.add("container-todolist");
    containerTodolist.textContent = "Todo list Container";

    containerBtnSidebar.appendChild(paraSidebar);
    containerBtnSidebar.appendChild(sidebarBtn);

    sidebar.appendChild(headerSidebar);
    sidebar.appendChild(containerBtnSidebar);
    renderDialogList(sidebar)
    sidebar.appendChild(containerTodolist);
    createCardList(containerTodolist);

    parentNode.appendChild(sidebar);
};

function renderDialogList(parentNode) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "dialog-list");
    const containerForm = document.createElement("div");
    containerForm.setAttribute("id", "container-form");
    const form = document.createElement("form");
    form.setAttribute("action", "");
    const inputSection = document.createElement("section");
    inputSection.classList.add("section-input-list");
    const formDiv = document.createElement("div");
    formDiv.classList.add("form-div");
    const label = document.createElement("label");
    label.classList.add("label-list-name");
    label.setAttribute("for", "list-name");
    label.textContent = "List Name";
    const input = document.createElement("input");
    input.setAttribute("id", "list-name");
    input.setAttribute("type", "text");
    input.setAttribute("name", "list-name");

    const btnSection = document.createElement("section");
    btnSection.classList.add("section-btn-list");
    const btnCloseModal = document.createElement("button");
    btnCloseModal.setAttribute("id", "close-modal");
    btnCloseModal.setAttribute("type", "button");
    btnCloseModal.textContent = "Cancel";
    const btnCreateList = document.createElement("button");
    btnCreateList.setAttribute("id", "create-list");
    btnCreateList.setAttribute("type", "submit");
    btnCreateList.textContent = "Create List";

    btnCloseModal.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogElement = document.querySelector("#dialog-list");
        dialogElement.close();
    });

    btnCreateList.addEventListener("click", (e) => {
        e.preventDefault();
        const listName = document.querySelector("#list-name").value;
        const containerTodolist = document.querySelector(".container-todolist");
        containerTodolist.textContent = "";
        createList(listName);
        createCardList(containerTodolist);
    });

    formDiv.appendChild(label);
    formDiv.appendChild(input);
    inputSection.appendChild(formDiv)
    form.appendChild(inputSection);
    btnSection.appendChild(btnCloseModal);
    btnSection.appendChild(btnCreateList);
    form.appendChild(btnSection);
    containerForm.appendChild(form);
    dialog.appendChild(containerForm);
    parentNode.appendChild(dialog);
};

function createCardList(parentNode) {
    lists.forEach((val) => {
        const card = document.createElement("div");
        card.classList.add("cards");
        const cardListName = document.createElement("p");
        cardListName.classList.add("card-list-name");
        cardListName.textContent = val.name;

        const currentListId = val.id;

        const btnEditList = document.createElement("button");
        btnEditList.classList.add("btn-edit-list");
        btnEditList.setAttribute("type", "button");
        btnEditList.textContent = "Edit";
        const btnDeleteList = document.createElement("button");
        btnDeleteList.classList.add("btn-delete-list");
        btnDeleteList.setAttribute("type", "button");
        btnDeleteList.textContent = "Delete";

        btnEditList.addEventListener("click", (e) => {
            e.preventDefault();
            renderDialogEditList(parentNode, currentListId)
            const dialogList = document.querySelector("#dialog-edit-list");
            dialogList.showModal();
        });

        btnDeleteList.addEventListener("click", () => {
            console.log("Button Delete List Onclick");
            deleteList(currentListId);
            renderCardList();
            const headerContainer = document.querySelector("#header-content");
            const bodyContent = document.querySelector("#body-content");
            headerContainer.textContent = "";
            bodyContent.textContent = "";
            console.table(lists);
        });

        card.addEventListener("click", () => {
            console.log("card on click");
            console.log(`id list = ${currentListId}`);
            let findList = getList(currentListId);
            createHeaderContent(findList);
            createCardTaskItem(findList);
        });

        card.appendChild(cardListName);
        card.appendChild(btnEditList);
        card.appendChild(btnDeleteList);
        parentNode.appendChild(card);
    });
};

function renderDialogEditList(parentNode, listId) {
    const dialogList = document.createElement("dialog");
    dialogList.setAttribute("id", "dialog-edit-list");
    const containerFormList = document.createElement("div");
    containerFormList.setAttribute("id", "container-form-edit-list");
    const formList = document.createElement("form");
    formList.setAttribute("action", "");
    const inputSectionList = document.createElement("section");
    inputSectionList.classList.add("section-input-edit-list");
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
    btnSectionList.classList.add("section-btn-edit-list");
    const btnCloseModalList = document.createElement("button");
    btnCloseModalList.setAttribute("id", "btn-close-modal-edit-list");
    btnCloseModalList.setAttribute("type", "button");
    btnCloseModalList.textContent = "Cancel";
    const btnRenameList = document.createElement("button");
    btnRenameList.setAttribute("id", "btn-rename-list-edit-list");
    btnRenameList.setAttribute("type", "submit");
    btnRenameList.textContent = "Rename";

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
    containerFormList.appendChild(formList);
    dialogList.appendChild(containerFormList);
    parentNode.appendChild(dialogList);
};

function renderCardList() {
    const containerTodolist = document.querySelector(".container-todolist");
    containerTodolist.textContent = "";
    createCardList(containerTodolist);
}

function renderHeaderContent(parentNode) {
    const headerContainer = document.createElement("div");
    headerContainer.setAttribute("id", "header-content");
    headerContainer.textContent = "Header Content";

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
    btnAddItem.setAttribute("id", "btn-add-item");
    btnAddItem.setAttribute("type", "submit");
    btnAddItem.textContent = "Add Item";

    const currentListId = list.id;

    btnAddItem.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(`btn add item onclick dengan id = ${currentListId}`);
        renderDialogAddItem(headerContainer, currentListId);
        const dialogAddItem = document.querySelector("#dialog-add-item");
        dialogAddItem.showModal();
    });

    headerContainer.appendChild(divListName);
    headerContainer.appendChild(btnAddItem);
};

function renderDialogAddItem(parentNode, listId) {
    const dialogAddItem = document.createElement("dialog");
    dialogAddItem.setAttribute("id", "dialog-add-item");
    const containerFormAddItem = document.createElement("div");
    containerFormAddItem.setAttribute("id", "container-form-add-item");
    const formAddItem = document.createElement("form");
    formAddItem.setAttribute("action", "");
    const inputSectionAddItem = document.createElement("section");
    inputSectionAddItem.classList.add("input-section-add-item");
    
    const formDivTitleTask = document.createElement("div");
    formDivTitleTask.classList.add("form-div");
    const labelTitleTask = document.createElement("label");
    labelTitleTask.classList.add("label-title-add-item");
    labelTitleTask.setAttribute("for", "title-add-item");
    labelTitleTask.textContent = "Title";
    const inputTitleTask = document.createElement("input");
    inputTitleTask.setAttribute("id", "title-add-item");
    inputTitleTask.setAttribute("type", "text");
    inputTitleTask.setAttribute("name", "title-add-item");

    const formDivDescriptionTask = document.createElement("div");
    formDivDescriptionTask.classList.add("form-div");
    const labelDescriptionTask = document.createElement("label");
    labelDescriptionTask.classList.add("label-description-task");
    labelDescriptionTask.setAttribute("for", "label-description-task");
    labelDescriptionTask.textContent = "Description";
    const inputDescriptionTask = document.createElement("input");
    inputDescriptionTask.setAttribute("id", "description-task");
    inputDescriptionTask.setAttribute("type", "text");
    inputDescriptionTask.setAttribute("name", "description-task");

    const btnSectionAddItem = document.createElement("section");
    btnSectionAddItem.classList.add("btn-section-add-item");
    const btnCloseModalAddItem = document.createElement("button");
    btnCloseModalAddItem.setAttribute("id", "close-modal-add-item");
    btnCloseModalAddItem.setAttribute("type", "button");
    btnCloseModalAddItem.textContent = "Cancel";
    const btnAddTask = document.createElement("button");
    btnAddTask.setAttribute("id", "add-task");
    btnAddTask.setAttribute("type", "submit");
    btnAddTask.textContent = "Add Task";

    btnCloseModalAddItem.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogAddItemElement = document.querySelector("#dialog-add-item");
        dialogAddItemElement.close();
    });

    btnAddTask.addEventListener("click", (e) => {
        e.preventDefault();
        const titlTask = document.querySelector("#title-add-item").value;
        const descriptionTask = document.querySelector("#description-task").value;
        createTask(listId, titlTask,descriptionTask);
        let findList = getList(listId);
        renderCardTaskItem(findList);
    });

    formDivTitleTask.appendChild(labelTitleTask);
    formDivTitleTask.appendChild(inputTitleTask);
    inputSectionAddItem.appendChild(formDivTitleTask)
    formDivDescriptionTask.appendChild(labelDescriptionTask);
    formDivDescriptionTask.appendChild(inputDescriptionTask);
    inputSectionAddItem.appendChild(formDivDescriptionTask)
    formAddItem.appendChild(inputSectionAddItem);
    btnSectionAddItem.appendChild(btnCloseModalAddItem);
    btnSectionAddItem.appendChild(btnAddTask);
    formAddItem.appendChild(btnSectionAddItem);
    containerFormAddItem.appendChild(formAddItem);
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
        card.classList.add("cards");
        const cardListName = document.createElement("p");
        cardListName.classList.add("card-list-name");
        cardListName.textContent = val.title;

        const currentTaskItemId = val.id;

        const btnEditTaskItem = document.createElement("button");
        btnEditTaskItem.classList.add("btn-edit-task-item");
        btnEditTaskItem.setAttribute("type", "button");
        btnEditTaskItem.textContent = "Edit";
        const btnDeleteTaskItem = document.createElement("button");
        btnDeleteTaskItem.classList.add("btn-delete-list");
        btnDeleteTaskItem.setAttribute("type", "button");
        btnDeleteTaskItem.textContent = "Delete";

        btnEditTaskItem.addEventListener("click", (e) => {
            console.log("btn edit task onclick");
            e.preventDefault();
            renderDialogEditTask(bodyContent, list, currentTaskItemId);
            const dialogList = document.querySelector("#dialog-edit-task");
            dialogList.showModal();
        });

        btnDeleteTaskItem.addEventListener("click", () => {
            deleteTask(list, currentTaskItemId);
            renderCardTaskItem(list);
        });

        card.addEventListener("click", () => {
            console.log("card taskList on click");
            console.log(`id task = ${currentTaskItemId}`);

        });

        card.appendChild(cardListName);
        card.appendChild(btnEditTaskItem);
        card.appendChild(btnDeleteTaskItem);
        bodyContent.appendChild(card);
    });
};

function renderDialogEditTask(parentNode, list, taskId) {
    const dialogTask = document.createElement("dialog");
    dialogTask.setAttribute("id", "dialog-edit-task");
    const containerFormTask = document.createElement("div");
    containerFormTask.setAttribute("id", "container-form-edit-task");
    const formTask = document.createElement("form");
    formTask.setAttribute("action", "");
    const inputSectionTask = document.createElement("section");
    inputSectionTask.classList.add("input-section-edit-task");
    const formDivTask = document.createElement("div");
    formDivTask.classList.add("form-div-edit-task");
    const labelTask = document.createElement("label");
    labelTask.classList.add("label-task-name-edit-task");
    labelTask.setAttribute("for", "task-name-edit-task");
    labelTask.textContent = "List Name";
    const inputTask = document.createElement("input");
    inputTask.setAttribute("id", "task-name-edit-task");
    inputTask.setAttribute("type", "text");
    inputTask.setAttribute("name", "task-name-edit-task");

    const btnSectionTask = document.createElement("section");
    btnSectionTask.classList.add("btn-section-edit-task");
    const btnCloseModalTask = document.createElement("button");
    btnCloseModalTask.setAttribute("id", "close-modal-edit-task");
    btnCloseModalTask.setAttribute("type", "button");
    btnCloseModalTask.textContent = "Cancel";
    const btnRenameTask = document.createElement("button");
    btnRenameTask.setAttribute("id", "btn-rename-task");
    btnRenameTask.setAttribute("type", "submit");
    btnRenameTask.textContent = "Rename";

    btnCloseModalTask.addEventListener("click", (e) => {
        e.preventDefault();
        const dialogListElement = document.querySelector("#dialog-edit-task");
        dialogListElement.close();
    });

    btnRenameTask.addEventListener("click", (e) => {
        e.preventDefault();
        const taskNameEditTask = document.querySelector("#task-name-edit-task").value;
        const bodyContent = document.querySelector("#body-content");
        bodyContent.textContent = "";
        editTask(list, taskId, taskNameEditTask);
        renderCardTaskItem(list)
    });

    formDivTask.appendChild(labelTask);
    formDivTask.appendChild(inputTask);
    inputSectionTask.appendChild(formDivTask)
    formTask.appendChild(inputSectionTask);
    btnSectionTask.appendChild(btnCloseModalTask);
    btnSectionTask.appendChild(btnRenameTask);
    formTask.appendChild(btnSectionTask);
    containerFormTask.appendChild(formTask);
    dialogTask.appendChild(containerFormTask);
    parentNode.appendChild(dialogTask);
};

function renderCardTaskItem(list) {
    createCardTaskItem(list);
};

export { renderScreen };

// buat fitur tambahkan deskripsi task