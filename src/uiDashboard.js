import editSign from '/assets/img/playlist-edit.svg';
import trashSign from '/assets/img/trash-can-outline.svg';

import * as listModule from './list';
import { saveToLocalStorage, getIdFromLocalStorage } from './localStorage';

let selectedListId = 'none';

function screenControler() {
    const lists = listModule.lists;
    saveToLocalStorage(lists, selectedListId);
    selectedListId = getIdFromLocalStorage();

    const headerSidebar = document.querySelector('.header-sidebar');
    const btnMainSidebar = document.querySelector('.btn-main-sidebar');
    const containerList = document.querySelector('.container-list');
    const formContainerList = document.querySelector('.form-container-list');
    const containerInput = document.querySelector('.container-input');
    const listInput = document.querySelector('.list-input');
    const listSpan = document.querySelector('.list-span');
    const listForm = document.querySelector('#list-form');
    const overlay = document.querySelector('.overlay');
    const modal = document.querySelector('.modal');
    const cancelModal = document.querySelector('.cancel');

    const renderList = () => {
        containerList.replaceChildren();

        lists.forEach((list) => {
            const itemTodolist = document.createElement('li');
            itemTodolist.classList.add('item-todolist');


            const paraItemTodolist = document.createElement('p');
            paraItemTodolist.classList.add('p-item-todolist');
            paraItemTodolist.textContent = list.name;
            paraItemTodolist.dataset.listId = list.id;
            itemTodolist.appendChild(paraItemTodolist);

            const containerSvgItemTodolist = document.createElement('div');
            containerSvgItemTodolist.classList.add('container-svg-item-todolist');
            itemTodolist.appendChild(containerSvgItemTodolist);

            const imgEdit = document.createElement('img');
            imgEdit.classList.add('icon-edit');
            imgEdit.src = editSign;
            imgEdit.alt = 'edit sign';
            imgEdit.dataset.btn = 'edit';
            imgEdit.dataset.listId = list.id;
            imgEdit.addEventListener('click', editList);
            containerSvgItemTodolist.appendChild(imgEdit);

            const imgTrash = document.createElement('img');
            imgTrash.classList.add('icon-trash');
            imgTrash.src = trashSign;
            imgTrash.alt = 'trash sign';
            imgTrash.dataset.btn = 'delete';
            imgTrash.dataset.listId = list.id;
            // imgTrash.addEventListener('click', () => {
            //     removeList(list);
            // });
            containerSvgItemTodolist.appendChild(imgTrash);

            containerList.appendChild(itemTodolist);
        });
    };

    btnMainSidebar.addEventListener('click', toggleFormDisplay);

    formContainerList.addEventListener('submit', (e) => {
        e.preventDefault();
        const valueListInput = listInput.value;
        listModule.createList(valueListInput);
        toggleFormDisplay();
        listInput.value = '';
        renderList();
    });

    function toggleFormDisplay() {
        if (formContainerList.style.display == 'none') {
            formContainerList.style.display = 'flex'
        } else {
            formContainerList.style.display = 'none'
        }
    }

    containerList.addEventListener('click', selectElement);

    function selectElement(e) {
        selectedListId = e.target.dataset.listId;
        saveToLocalStorage(lists, selectedListId);

        if(e.target.dataset.btn == 'delete'){
            listModule.deleteList(selectedListId);
            renderList();
        }
    }

    function editList() {
        console.log('icon Edit was clicked!');
        modal.style.display = 'flex';
        renderList()
    }

    cancelModal.addEventListener('click', () => {
        modal.style.display = 'none';
    })

    renderList();

}

export { screenControler };