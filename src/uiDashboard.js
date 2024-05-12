import logoMyTodolist from '/assets/img/playlist-check.svg';
import plusSign from '/assets/img/plus.svg';
import editSign from '/assets/img/playlist-edit.svg';
import trashSign from '/assets/img/trash-can-outline.svg';


export function createContentSidebar() {
    const divSidebar = document.querySelector('#sidebar');

    divSidebar.appendChild(createHeaderSidebar());
    divSidebar.appendChild(createMainSidebar());
    divSidebar.appendChild(createContainerList());
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

    btnMainSidebar.addEventListener('click', () => {
        elemenInput.style.display = 'flex';
    });

    return mainSidebar;
}

function createContainerList(){
    const containerList = document.createElement('ul');
    containerList.classList.add('container-list');
    containerList.appendChild(createItemTodolist());

    containerList.appendChild(elemenInput);

    return containerList;

};

function createItemTodolist(){
    const itemTodolist = document.createElement('li');
    itemTodolist.classList.add('item-todolist');

    const paraItemTodolist = document.createElement('p');
    paraItemTodolist.classList.add('p-item-todolist');
    paraItemTodolist.textContent = 'List 1';
    itemTodolist.appendChild(paraItemTodolist);

    const containerSvgItemTodolist = document.createElement('div');
    containerSvgItemTodolist.classList.add('container-svg-item-todolist');
    itemTodolist.appendChild(containerSvgItemTodolist);

    const imgEdit = new Image();
    imgEdit.classList.add('icon-item-todolist');
    imgEdit.src = editSign;
    imgEdit.alt = 'edit sign';
    containerSvgItemTodolist.appendChild(imgEdit);

    const imgTrash = new Image();
    imgTrash.classList.add('icon-item-todolist');
    imgTrash.src = trashSign;
    imgTrash.alt = 'trash sign';
    containerSvgItemTodolist.appendChild(imgTrash);

    // buat yang ke 2 dan seterusnya bisa liat contoh restaurant-page

    return itemTodolist;
}

    const elemenInput = document.createElement('input');
    elemenInput.setAttribute('id','elemen-input');
    elemenInput.setAttribute('type','text');
