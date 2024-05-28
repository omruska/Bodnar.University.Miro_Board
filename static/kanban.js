// kanban.js

document.addEventListener('DOMContentLoaded', function () {
    const tasks = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.column');
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.querySelector('button[type="submit"]');

    // Add drag and drop functionality
    tasks.forEach(task => {
        task.addEventListener('dragstart', dragStart);
        task.addEventListener('dragend', dragEnd);
        task.addEventListener('click', toggleTaskWindow);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', dragDrop);
    });

    addTaskButton.addEventListener('click', addTask);

    function dragStart() {
        this.classList.add('dragging');
    }

    function dragEnd() {
        this.classList.remove('dragging');
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        if (this.classList.contains('column')) {
            this.classList.add('over');
        }
    }

    function dragLeave() {
        this.classList.remove('over');
    }

    function dragDrop() {
        this.classList.remove('over');
        const task = document.querySelector('.dragging');
        this.appendChild(task);
    }

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText !== '') {
            const newTask = document.createElement('div');
            newTask.classList.add('task');
            newTask.draggable = true;
            newTask.textContent = taskText;
            newTask.addEventListener('dragstart', dragStart);
            newTask.addEventListener('dragend', dragEnd);
            newTask.addEventListener('click', toggleTaskWindow);
            columns[0].appendChild(newTask);
            newTaskInput.value = '';
        }
    }

    function toggleTaskWindow() {
        const description = this.querySelector('.description');
        if (description && !description.classList.contains('hidden')) {
            description.classList.add('hidden');
        } else {
            const isDescriptionExist = description !== null;
            if (!isDescriptionExist) {
                createDescriptionElement(this);
            } else {
                description.classList.remove('hidden');
            }
        }
    }

    function createDescriptionElement(task) {
        const newDescription = document.createElement('div');
        newDescription.classList.add('description');
        newDescription.innerHTML = '<button class="add-description">Add Description</button>';
        task.appendChild(newDescription);
        const addButton = newDescription.querySelector('.add-description');
        addButton.addEventListener('click', createDescription);
    }

    function createDescription() {
        const description = prompt('Enter task description:');
        if (description) {
            const taskDescription = document.createElement('p');
            taskDescription.textContent = description;
            this.parentNode.insertBefore(taskDescription, this);
            this.remove();
        }
    }
});
