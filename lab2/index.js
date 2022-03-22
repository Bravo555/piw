'use strict';

let todoBin;

function loadListsNamesToSelect() {
    const select = document.querySelector('#list-select');
    select.innerHTML = '';
    document.querySelectorAll('.todo-lists>li').forEach((list) => {
        let name = list.querySelector('h2').innerText;
        let value = list.querySelector('ul').classList.item(1);

        let option = document.createElement('option');
        option.innerText = name;
        option.value = value;
        select.appendChild(option);
    });
}

function addTodoItem(text, listName) {
    const todoList = document.querySelector(`.${listName || 'todo-list-main'}`);

    let deleteButton = $('<button class="todo-item-delete">X</button>');
    deleteButton.click((e) => {
        if (!confirm('Delete this element? You can restore it using Ctrl+Z, but only one!'))
            return;
        todoBin = { text, listName };
        e.target.parentElement.remove();
    });

    let todoText = document.createElement('span');
    todoText.className = 'todo-item-text';
    todoText.innerText = text;

    let completedDate = document.createElement('span');
    completedDate.className = 'todo-completed-date';

    let button = document.createElement('button');
    button.innerText = 'Done';
    button.classList.add('todo-item-done-button');
    button.addEventListener('click', (e) =>
        toggleTodoItem(e.target.parentElement));

    let item = document.createElement('li');

    $(item).append(deleteButton);

    item.className = 'todo-item';
    item.append(todoText, button, completedDate);
    todoList.appendChild(item);
}

function toggleTodoItem(item) {
    let todoTextEl = item.querySelector('.todo-item-text');
    todoTextEl.classList.toggle('todo-item-text-done');
    let completedDate = item.querySelector('.todo-completed-date');
    if (todoTextEl.classList.contains('todo-item-text-done')) {
        completedDate.innerText = (new Date()).toLocaleString('pl-PL');
        item.querySelector('.todo-item-done-button').innerText = 'Undone';
    } else {
        completedDate.innerText = '';
        item.querySelector('.todo-item-done-button').innerText = 'Done';
    }
}

let listNum = 1;
function addList(listName) {
    let todos = document.createElement('ul');
    todos.className = `todo-list todo-list${listNum}`;
    listNum += 1;

    let listHeader = document.createElement('h2');
    listHeader.innerText = listName;

    let li = document.createElement('li');
    li.append(listHeader, todos);

    document.querySelector('.todo-lists').append(li);

    console.log(li);

    loadListsNamesToSelect();
}

const deleteItemJquery = (e) => {
    if (e.key === 'z' && e.ctrlKey && todoBin) {
        addTodoItem(todoBin.text, todoBin.listName);
        todoBin = null;
    }
};

const textbox = document.querySelector('#todo-text');
document.querySelector('#todo-submit')
    .addEventListener('click', () => {
        let listName = document.querySelector('#list-select').value;
        addTodoItem(textbox.value, listName);
        textbox.value = '';
    });

document.querySelectorAll('.todo-item-done-button').forEach((b) =>
    b.addEventListener('click', (e) => toggleTodoItem(e.target.parentElement)));

$(document).keydown(deleteItemJquery);


const addListTextbox = document.querySelector('#add-list-textbox');
document.querySelector('#add-list-button').addEventListener('click', () => {
    addList(addListTextbox.value);
    addListTextbox.value = '';
});

loadListsNamesToSelect();
addTodoItem('test todo');
