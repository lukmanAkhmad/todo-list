import { lists, createList, deleteList, editList, getList } from "./list";
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
        const dialogElement = document.querySelector("#dialog");
        dialogElement.showModal();
    });

    const containerTodolist = document.createElement("div");
    containerTodolist.classList.add("container-todolist");
    containerTodolist.textContent = "Todo list Container";

    containerBtnSidebar.appendChild(paraSidebar);
    containerBtnSidebar.appendChild(sidebarBtn);

    sidebar.appendChild(headerSidebar);
    sidebar.appendChild(containerBtnSidebar);
    renderDialog(sidebar)
    sidebar.appendChild(containerTodolist);
    createCardList(containerTodolist);

    parentNode.appendChild(sidebar);
};

function renderDialog(parentNode) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "dialog");
    const containerForm = document.createElement("div");
    containerForm.setAttribute("id", "container-form");
    const form = document.createElement("form");
    form.setAttribute("action", "");
    const inputSection = document.createElement("section");
    inputSection.classList.add("input-section");
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
    btnSection.classList.add("btn-section");
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
        const dialogElement = document.querySelector("#dialog");
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
        btnEditList.setAttribute("type", "submit");
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
            headerContainer.textContent = "";
            console.table(lists);
        });

        card.addEventListener("click", () => {
            console.log("card on click");
            console.log(currentListId);
            let findList = getList(currentListId);
            createHeaderContent(findList);
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
    inputSectionList.classList.add("input-section-edit-list");
    const formDivList = document.createElement("div");
    formDivList.classList.add("form-div-edit-list");
    const labelList = document.createElement("label");
    labelList.classList.add("label-list-name-edit-list");
    labelList.setAttribute("for", "list-name");
    labelList.textContent = "List Name";
    const inputList = document.createElement("input");
    inputList.setAttribute("id", "list-name-edit-list");
    inputList.setAttribute("type", "text");
    inputList.setAttribute("name", "list-name");

    const btnSectionList = document.createElement("section");
    btnSectionList.classList.add("btn-section-edit-list");
    const btnCloseModalList = document.createElement("button");
    btnCloseModalList.setAttribute("id", "close-modal-edit-list");
    btnCloseModalList.setAttribute("type", "button");
    btnCloseModalList.textContent = "Cancel";
    const btnRenameList = document.createElement("button");
    btnRenameList.setAttribute("id", "create-list-edit-list");
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
        const containerTodolist = document.querySelector(".container-todolist");
        containerTodolist.textContent = "";
        editList(listId, listNameEditList);
        createCardList(containerTodolist);
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

    btnAddItem.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("btn add item onclick")
    });

    headerContainer.appendChild(divListName);
    headerContainer.appendChild(btnAddItem);
};

function renderBodyContent(parentNode) {
    const bodyContent = document.createElement("div");
    bodyContent.setAttribute("id", "body-content");
    bodyContent.textContent = "Body Content";

    parentNode.appendChild(bodyContent);
}

export { renderScreen };

// Bikin button add item berfungsi