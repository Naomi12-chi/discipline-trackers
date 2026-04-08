const Tasks = document.getElementById("tasks");
const addTask = document.getElementById("add-task");
let taskList = document.getElementById("tasklist");
const counter = document.getElementById("counter");
const message = document.getElementById("message");
function saveTasks(taskArray) {
    localStorage.setItem("myTask", JSON.stringify(taskArray));
}
function createTask(task, index, taskArray) {
    let taskContain = document.createElement("div");

    let text = document.createElement("p");
    text.innerText = task.text;
    if (task.completed) {
        text.style.textDecoration = "line-through";
    }

    let doneBtn = document.createElement("button");
    doneBtn.innerText = "done";

    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";

    doneBtn.addEventListener("click", function () {
        task.completed = !task.completed;
        saveTasks(taskArray);
        loadTasks();
    });
    delBtn.addEventListener("click", function () {
        taskArray.splice(index, 1);
        saveTasks(taskArray);
        loadTasks();
    });

    taskContain.appendChild(text);
    taskContain.appendChild(doneBtn);
    taskContain.appendChild(delBtn);

    taskList.appendChild(taskContain);
}
function loadTasks() {
    let storedTasks = localStorage.getItem("myTask");
    let taskArray = storedTasks ? JSON.parse(storedTasks) : [];
    if (taskArray.length === 0) {
    taskList.innerHTML = "<p class='empty'>No tasks yet... start small </p>";
    return;
}
else {
   taskList.innerHTML= "";
} 
    taskArray.forEach(function (task, index) {
        createTask(task, index, taskArray);
        let completed = taskArray.filter(task => task.completed).length;

counter.innerText = `Completed: ${completed} / ${taskArray.length}`;
        if (completed === taskArray.length && taskArray.length > 0) {
    message.innerText = "All tasks completed! You're on fire!";
} else if (completed > 0) {
    message.innerText = "Keep going, you're making progress!";
} else {
    message.innerText = "";
}
let streak = updateStreak(completed === taskArray.length && taskArray.length > 0);

counter.innerText += ` | Streak: ${streak}`;
    });
}
Tasks.addEventListener("click", function () {
    let input = addTask.value;

    if (input.trim() === "") {
        alert("please add task");
        return;
    }
    else {
        alert ("Task added successfully!");
    }
    let storedTasks = localStorage.getItem("myTask");
    let taskArray = storedTasks ? JSON.parse(storedTasks) : [];
    let newTask = {
        text: input,
        completed: false
    };

    taskArray.push(newTask);
    saveTasks(taskArray);

    addTask.value = "";
    loadTasks();
});
function updateStreak(allCompleted) {
    let streak = localStorage.getItem("streak") || 0;
    let lastDate = localStorage.getItem("lastDate");

    let today = new Date().toDateString();

    if (allCompleted) {
        if (lastDate !== today) {
            streak++;
            localStorage.setItem("streak", streak);
            localStorage.setItem("lastDate", today);
        }
    }

    return streak;
}
window.addEventListener("DOMContentLoaded", loadTasks);