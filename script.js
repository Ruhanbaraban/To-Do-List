const taskValue = document.getElementById("taskValue");
const tasks = document.getElementById("tasks");
const taskIndicator = document.getElementsByClassName("indicator");
const addTaskButton = document.getElementById("addTaskButton");
const showAllTasks = document.getElementById("showAllTasks");
const showResolvedTasks = document.getElementById("showResolvedTasks");
const showUnresolvedTasks = document.getElementById("showUnresolvedTasks");
const boxForActions = document.getElementById("forActions");

const url = "https://jsonplaceholder.typicode.com/todos";
let timer = null;

const savedTasks = localStorage.getItem("tasks");
if(!savedTasks){
    loadTaskFromServer()
} else{
    loadTasksFromLocalStorage()
}


function saveTasksToLocalStorage(){
    const savedTasks = [];

    tasks.querySelectorAll(".task").forEach((task) => {
        const indicator = task.querySelector(".indicator");
        const taskTitleValue = task.querySelector(".taskValue")

        savedTasks.push({
            taskTitle: taskTitleValue.textContent,
            taskStatus: indicator.checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

function loadTasksFromLocalStorage(){
    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
        let tasksData = JSON.parse(savedTasks);
        tasksData.forEach((taskData) => {
            const task = document.createElement("div");
            task.className = "task";
            task.innerHTML = `
            <div class="leftPartOfTask">
                <input type="checkbox" class="indicator" ${taskData.taskStatus ? "checked" : ""}>
                <span class="taskValue">${taskData.taskTitle}</span>
            </div>
            <div class="rightPartOfTask">
                <img src="6ee4c4324c3f1dafd6b7ada58864dcbc.png" alt="" class="timer">
                <button class="deleteTask">Удалить задачу</button>
            </div>
            `;
            tasks.appendChild(task);

            if(taskData.taskStatus === true){
                task.classList.add("resolved")
            }
        })
    }
}

function loadTaskFromServer(){
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
                    <img src="6ee4c4324c3f1dafd6b7ada58864dcbc.png" alt="" class="timer">
                    <button class="deleteTask">Удалить задачу</button>
                </div>
                `;
                tasks.appendChild(task);

                saveTasksToLocalStorage();
            }
        })
        .catch((err) => {
            alert(err)
        });
}

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
        <img src="6ee4c4324c3f1dafd6b7ada58864dcbc.png" alt="" class="timer">
        <button class="deleteTask">Удалить задачу</button>
    </div>
    `;
    tasks.appendChild(task);

    taskValue.value = "";
     
    saveTasksToLocalStorage();
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
        saveTasksToLocalStorage()
    }
})

tasks.addEventListener("click", (e) => {
    if(e.target.classList.contains("deleteTask")){
        const task = e.target.closest(".task");
        clearTimeout(timer)
        tasks.removeChild(task);
        saveTasksToLocalStorage()
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

tasks.addEventListener("click", (e) => {
    if(e.target.classList.contains("timer")){

        boxForActions.innerHTML = `
            <input type="number" placeholder="В минутах" id="timeForTimer">
            <button id="submitTimer">Установить таймер</button>
            <span id="closeBoxBtn">X</span>
        `

        const timerInput = boxForActions.querySelector("#timeForTimer");
        const submitTimer = boxForActions.querySelector("#submitTimer");
        const closeBoxBtn = boxForActions.querySelector("#closeBoxBtn");

        closeBoxBtn.addEventListener("click", () => {
            boxForActions.innerHTML = "";
        })

        submitTimer.addEventListener("click", () => {
            const minutes = parseInt(timerInput.value);
            clearTimeout(timer)
            if(minutes <= 0){
                alert("Количество минут должно быть положительным!");
                return;
            }
            timer = setTimeout(() => {
                alert("Время вышло!");
                timer = null;
            }, minutes * 60000);
            timerInput.value = "";
        })
    }

})