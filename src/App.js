import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

class App extends Component {
	state = {
		taskInputValue: "",
		lastID: JSON.parse(localStorage.getItem("lastID")) || 10000,
		tasks: []
	};

	componentDidMount() {
		let lsTasks;

		if (JSON.parse(localStorage.getItem("tasks")) !== null) {
			lsTasks = JSON.parse(localStorage.getItem("tasks"));
		} else {
			lsTasks = [];
		}

		this.setState({
			tasks: lsTasks
		});
	}

	updateInputValueHandler = (event) => {
		const newTaskInputValue = event.target.value;

		this.setState({
			taskInputValue: newTaskInputValue
		});
	};

	addTaskHandler = (event) => {
		event.preventDefault();

		const presentInput = this.state.taskInputValue;

		if (presentInput.length > 0) {
			const newTasks = [ ...this.state.tasks, { taskValue: presentInput, id: this.state.lastID + 1 } ];

			localStorage.setItem("tasks", JSON.stringify(newTasks));
			localStorage.setItem("lastID", this.state.lastID + 1);

			this.setState({
				taskInputValue: "",
				lastID: this.state.lastID + 1,
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
				<TaskList tasks={this.state.tasks} clickFunc={this.removeTaskHandler} />
			</main>
		);
	}
}

export default App;
