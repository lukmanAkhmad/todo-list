import { createList, lists } from "./list";

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
    renderCardList(containerTodolist);

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
        createList(listName)
        renderCardList(containerTodolist);

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

function renderCardList(parentNode) {
    lists.forEach((val) => {
        const card = document.createElement("div");
        card.classList.add("cards");
        const cardListName = document.createElement("p");
        cardListName.classList.add("card-list-name");
        cardListName.textContent = val.name;

        card.appendChild(cardListName);
        parentNode.appendChild(card);
    });
};

function renderHeaderContent(parentNode) {
    const headerContent = document.createElement("div");
    headerContent.setAttribute("id", "header-content");
    headerContent.textContent = "Header Content";

    parentNode.appendChild(headerContent);
};

function renderBodyContent(parentNode) {
    const bodyContent = document.createElement("div");
    bodyContent.setAttribute("id", "body-content");
    bodyContent.textContent = "Body Content";

    parentNode.appendChild(bodyContent);
}
export { renderScreen };

// nyimpen data ke localStorege