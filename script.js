const taskValue = document.getElementById("taskValue");
const tasks = document.getElementById("tasks");
const taskIndicator = document.getElementsByClassName("indicator");
const addTaskButton = document.getElementById("addTaskButton");
const showAllTasks = document.getElementById("showAllTasks");
const showResolvedTasks = document.getElementById("showResolvedTasks");
const showUnresolvedTasks = document.getElementById("showUnresolvedTasks");

const url = "https://jsonplaceholder.typicode.com/todos";

fetch(url)
.then(response => {
    if(!response.ok){
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    return response.json()
})
.then((response) => {
    for(let i = 0; i < 5; i++){
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `
        <div class="leftPartOfTask">
            <input type="checkbox" class="indicator">
            <span class="taskValue">${response[i].title}</span>
        </div>
        <div class="rightPartOfTask">
            <img src="" alt="" class="timer">
            <button class="deleteTask">Удалить задачу</button>
        </div>
        `;
        tasks.appendChild(task);
    }
})
.catch((err) => {
    alert(err)
});


addTaskButton.addEventListener("click", function addTask(){
    if(taskValue.value.trim().length === 0){
        alert("Введите задачу!");
        return;
    }
    const task = document.createElement("div");
    task.className = "task";
    task.innerHTML = `
    <div class="leftPartOfTask">
        <input type="checkbox" class="indicator">
        <span class="taskValue">${taskValue.value}</span>
    </div>
    <div class="rightPartOfTask">
        <img src="" alt="" class="timer">
        <button class="deleteTask">Удалить задачу</button>
    </div>
    `;
    tasks.appendChild(task);
});

tasks.addEventListener("change", (e) => {
    if(e.target.type === "checkbox" && e.target.classList.contains("indicator")){
        const task = e.target.closest(".task");
        const indicator = task.querySelector(".indicator")
        if(indicator.checked){
            task.classList.add("resolved");
        } else(
            task.classList.remove("resolved")
        )
    }
})

tasks.addEventListener("click", (e) => {
    if(e.target.classList.contains("deleteTask")){
        const task = e.target.closest(".task");
        tasks.removeChild(task);
    }
})

showAllTasks.addEventListener("click", () => {
    tasks.querySelectorAll(".task").forEach((task) => {
        task.classList.remove("filtered");
    })

})

showResolvedTasks.addEventListener("click", () => {
    tasks.querySelectorAll(".task").forEach((task) => {
        const indicator = task.querySelector(".indicator");
        if(!indicator.checked){
            task.classList.add("filtered");
        } else{
            task.classList.remove("filtered");
        }
    })
})

showUnresolvedTasks.addEventListener("click", () => {
    tasks.querySelectorAll(".task").forEach((task) => {
        const indicator = task.querySelector(".indicator")
        if(indicator.checked){
            task.classList.add("filtered")
        } else{
            task.classList.remove("filtered")
        }
    })
})