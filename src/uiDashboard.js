import logoMyTodolist from '/assets/img/playlist-check.svg';
import plusSign from '/assets/img/plus.svg';


export function createContentSidebar() {
    const divSidebar = document.querySelector('#sidebar');

    divSidebar.appendChild(createHeaderSidebar());
    divSidebar.appendChild(createMainSidebar());

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

function createMainSidebar(){
    const mainSidebar = document.createElement('div');
    mainSidebar.classList.add('main-sidebar');

    const paraMainSidebar = document.createElement('p');
    paraMainSidebar.classList.add('p-main-sidebar');
    paraMainSidebar.textContent = 'My List';
    mainSidebar.appendChild(paraMainSidebar);

    const btnMainSidebar = document.createElement('button');
    btnMainSidebar.classList.add('btn-main-sidebar');
    mainSidebar.appendChild(btnMainSidebar);

    const paraBtnMainSidebar = document.createElement('p');
    paraBtnMainSidebar.classList.add('p-btn-main-sidebar');
    paraBtnMainSidebar.textContent = 'New';
    btnMainSidebar.appendChild(paraBtnMainSidebar);

    const imgBtnMainSidebar = new Image();
    imgBtnMainSidebar.classList.add('img-btn-main-sidebar');
    imgBtnMainSidebar.src = plusSign;
    imgBtnMainSidebar.alt = 'plus sign';
    btnMainSidebar.appendChild(imgBtnMainSidebar);

    return mainSidebar;
}
