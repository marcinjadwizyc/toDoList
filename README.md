# To Do List React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. Features
* Add task to the DOM
* Remove task from the DOM
* Add task to the Local Storage
* Remove task from the Local Storage
* Load the task from the Local Storage on app start

## 2. State
```{js}
state = {
		taskInputValue: "",
		lastID: 10000,
		tasks: []
	};
```

Values: 
* taskInputValue - value of the text input used for adding tasks
* lastID - last ID used in the task object construction
* tasks - array gathering all tasks objects

## 3. Task Object
```{js}
{ taskValue: presentInput, id: presentID + 1 }
```

## 4. Components
### 4.1 Background
```{js}
  <Background />
```

Fixed background taking 100% of viewport height and width.

### 4.2 TaskForm
```{js}
<TaskForm
  taskInputValue={this.state.taskInputValue}
  changeFunc={this.updateInputValueHandler}
  submitFunc={this.addTaskHandler}
  clearFunc={this.clearTasksHandler}
/>
```

Input form used for adding the tasks. Build from one text input, container for the buttons and two buttons (Add task & Clear tasks).

Props: 
* changeFunc - function used to update taskInputValue in the state on input change
* taskInputValue - present input value from the state passed to the input to use in value attribute
* submitFunc - function used to add the tasks to the array in the state on form submit (either pressing Enter with focus in the input or pressing "Add task" button)
* clearFunc - function used to clear the tasks array in the state (replace it with an empty array) after pressing "Clear tasks" button

### 4.3 TaskList
```{js}
<TaskList 
  tasksData={this.state.tasks} 
  clickFunc={this.removeTaskHandler} 
/>
```

Props: 
* tasksData - tasks array from the state to pass the individual tasks data to <Task /> component
* clickFunc - function used to remove the task from the tasks array in the state (marking the task as done), passed to <Task /> component

### 4.4 Task
```{js}
<Task key={task.id} taskID={task.id} removeFunc={props.clickFunc}>
  {task.taskValue}
</Task>
```

List item presenting an individual task.

Props:
* key - React requirement (ID)
* taskID - ID used to find the task in the tasks array in the state
* removeFunc - clickFunc from <TaskList /> component, used on the icon 