const ui = (function(){

  const domElements = {
    taskInput: document.querySelector(".app__input-task"),
    addTaskBtn: document.querySelector(".app__add-task"),
    clearTasksBtn: document.querySelector(".app__clear-tasks"),
    tasksList: document.querySelector(".app__list")
  }

  const constructTask = function(taskSource){
    const taskMarkup = `
      <li class="app__item flex-between">
        <p class="app__task">${taskSource}</p>
        <i class="app__icon app__icon--done fas fa-check"></i>
      </li>
    `;

    return taskMarkup;
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
      const task = constructTask(taskSource);
      domElements.tasksList.innerHTML += task;
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

const data = (function(){

  const setLocalStorage = function(dataToStore){
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

      const taskTitle = event.target.previousSibling.innerText;

      const indexOfTask = tasksArray.indexOf(taskTitle);

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

const controller = (function(uiModule, dataModule){
  const domElements = uiModule.getDomElements();

  const initTasks = function(){
    dataModule.initLocalStorage();

    let tasksArray = dataModule.getLocalStorage();

    for(let i = 0; i < tasksArray.length; i++){
      uiModule.addTaskToList(tasksArray[i]);
    };
  }

  const setEventListeners = function(){
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