# To Do List React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. About
Features:
* Add/remove tasks
* Save your tasks between sessions
* Collect done tasks
* Prioritize your tasks
* Edit your tasks & describe them

## 2. App State
```{js}
state = {
  isDoneListVisible: false,
  taskInputValue: "",
  lastID: 10000,
  tasksData: []
};
```
* isDoneListVisible - flag for rendering the list with done tasks
* taskInputValue - present value of the task input
* lastID - last used ID (during task creation)
* tasksData - array of objects (each object representing a task)

## 3. Task Object
```{js}
newTask = {
  title: "",
  id: 10000,
  description: "",
  priority: false,
  done: false,
  open: false
};
```
* title - task title
* id - id of the task, based on the state lastID
* description - task description
* priority - flag, is the task a priority or not
* done - flag, is the task done or not
* open - flag, is the task open for editing or not

## 4. Local Storage
App uses local storage to hold the tasks data in between sessions. There are two items:
* tasksData - array of task objects
* lastID - lastID from the state

## 5. Components
### 5.1 Background 
Takes no props, responsible for rendering of the background that takes 100% of viewport height and width.

### 5.2 TaskForm
```{js}
TaskForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  changeInputValue: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  clearTasks: PropTypes.func.isRequired
};
```
Form used for adding the tasks and clearing the tasks (and local storage).

Props:  
* inputValue - present input value as in the state
* changeInputValue - function responsible for updating the input value in the state on change in the input
* addTask - function passed to a button & the form, responsible for adding the task both on button click and form submit
* clearTask - function passed to a button, reponsible for clearing the tasks from the state (and from the local storage)

### 5.3 Btn
```{js}
Btn.propTypes = {
  click: PropTypes.func.isRequired,
  styles: PropTypes.string
};
```
Just a button.

Props:  
* click - function to execute on click
* styles - classes used for additional styling

### 5.4 TaskList
```{js}
TaskList.propTypes = {
  data: PropTypes.array.isRequired,
  isDone: PropTypes.bool.isRequired
};
```
Unordered list rendering the tasks.

Props:  
* data - tasks array from the state
* isDone - flag, should the list render done tasks or pending tasks

### 5.5 Task 
```{js}
Task.propTypes = {
  data: PropTypes.object.isRequired
};
```
List item rendering task data and controls.

Props: 
* data - single task object

### 5.6 TaskIcons
```{js}
TaskIcons.propTypes = {
  priorityTitle: PropTypes.string
};
```
Control icons allowing for opening the task for editing, marking it as done, marking it as priority or deleting it.

Props: 
* priorityTitle - interchange priority title appearing on hover.

Beside props individual icons take onClick functions passed by the TaskContext.

### 5.7 TaskInputs
```{js}
TaskInputs.propTypes = {
  data: PropTypes.object.isRequired
};
```
Inputs allowing for editing of the task title and its description.

Props: 
* data - single task object

As TaskIcons inputs take addtional functions executed onChange passed by TaskContext.

## 6. TaskContext
```{js}
const taskContext = React.createContext({
  changeTaskStatus: () => {},
  updateTask: () => {}
});
```

Context wrapping TaskList components that passes functions responsible for changing task status and updating its contents to the icons and inputs. 