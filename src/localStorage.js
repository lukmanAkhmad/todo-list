const localStoregeKey = 'lists';
const localStorageIdKey = 'listId';

function saveToLocalStorage(lists, selectedListId){
    localStorage.setItem(localStoregeKey,JSON.stringify(lists));
    localStorage.setItem(localStorageIdKey, JSON.stringify(selectedListId));
};


export { saveToLocalStorage };