# To Do List React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. About
Ver. 1.0

Features:
* Add/remove tasks
* Save your tasks between sessions
* Collect done tasks

## 2. State
```{js}
state = {
  doneListVisible: false,
  taskInputValue: "",
  lastID: 10000,
  tasks: []
};
```

Values: 
* doneListVisible - flag for conditional rendering of "done" tasks list
* taskInputValue - value of the text input used for adding tasks
* lastID - last ID used in the task object construction
* tasks - array gathering all tasks objects

## 3. Task Object
```{js}
{ taskValue: presentInput, 
  id: presentID + 1, 
  done: false }
```

## 4. Local Storage
Tasks and last ID are save in the Browsers Local Storage as "tasks" and "lastID". Values are updated on every action that changes respective values in the app state.