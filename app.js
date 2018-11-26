let ui = (function(){

  let domElements = {
    taskInput: document.querySelector(".app__input-task"),
    addTaskBtn: document.querySelector(".app__add-task"),
    clearTasksBtn: document.querySelector(".app__clear-tasks"),
    tasksList: document.querySelector(".app__list")
  }

  let constructTask = function(taskSource){
    let item = document.createElement("li");
    item.className = "app__item flex-between";

    let taskTitle = document.createElement("p");
    taskTitle.className = "app__task";
    taskTitle.innerText = taskSource;

    let icon = document.createElement("i");
    icon.className = "app__icon app__icon--done fas fa-check";

    item.appendChild(taskTitle);
    item.appendChild(icon);

    return item;
  }

  return {
    getDomElements: function(){
      return domElements;
    },

    clearTaskInput: function(){
      domElements.taskInput.value = "";
    },

    getTaskInput: function(){
      return domElements.taskInput.value;
    },

    addTaskToList: function(taskSource){
      let task = constructTask(taskSource);
      domElements.tasksList.appendChild(task);
    },

    removeTaskFromList: function(event){
      event.target.parentElement.remove();
    },

    clearTasksList: function(){
      domElements.tasksList.innerHTML = "";
    },

    showAlert: function(){
      alert("Please write in a task.");
    }
  }

})();

let data = (function(){

  let setLocalStorage = function(dataToStore){
    localStorage.setItem("tasks", JSON.stringify(dataToStore));
  }

  return {
    getLocalStorage: function(){
      return JSON.parse(localStorage.getItem("tasks"));
    },

    addTaskToLocalStorage: function(taskTitle){
      let tasksArray = this.getLocalStorage();
      tasksArray.push(taskTitle);
      setLocalStorage(tasksArray);
    },

    removeTaskFromLocalStorage: function(event){
      let tasksArray = this.getLocalStorage();

      let taskTitle = event.target.previousSibling.innerText;

      let indexOfTask = tasksArray.indexOf(taskTitle);

      tasksArray.splice(indexOfTask, 1);

      setLocalStorage(tasksArray);
    },

    clearLocalStorage: function(){
      localStorage.setItem("tasks", JSON.stringify([]));
    },

    initLocalStorage: function(){
      if(localStorage.hasOwnProperty("tasks") === false){
        localStorage.setItem("tasks", JSON.stringify([]));
      }
    }
  }

})();

let controller = (function(uiModule, dataModule){
  let domElements = uiModule.getDomElements();

  let initTasks = function(){
    dataModule.initLocalStorage();

    tasksArray = dataModule.getLocalStorage();

    for(let i = 0; i < tasksArray.length; i++){
      uiModule.addTaskToList(tasksArray[i]);
    };
  }

  let setEventListeners = function(){
    window.onload = () => initTasks();

    domElements.addTaskBtn.addEventListener("click", function(event){
      event.preventDefault();

      if(uiModule.getTaskInput() === ""){
        uiModule.showAlert();
      } else {
        dataModule.addTaskToLocalStorage(uiModule.getTaskInput());

        uiModule.addTaskToList(uiModule.getTaskInput());
        uiModule.clearTaskInput();
      }
    });

    domElements.tasksList.addEventListener("click", function(event){
      if (event.target.classList.contains("app__icon--done")){
        dataModule.removeTaskFromLocalStorage(event);

        uiModule.removeTaskFromList(event);
      }
    });

    domElements.clearTasksBtn.addEventListener("click", function(){
      dataModule.clearLocalStorage();

      uiModule.clearTasksList();
    })
  }

  return {
    init: function(){
      setEventListeners();
    }
  }

})(ui, data);

controller.init();