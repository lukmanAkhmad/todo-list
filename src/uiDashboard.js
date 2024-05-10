import logoMyTodolist from '/assets/img/playlist-check.svg';



export function createMainSidebar() {
    const divSidebar = document.querySelector('#sidebar');

    divSidebar.appendChild(createHeaderSidebar());
}

function createHeaderSidebar(){
    const headerSidebar = document.createElement('div');
    headerSidebar.classList.add('header-sidebar');

    const sidebarIcon = new Image();
    sidebarIcon.classList.add('header-sidebar-icon');
    sidebarIcon.alt = 'My Todo List Icon';
    sidebarIcon.src = logoMyTodolist;
    headerSidebar.appendChild(sidebarIcon);

    const paraSidebar = document.createElement('p');
    paraSidebar.classList.add('p-sidebar');
    paraSidebar.textContent = 'My Todo Lsit';
    headerSidebar.appendChild(paraSidebar);

    return headerSidebar
}
