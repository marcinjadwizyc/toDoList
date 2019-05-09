import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

class App extends Component {
	state = {
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
			const newTasks = [ ...this.state.tasks, { taskValue: presentInput, id: presentID + 1 } ];

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
		const taskID = Number(event.target.parentElement.getAttribute("id"));
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

	clearTasksHandler = () => {
		localStorage.removeItem("tasks");

		this.setState({
			taskInputValue: "",
			tasks: []
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
				<TaskList tasksData={this.state.tasks} clickFunc={this.removeTaskHandler} />
			</main>
		);
	}
}

export default App;
