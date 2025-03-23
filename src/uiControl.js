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
    const containerTodolist = document.createElement("div");
    containerTodolist.classList.add("container-todolist");
    containerTodolist.textContent = "Todo list Container";

    containerBtnSidebar.appendChild(paraSidebar);
    sidebarController(containerBtnSidebar);

    sidebar.appendChild(headerSidebar);
    sidebar.appendChild(containerBtnSidebar);
    sidebar.appendChild(containerTodolist);

    parentNode.appendChild(sidebar);
};

function sidebarController(parentNode) {
    const sidebarBtn = document.createElement("button");
    sidebarBtn.textContent = "Sidebar Button";
    sidebarBtn.addEventListener("click", renderDialog);

    function renderDialog() {
        console.log("button onclick")
    };

    parentNode.appendChild(sidebarBtn);
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