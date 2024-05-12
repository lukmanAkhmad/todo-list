const lists = [
    {
        name: 'Beli Buku'
    },
    {
        name: 'beli mobil'
    },
];

const List = (name) => {
    return {
        name,
    }
}

const createList = (name) => {
    const list = List(name);

    lists.push(list);
} 

export { lists, createList }