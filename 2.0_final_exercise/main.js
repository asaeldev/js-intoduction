/**
 * Presenter: Asael Hernandez
 * Email: asael.hernandez@codebase.com.mx
 * REST API: https://jsonplaceholder.typicode.com/
 * Video available at: 
 * 
 * Instructions
 * 
 * Create the functions to handle the following actions using JavaScript
 * 
 * 1. Function to add a new task
 * 2. Function to delete a task from the list
 * 3. Function to mark a task as completed
 * 4. Use a global array to store all tasks
 * 
 * NOTES:
 * - Use an array to store all the information regarding to tasks
 * - Store all the task's information into an object
 * - Store all the tasks in browser's local storage
 * - You can add as much functions as you require
 * 
 * Validations:
 * 1. Validate that taskTitleInput has at least a string of 5 characters
 * 2. Validate that taskDescInput has a string between 10  and 50 characters
 */

// Write your code here
var tasks = [];

/**
 * Stores tasks into local storage
 */
function saveTasks() {
    window.localStorage
        .setItem('tasks', JSON.stringify(tasks));
}

/**
 * Loads tasks that are stored in local storage
 */
function loadTasks() {
    if (window.localStorage.getItem('tasks') !== null) {
        let tasksData = window.localStorage.getItem('tasks');
        tasks = JSON.parse(tasksData);
    }
}

/**
 * Adds a new task to the tasks array
 */
function addTask() {
    let title = document.getElementById('taskTitleInput');
    let description = document.getElementById('taskDescInput');

    // checkValidity() validates HTML attributes of the element
    if (title.checkValidity() && description.checkValidity()) {
        // This is a JavaScript object
        let task = {
            id: tasks.length,
            title: title.value,
            description: description.value,
            completed: false
        };

        tasks.push(task); // Adds new element to the tasks array
        saveTasks();
        clearForm();
        refreshTasksContainers();
    } else {
        alert('Verifica el formulario, por favor...');
    }
}

/**
 * Marks a task as completed
 * @param {*} taskId - Id of the task that will marked as completed
 */
function markTaskAsCompleted(taskId) {
    tasks[taskId].completed = true;
    saveTasks();
    refreshTasksContainers();
}

/**
 * Refreshes completedTasksContainer and tasksContainer
 */
function refreshTasksContainers() {
    let completedTasks = buildTasksHTML(true);
    document.getElementById('completedTasksContainer').innerHTML = completedTasks;

    let tasksHtml = buildTasksHTML(false);
    document.getElementById('tasksContainer').innerHTML = tasksHtml;

    addEventListenerForBtnComplete();
}

/**
 * Builds HTML code for all the tasks contained in 
 * the tasks array
 * @param {*} completedTasks 
 */
function buildTasksHTML(completedTasks = false) {
    let html = '';

    // This is a forEach cicle in JavaScript
    tasks.forEach(function (task) {
        if (task.completed == completedTasks) {
            html += buildTaskHTML(task);
        }
    });

    return html;
}

/**
 * Builds HTML code for the given task
 * @param {*} task 
 */
function buildTaskHTML(task) {
    let html = `
    <div class="task">
        <p class="task-title">
            <b>Título:</b> ${task.title}
        </p>
        <p class="task-desc">
            <b>Descripción:</b> ${task.description}
        </p>`;

    if (!task.completed) {
        html += `
            <button class="btnComplete is-info" 
                    type="button" 
                    data-id="${task.id}">Completa</button>
            <button class="btnDelete is-danger" 
                    type="button" 
                    data-id="${task.id}">Descartar</button>
        `;
    }

    html += `</div>`;

    return html;
}

/**
 * Clears the inputs contained in the form
 */
function clearForm() {
    let title = document.getElementById('taskTitleInput');
    let description = document.getElementById('taskDescInput');

    title.value = null;
    description.value = null;
}



/**
 * Event handling
 * 
 * Add here all your code to handle the following events:
 * 1. Event to handle clicks on addTaskButton button
 * 2. Event to handle clicks on buttons that have btnComplete class
 * 3. Event to hanle clicks on buttons that have btnDelete class
 * 
 * EXTRA:
 * 1. Event to handle clicks on populateFromAPI button
 * 2. Store everything in localstorage
 */

// Add your code here
document.getElementById('addTaskButton')
    .addEventListener("click", function () {
        addTask();
    });

/**
 * Adds event listener for each button
 * This needs to be called after adding HTML code
 * that contains buttons with class btnComplete  
 */
function addEventListenerForBtnComplete() {
    let htmlElements = document.getElementsByClassName('btnComplete');

    for (let element of htmlElements) {
        element.addEventListener("click", function () {
            let taskId = this.getAttribute('data-id');
            markTaskAsCompleted(taskId);
        });
    }
}

/**
 * The DOMContentLoaded event fires when the initial HTML 
 * document has been completely loaded and parsed, 
 * without waiting for stylesheets, images, and subframes 
 * to finish loading.
 */
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    refreshTasksContainers();
});

/**
 * Populates the tasks array with data retrieved by calling 
 * an API using AJAX and GET HTTP method
 */
document.getElementById('populateFromAPI')
    .addEventListener("click", function () {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.response);

                response.forEach(function (element) {
                    let task = {
                        id: tasks.length,
                        title: element.title,
                        description: element.title,
                        completed: element.completed
                    };
                    tasks.push(task);
                });

                refreshTasksContainers();
            }
        }

        let apiUrl = 'https://jsonplaceholder.typicode.com/todos';
        xhttp.open('GET', apiUrl);
        xhttp.send();
    });