var tasks = [];

document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addTask();
    });
    
    displayTasks();
});

function addTask() {
    var taskInput = document.getElementById("task-title").value;
    var prioritySelect = document.getElementById("task-priority").value;
    var status = document.querySelector('input[name="status"]:checked').value;

    if (taskInput.trim() === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = {
        title: taskInput,
        priority: prioritySelect,
        status: status
    };

    tasks.push(task);
    displayTasks();
    document.getElementById("taskForm").reset();
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function toggleTaskStatus(index) {
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    displayTasks();
}

function displayTasks() {
    var taskListContainer = document.getElementById("taskList");
    taskListContainer.innerHTML = "";
    
    tasks.forEach((task, index) => {
        var taskElement = document.createElement("div");
        taskElement.classList.add("task");

        if (task.status === "completed") {
            taskElement.classList.add("completed");
        }
        taskElement.innerHTML = `
        <div style="text-align: center">
            <input id="CompletionMark" type="checkbox" onchange="toggleTaskStatus(${index})" ${task.status === "completed" ? "checked" : ""}>
            <label for="CompletionMark">${task.status === "completed" ? "Mark Pending" : "Mark Completed"}</label> 
            <h4 style="text-transform:capitalize">${task.title}</h4>
            <p style="text-transform:capitalize">Priority: ${task.priority}</p>
            <button onclick="removeTask(${index})" class="btn btn-danger">Remove Task</button>
            <hr class="dashed">
        </div>
        `;
        taskListContainer.appendChild(taskElement);
    });
}