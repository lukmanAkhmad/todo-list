function renderScreen() {
    const body = document.querySelector("body");
    renderSidebar(body);
    renderHeaderContent(body);
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

function renderHeaderContent(parentNode){
    const headerContent = document.createElement("div");
    headerContent.setAttribute("id","header-content");
    headerContent.textContent = "Header Content";

    parentNode.appendChild(headerContent);
};
export { renderScreen };