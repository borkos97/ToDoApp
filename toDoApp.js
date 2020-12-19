const toDoList = []

const finder = document.querySelector('.find')

const form = document.querySelector('form')
const input = document.querySelector('.add')
const counter = document.querySelector('.counter')
const ul = document.querySelector('ul')
const div = document.querySelector('div')

const howMuchToDo = () => {
    if(toDoList.length <= 3 && toDoList != 0) div.style.backgroundImage = "url('images/happy_shiba.png')"
    else if(toDoList.length >= 10) div.style.backgroundImage = "url('images/depressed_shiba.png')"
    else if(toDoList.length > 7) div.style.backgroundImage = "url('images/angry_shiba.png')"
    else if(toDoList.length > 3) div.style.backgroundImage = "url('images/do_it_shiba.png')"
    else if(toDoList.length === 0) div.style.backgroundImage = "url('images/proud_shiba.png')"
}

const renderTasks = () => {
    ul.textContent = ''
    toDoList.forEach((task, key) => {
        task.dataset.key = key;
        ul.appendChild(task);
    })
    howMuchToDo()
}

const deleteTask = (e) => {
    const index = e.target.parentNode.dataset.key
    toDoList.splice(index, 1)
    counter.textContent = toDoList.length;
    renderTasks()
}

const addTask = (e) => {
    e.preventDefault();
    const addedTask = input.value.toLowerCase();
    const tasks = document.createElement('li');
    if (!addedTask) return;
    tasks.className = 'task';
    tasks.innerHTML = addedTask + "<button class ='delete'>Delete</button>";
    toDoList.push(tasks);
    renderTasks();
    input.value = '';
    tasks.querySelector('.delete').addEventListener('click', deleteTask);
    counter.textContent = toDoList.length;
}

const findTask = (e) => {
    const searchingTask = e.target.value;
    let tasks = toDoList;
    tasks = tasks.filter(task => task.textContent.toLowerCase().includes(searchingTask));
    renderTasks();
    ul.textContent = '';
    tasks.forEach(task => ul.appendChild(task));
}

form.addEventListener('submit', addTask);
finder.addEventListener('input', findTask);