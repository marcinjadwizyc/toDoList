import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

class App extends Component {
	state = {
		isDoneListVisible: false,
		taskInputValue: "",
		lastID: 10000,
		tasksData: []
	};

	componentDidMount() {
		const lsData = this.lsGetData();

		if (lsData.data !== null && lsData.lastID !== null) {
			this.setState({
				tasksData: lsData.data,
				lastID: lsData.id
			});
		}
	}

	//LS functions
	lsGetData = () => {
		return {
			data: JSON.parse(localStorage.getItem("tasksData")),
			id: JSON.parse(localStorage.getItem("lastID"))
		};
	};

	lsSetData = (data, id) => {
		localStorage.setItem("tasksData", JSON.stringify(data));
		localStorage.setItem("lastID", JSON.stringify(id));
	};

	lsClearData = () => {
		localStorage.removeItem("tasksData");
		localStorage.removeItem("lastID");
	};

	// TaskForm methods
	changeInputValueHandler = (event) => {
		const newInput = event.target.value;

		this.setState({
			taskInputValue: newInput
		});
	};

	clearTasksDataHandler = (event) => {
		event.preventDefault();

		this.lsClearData();

		this.setState({
			tasksData: []
		});
	};

	addTaskHandler = (event) => {
		event.preventDefault();

		const { lastID, tasksData, taskInputValue } = this.state;

		const newID = lastID + 1;

		if (taskInputValue !== "") {
			const newTask = {
				title: taskInputValue,
				id: newID,
				description: "",
				priority: false,
				done: false,
				open: false
			};

			const newTasks = [ newTask, ...tasksData ];

			this.lsSetData(newTasks, newID);

			this.setState({
				tasksData: newTasks,
				lastID: newID,
				taskInputValue: ""
			});
		} else {
			alert("Please add a task below...");
		}
	};

	render() {
		return (
			<main className="app">
				<Background />
				<TaskForm
					inputValue={this.state.taskInputValue}
					changeInputValue={this.changeInputValueHandler}
					clearTasks={this.clearTasksDataHandler}
					addTask={this.addTaskHandler}
				/>
				<TaskList data={this.state.tasksData} isDone={false} />
				<TaskList data={this.state.tasksData} isDone={true} />
			</main>
		);
	}
}

export default App;
