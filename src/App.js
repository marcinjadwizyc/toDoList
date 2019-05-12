import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import Tasks from "./Components/Tasks";

class App extends Component {
	state = {
		doneVisible: false,
		taskInputValue: "",
		lastID: 10000,
		tasks: []
	};

	componentDidMount() {
		const localStorageData = {
			lastID: JSON.parse(localStorage.getItem("lastID")),
			tasks: JSON.parse(localStorage.getItem("tasks"))
		};

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
			const newTasks = [ ...this.state.tasks, { taskValue: presentInput, id: presentID + 1, done: false } ];

			localStorage.setItem("tasks", JSON.stringify(newTasks));
			localStorage.setItem("lastID", this.state.lastID + 1);

			this.setState({
				taskInputValue: "",
				lastID: presentID + 1,
				tasks: newTasks
			});
		}
	};

	removeTaskHandler = (event) => {
		const taskID = Number(event.target.parentElement.parentElement.getAttribute("id"));
		const tasks = [ ...this.state.tasks ];

		const taskIndex = tasks.findIndex((task) => {
			return task.id === taskID;
		});

		tasks.splice(taskIndex, 1);

		localStorage.setItem("tasks", JSON.stringify(tasks));

		this.setState({
			tasks: tasks
		});
	};

	doneTaskHandler = (event) => {
		const taskID = Number(event.target.parentElement.parentElement.getAttribute("id"));
		const tasks = [ ...this.state.tasks ];

		const taskIndex = tasks.findIndex((task) => {
			return task.id === taskID;
		});

		tasks[taskIndex].done = true;

		localStorage.setItem("tasks", JSON.stringify(tasks));

		this.setState({
			tasks: tasks
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
		const doneTasksStatus = this.state.doneVisible;

		this.setState({
			doneVisible: !doneTasksStatus
		});
	};

	render() {
		return (
			<main className="app">
				<Background />
				<TaskForm
					taskInputValue={this.state.taskInputValue}
					changeFunc={this.updateInputValueHandler}
					submitFunc={this.addTaskHandler}
					clearFunc={this.clearTasksHandler}
				/>
				<Tasks
					tasksData={this.state.tasks}
					btnClickFunc={this.showDoneTasksHandler}
					removeFunc={this.removeTaskHandler}
					doneFunc={this.doneTaskHandler}
					doneVisible={this.state.doneVisible}
				/>
			</main>
		);
	}
}

export default App;
