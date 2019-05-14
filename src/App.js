import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Btn from "./Components/Btn";

class App extends Component {
	state = {
		doneListVisible: false,
		taskInputValue: "",
		lastID: 10000,
		tasks: []
	};

	// LS methods
	lsGetData = () => {
		return {
			lastID: JSON.parse(localStorage.getItem("lastID")),
			tasks: JSON.parse(localStorage.getItem("tasks"))
		};
	};

	lsSetData = (tasksArray) => {
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
		localStorage.setItem("lastID", this.state.lastID + 1);
	};

	// Get data on component mount
	componentDidMount() {
		const localStorageData = this.lsGetData();

		if ((localStorageData.tasks !== null) & (localStorageData.lastID !== null)) {
			this.setState({
				lastID: localStorageData.lastID,
				tasks: localStorageData.tasks
			});
		}
	}

	updateInputValueHandler = (event) => {
		this.setState({
			taskInputValue: event.target.value
		});
	};

	addTaskHandler = (event) => {
		event.preventDefault();

		const presentInput = this.state.taskInputValue;
		const presentID = this.state.lastID;

		if (presentInput.length > 0) {
			const newTasks = [
				...this.state.tasks,
				{
					taskValue: presentInput,
					id: presentID + 1,
					done: false,
					priority: false
				}
			];

			this.lsSetData(newTasks);

			this.setState({
				taskInputValue: "",
				lastID: presentID + 1,
				tasks: newTasks
			});
		}
	};

	findTaskIndex = (tasksArray, taskID) => {
		const taskIndex = tasksArray.findIndex((task) => {
			return task.id === taskID;
		});

		return taskIndex;
	};

	getTaskData = (event) => {
		return {
			taskID: Number(event.target.parentElement.parentElement.getAttribute("id")),
			tasks: [ ...this.state.tasks ]
		};
	};

	removeTaskHandler = (event) => {
		const taskData = this.getTaskData(event);

		const taskIndex = this.findTaskIndex(taskData.tasks, taskData.taskID);

		taskData.tasks.splice(taskIndex, 1);

		this.lsSetData(taskData.tasks);

		this.setState({
			tasks: taskData.tasks
		});
	};

	doneTaskHandler = (event) => {
		const taskData = this.getTaskData(event);

		const taskIndex = this.findTaskIndex(taskData.tasks, taskData.taskID);

		taskData.tasks[taskIndex].done = true;

		this.lsSetData(taskData.tasks);

		this.setState({
			tasks: taskData.tasks
		});
	};

	clearTasksHandler = () => {
		localStorage.removeItem("tasks");

		this.setState({
			taskInputValue: "",
			tasks: []
		});
	};

	showDoneTasksHandler = () => {
		const doneTasksStatus = this.state.doneListVisible;

		this.setState({
			doneListVisible: !doneTasksStatus
		});
	};

	priorityTaskHandler = (event) => {
		const task = event.target.parentElement.parentElement;

		const taskData = this.getTaskData(event);

		const taskIndex = this.findTaskIndex(taskData.tasks, taskData.taskID);

		const eventTask = taskData.tasks.splice(taskIndex, 1);

		let newData = [ ...eventTask, ...taskData.tasks ];

		if (task.classList.contains("task--priority")) {
			eventTask[0].priority = false;

			const priorities = newData.filter((task) => {
				return task.priority === true;
			});
			const pending = newData.filter((task) => {
				return task.priority === false;
			});

			newData = [ ...priorities, ...pending ];
		} else {
			eventTask[0].priority = true;
		}

		this.lsSetData(newData);

		this.setState({
			tasks: newData
		});

		task.classList.toggle("task--priority");
	};

	render() {
		let doneTasks;

		doneTasks = this.state.doneListVisible ? (
			<TaskList
				tasksData={this.state.tasks}
				doneList={true}
				removeTaskFunc={this.removeTaskHandler}
				doneTaskFunc={this.doneTaskHandler}
			/>
		) : null;

		return (
			<main className="app">
				<Background />
				<TaskForm
					taskInputValue={this.state.taskInputValue}
					inputChangeFunc={this.updateInputValueHandler}
					submitFormFunc={this.addTaskHandler}
					clearTasksFunc={this.clearTasksHandler}
				/>
				<TaskList
					tasksData={this.state.tasks}
					doneList={false}
					removeTaskFunc={this.removeTaskHandler}
					doneTaskFunc={this.doneTaskHandler}
					priorityTaskFunc={this.priorityTaskHandler}
				/>
				<Btn styles="btn--finished" clickFunc={this.showDoneTasksHandler}>
					Show done tasks
				</Btn>
				{doneTasks}
			</main>
		);
	}
}

export default App;
