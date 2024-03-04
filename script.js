function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        var newTask = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function () {
            toggleTaskStatus(newTask, checkbox.checked);
        });

        var taskText = document.createElement("span");
        taskText.textContent = taskInput.value;

        newTask.appendChild(checkbox);
        newTask.appendChild(taskText);
        taskList.appendChild(newTask);

        taskInput.value = "";
    }
}

function toggleTaskStatus(task, isChecked) {
    task.style.textDecoration = isChecked ? "line-through" : "none";
}
