let tasksArray = JSON.parse(localStorage.getItem("tasks"));

let ui = {
  taskList: document.querySelector(".app__list"),
  taskInput: document.querySelector(".app__input-task"),
  addTaskBtn: document.querySelector(".app__add-task"),
  clearTasksBtn: document.querySelector(".app__clear-tasks"),
}

let mainFuns = {
  addTask: function (source) {
    ui.taskList.appendChild(helperFuns.constructTaskHTML(source));
  },

  addTaskOrShowAlert: function() {
    if(ui.taskInput.value !== ""){
      mainFuns.addTask(ui.taskInput.value);
      mainFuns.addTaskToLocalStorage();
      helperFuns.clearTaskInput();
    } else {
      alert("Please write in a task.");
    }
  },

  removeTask: function (event) {
    if (event.target.classList.contains("app__icon--done")){
      mainFuns.removeTaskFromLocalStorage();
      event.target.parentElement.remove();
    }
  },

  clearTasks: function() {
    ui.taskList.innerHTML = "";

    mainFuns.removeAllTasksFromLocalStorage();
  },

  addTaskToLocalStorage: function () {
    tasksArray.push(ui.taskInput.value);

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  },

  removeTaskFromLocalStorage: function() {
    let removeIndex = tasksArray.indexOf(event.target.parentElement.firstElementChild.innerText);
    tasksArray.splice(removeIndex, 1);

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  },

  loadTasksFromLocalStorage: function() {
    for(let i = 0; i < tasksArray.length; i++){
      mainFuns.addTask(tasksArray[i]);
    }
  },

  removeAllTasksFromLocalStorage: function() {
    tasksArray = [];
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
}

let helperFuns = {
  clearTaskInput: function () {
    ui.taskInput.value = "";
  },

  constructTaskHTML: function (source) {
    let li = document.createElement("li");
    li.className = "app__item flex-between";

    let p = document.createElement("p");
    p.className = "app__task";
    p.innerText = source;

    let i = document.createElement("i");
    i.className = "app__icon app__icon--done fas fa-check";

    li.appendChild(p);
    li.appendChild(i);

    return li;
  }
}

// Event listeners
ui.addTaskBtn.addEventListener("click", function(event){
  event.preventDefault();
  mainFuns.addTaskOrShowAlert();
});

ui.clearTasksBtn.addEventListener("click", mainFuns.clearTasks);
ui.taskList.addEventListener("click", mainFuns.removeTask);

window.onload = () => mainFuns.loadTasksFromLocalStorage();