// Functie om taken toe te voegen
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        var newTask = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            toggleTaskStatus(newTask, checkbox.checked);
            saveTasks();
        });

        var taskText = document.createElement("span");
        taskText.textContent = taskInput.value;

        newTask.appendChild(checkbox);
        newTask.appendChild(taskText);
        taskList.appendChild(newTask);

        saveTasks(); // Opslaan na toevoegen van een taak

        taskInput.value = "";
    }
}

// Functie om de status van een taak te wijzigen
function toggleTaskStatus(task, isChecked) {
    task.style.textDecoration = isChecked ? "line-through" : "none";
}

// Functie om taken op te slaan in de URL
function saveTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = [];

    // Loop door alle taken en voeg tekst en status toe aan het array
    taskList.childNodes.forEach(function (task) {
        var taskText = task.querySelector("span").textContent;
        var taskStatus = task.querySelector("input[type='checkbox']").checked;
        tasks.push({ text: taskText, status: taskStatus });
    });

    // Converteer het array naar een query string en update de URL
    var queryString = tasks.map(task => `task=${encodeURIComponent(task.text)}&status=${task.status ? 1 : 0}`).join('&');
    window.history.replaceState({}, document.title, '?' + queryString);
}

// Functie om taken te laden vanuit de URL
function loadTasks() {
    var taskList = document.getElementById("taskList");
    var urlParams = new URLSearchParams(window.location.search);
    var tasks = [];

    // Loop door de query parameters en voeg taken toe aan het array
    urlParams.getAll('task').forEach(function (taskText, index) {
        var taskStatus = urlParams.getAll('status')[index] === '1';

        var newTask = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = taskStatus;
        checkbox.addEventListener("change", function () {
            toggleTaskStatus(newTask, checkbox.checked);
            saveTasks();
        });

        var taskTextElement = document.createElement("span");
        taskTextElement.textContent = decodeURIComponent(taskText);

        newTask.appendChild(checkbox);
        newTask.appendChild(taskTextElement);
        taskList.appendChild(newTask);

        toggleTaskStatus(newTask, taskStatus); // Wijzig de stijl op basis van status
    });
}

// Laad taken bij het starten van de applicatie
loadTasks();
