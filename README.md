# To Do List React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. About
Ver. 1.1

Features:
* Add/remove tasks
* Save your tasks between sessions
* Collect done tasks
* Prioritize your tasks

Changes: 
* Ver 1.1 - Added task priority feature

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
  done: false,
  priority: false }
```

## 4. Local Storage
Tasks and last ID are save in the Browsers Local Storage as "tasks" and "lastID". Values are updated on every action that changes respective values in the app state.

## 5. Components
### 5.1 Background
```{js}
<Background />
```
Background component with fixed position taking 100% of viewport width & height. Image with overlaying linear-gradient.

### 5.2 Btn
```{js}
<Btn className={styles} onClick={props.clickFunc}>Btn text content</Btn>
```
Button component used in the input form for 2 roles: Adding tasks & Clearing all tasks. Also used under first task list to toggle visiblity of "done" task list.

### 5.3 Task
```{js}
<Task
  styles={styles}
  key={task.id}
  taskID={task.id}
  removeTaskFunc={props.removeTaskFunc}
  doneTaskFunc={props.doneTaskFunc}
  priorityTaskFunc={props.priorityTaskFunc}
  taskPriority={task.priority}
>
```
Single task list item showing task value and 3 icons: remove task, prioritize task & mark task as done. Each task has its own unique ID value and passes functions to icons nested in it.

### 5.4 TaskForm
```{js}
<TaskForm
  taskInputValue={this.state.taskInputValue}
  inputChange {this.updateInputValueHandler}
  submitFormFunc={this.addTaskHandler}
  clearTasksFunc={this.clearTasksHandler}
/>
```
Form used for new tasks input. Build from one text input and two buttons: Add tasks & Clear all tasks.

### 5.5 Task List
```{js}
<TaskList
  tasksData={this.state.tasks}
  doneList={false}
  removeTaskFunc={this.removeTaskHandler}
  doneTaskFunc={this.doneTaskHandler}
  priorityTaskFunc={this.priorityTaskHandler}
/>
```
List of tasks with 2 version - pending tasks & done tasks. Gathers <Task/> components created based on the tasks database from the state.