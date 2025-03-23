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
    sidebar.textContent = "Sidebar";
    sidebarController(sidebar);

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