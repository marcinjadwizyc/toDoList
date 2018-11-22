let ui = (function(){
  let constructTask = function(taskSource){
    let listItem = document.createElement("li");
    listItem.className = "app__item flex-between";

    let taskTitle = document.createElement("p");
    taskTitle.className = "app__task";
    taskTitle.innerText = taskSource;

    let icon = document.createElement("i");
    icon.className = "app__icon app__icon--done fas fa-check";

    listItem.appendChild(taskTitle);
    listItem.appendChild(icon);

    return listItem;
  }

  let addTaskToList = function(taskSource){
    let task = constructTask(taskSource);
    document.querySelector(".app__list").appendChild(task);
  }

  let clearTaskInput = function(){
    document.querySelector(".app__input-task").value = "";
  }

  let removeTaskFromList = function(){
    if (event.target.classList.contains("app__icon--done")){
      event.target.parentElement.remove();
    }
  }

  let clearTaskList = function(){
    document.querySelector(".app__list").innerHTML = "";
  }

  let showAlert = function(){
    alert("Please write in a task.");
  }

  return {
    addTaskToList: function(taskSource){
      addTaskToList(taskSource);
    },

    removeTaskFromList: function(){
      removeTaskFromList();
    },

    clearTaskInput: function(){
      clearTaskInput();
    },

    clearTaskList: function(){
      clearTaskList();
    },

    showAlert: function(){
      showAlert();
    }
  }

})();

let data = (function(){
  let getLocalStorage = function(){
    return JSON.parse(localStorage.getItem("tasks"));
  }

  let updateLocalStorage = function(data){
    localStorage.setItem("tasks", JSON.stringify(data));
  }

  let clearLocalStorage = function(){
    let tasksData = [];
    updateLocalStorage(tasksData);
  }

  let addTaskToLocalStorage = function(){
    let tasksData = getLocalStorage();

    tasksData.push(document.querySelector(".app__input-task").value);

    updateLocalStorage(tasksData);
  }

  let removeTaskFromLocalStorage = function(){
    let tasksData = getLocalStorage();

    let target = event.target.previousSibling.innerText;

    let targetIndex = tasksData.indexOf(target);

    tasksData.splice(targetIndex, 1);

    updateLocalStorage(tasksData);
  }

  return {
    localStorageData: getLocalStorage(),

    clearLocalStorage: function(){
      clearLocalStorage();
    },

    addTaskToLocalStorage: function(){
      addTaskToLocalStorage();
    },

    removeTaskFromLocalStorage: function(){
      removeTaskFromLocalStorage();
    }
  }

})();

let controller = (function(uiModule, dataModule){
  let initializeApp = function(){
    let tasksData = dataModule.localStorageData;

    for(let i = 0; i < tasksData.length; i++){
      uiModule.addTaskToList(tasksData[i]);
    }
  }

  window.onload = () => initializeApp();

  let taskInput = document.querySelector(".app__input-task");

  document.querySelector(".app__add-task").addEventListener("click", function(event){
    event.preventDefault();

    if(taskInput.value === ""){
      uiModule.showAlert();
    } else {
      dataModule.addTaskToLocalStorage();
      uiModule.addTaskToList(taskInput.value);

      uiModule.clearTaskInput();
    }
  });

  document.querySelector(".app__list").addEventListener("click", function(){
    dataModule.removeTaskFromLocalStorage();
    uiModule.removeTaskFromList();
  });

  document.querySelector(".app__clear-tasks").addEventListener("click", function(){
    dataModule.clearLocalStorage();
    uiModule.clearTaskList();
  })

})(ui, data);