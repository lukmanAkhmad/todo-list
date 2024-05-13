import editSign from '/assets/img/playlist-edit.svg';
import trashSign from '/assets/img/trash-can-outline.svg';

import * as listModule from './list';


function screenControler() {
    const lists = listModule.lists;

    const headerSidebar = document.querySelector('.header-sidebar');
    const btnMainSidebar = document.querySelector('.btn-main-sidebar');
    const containerList = document.querySelector('.container-list');
    const formContainerList = document.querySelector('.form-container-list');
    const containerInput = document.querySelector('.container-input');
    const listInput = document.querySelector('.list-input');
    const listSpan = document.querySelector('.list-span')

    const renderList = () => {
        containerList.replaceChildren();

        lists.forEach((list) => {
            const itemTodolist = document.createElement('li');
            itemTodolist.classList.add('item-todolist');


            const paraItemTodolist = document.createElement('p');
            paraItemTodolist.classList.add('p-item-todolist');
            paraItemTodolist.textContent = list.name;
            itemTodolist.appendChild(paraItemTodolist);

            const containerSvgItemTodolist = document.createElement('div');
            containerSvgItemTodolist.classList.add('container-svg-item-todolist');
            itemTodolist.appendChild(containerSvgItemTodolist);

            const imgEdit = document.createElement('img');
            imgEdit.setAttribute('id', 'icon-edit');
            imgEdit.src = editSign;
            imgEdit.alt = 'edit sign';
            imgEdit.addEventListener('click', editList);
            containerSvgItemTodolist.appendChild(imgEdit);

            const imgTrash = document.createElement('img');
            imgTrash.setAttribute('id', 'icon-trash');
            imgTrash.src = trashSign;
            imgTrash.alt = 'trash sign';
            imgTrash.addEventListener('click', () => {
                removeList(list);
            });
            containerSvgItemTodolist.appendChild(imgTrash);

            containerList.appendChild(itemTodolist);
        });
    };

    btnMainSidebar.addEventListener('click', () => {
        formContainerList.style.display = 'flex';
    });

    formContainerList.addEventListener('submit', (e) => {
        e.preventDefault();
        const valueListInput = listInput.value;
        listModule.createList(valueListInput)
        renderList();
    })

    function editList() {
        console.log('icon Edit was clicked!')
        renderList()
    }

    function removeList(index) {
        console.log('remove list was clicked!')
        lists.splice(index, 1);
        renderList()
    }

    renderList();

}

export { screenControler };