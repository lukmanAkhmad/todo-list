function renderScreen() {
    const body = document.querySelector("body");
    renderSidebar(body);
};
function renderSidebar(parentNode) {
    const sidebar = document.createElement("div");
    sidebar.setAttribute("id", "sidebar")
    sidebar.textContent = "im sidebar";
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

export { renderScreen };