import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Btn from "./Components/Btn";

import TaskContext from "./Context/taskContext";

class App extends Component {
	state = {
		isDoneListVisible: false,
		taskInputValue: "",
		lastID: 10000,
		tasksData: []
	};

	componentDidMount() {
		let lsData = this.lsGetData();

		if (lsData.data !== null && lsData.lastID !== null) {
			let { data, id } = lsData;

			data.map((task) => {
				task.open = false;
			});

			this.setState({
				tasksData: data,
				lastID: id
			});
		}
	}

	// LocalStorage Functions
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

	// TaskForm Methods
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

			const newTasks = [ ...tasksData, newTask ];

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

	// Show Done List
	showDoneListHandler = () => {
		const presentStatus = this.state.isDoneListVisible;

		this.setState({
			isDoneListVisible: !presentStatus
		});
	};

	// Change Task Status Methods
	getTaskHandler = (event) => {
		const taskID = Number(event.target.closest(".task").getAttribute("id"));

		const tasksData = [ ...this.state.tasksData ];

		const taskArrayIndex = tasksData.findIndex((task) => {
			return task.id === taskID;
		});

		return {
			newTasksData: tasksData,
			taskArrayIndex: taskArrayIndex
		};
	};

	markDoneTaskHandler = (data) => {
		const { newTasksData, taskArrayIndex } = data;

		newTasksData[taskArrayIndex].done = true;

		return newTasksData;
	};

	removeTaskHandler = (data) => {
		const { newTasksData, taskArrayIndex } = data;

		newTasksData.splice(taskArrayIndex, 1);

		return newTasksData;
	};

	openTaskHandler = (data) => {
		const { newTasksData, taskArrayIndex } = data;

		const openValue = newTasksData[taskArrayIndex].open;

		newTasksData[taskArrayIndex].open = !openValue;

		return newTasksData;
	};

	prioritiseTaskHandler = (data) => {
		let { newTasksData, taskArrayIndex } = data;

		const eventTask = newTasksData.splice(taskArrayIndex, 1)[0];

		newTasksData = [ eventTask, ...newTasksData ];

		if (eventTask.priority) {
			eventTask.priority = false;

			const prioritiesArr = newTasksData.filter((task) => {
				return task.priority === true;
			});

			const normalArr = newTasksData.filter((task) => {
				return task.priority === false;
			});

			newTasksData = [ ...prioritiesArr, ...normalArr ];
		} else {
			eventTask.priority = true;
		}

		return newTasksData;
	};

	changeTaskStatusHandler = (event, action) => {
		let newTasksData;

		const data = this.getTaskHandler(event);

		if (action === "done") {
			newTasksData = this.markDoneTaskHandler(data);
		} else if (action === "delete") {
			newTasksData = this.removeTaskHandler(data);
		} else if (action === "open") {
			newTasksData = this.openTaskHandler(data);
		} else if (action === "priority") {
			newTasksData = this.prioritiseTaskHandler(data);
		}

		this.lsSetData(newTasksData, this.state.lastID);

		this.setState({
			tasksData: newTasksData
		});
	};

	// Update Task Methods
	updateTaskHandler = (event, action) => {
		let { newTasksData, taskArrayIndex } = this.getTaskHandler(event);

		if (action === "description") {
			newTasksData[taskArrayIndex].description = event.target.value;
		} else if (action === "title") {
			newTasksData[taskArrayIndex].title = event.target.value;
		}

		this.lsSetData(newTasksData, this.state.lastID);

		this.setState({
			tasksData: newTasksData
		});
	};

	render() {
		const doneList = this.state.isDoneListVisible ? <TaskList data={this.state.tasksData} isDone={true} /> : null;

		return (
			<main className="app">
				<Background />
				<TaskForm
					inputValue={this.state.taskInputValue}
					changeInputValue={this.changeInputValueHandler}
					clearTasks={this.clearTasksDataHandler}
					addTask={this.addTaskHandler}
				/>
				<TaskContext.Provider
					value={{
						changeTaskStatus: this.changeTaskStatusHandler,
						updateTask: this.updateTaskHandler
					}}
				>
					<TaskList data={this.state.tasksData} isDone={false} />
					<Btn styles="btn--done" click={this.showDoneListHandler}>
						Show done tasks
					</Btn>
					{doneList}
				</TaskContext.Provider>
			</main>
		);
	}
}

export default App;
