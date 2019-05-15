import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Btn from "./Components/Btn";

class App extends Component {
	state = {
		doneListSwitch: false,
		taskInputValue: "",
		lastID: 10000,
		tasksData: []
	};

	// LS methods
	storageGetData = () => {
		return {
			lastID: JSON.parse(localStorage.getItem("lastID")),
			tasksData: JSON.parse(localStorage.getItem("tasksData"))
		};
	};

	storageSetData = (tasksArr) => {
		localStorage.setItem("tasksData", JSON.stringify(tasksArr));
		localStorage.setItem("lastID", this.state.lastID + 1);
	};

	// Get data on component mount
	componentDidMount() {
		const storageData = this.storageGetData();

		if ((storageData.tasksData !== null) & (storageData.lastID !== null)) {
			this.setState({
				lastID: storageData.lastID,
				tasksData: storageData.tasksData
			});
		}
	}

	// Utils methods
	getTaskVariables = (event) => {
		const taskVariables = {
			taskDOM: event.target.parentElement.parentElement,
			taskID: Number(event.target.parentElement.parentElement.getAttribute("id")),
			tasksData: [ ...this.state.tasksData ]
		};

		const taskIndex = taskVariables.tasksData.findIndex((task) => {
			return task.id === taskVariables.taskID;
		});

		taskVariables.taskIndex = taskIndex;

		return taskVariables;
	};

	// Components methods
	changeInputValueHandler = (event) => {
		this.setState({
			taskInputValue: event.target.value
		});
	};

	addTaskHandler = (event) => {
		event.preventDefault();

		const currentInput = this.state.taskInputValue;
		const currentID = this.state.lastID;

		if (currentInput.length > 0) {
			const newTasksData = [
				...this.state.tasksData,
				{
					title: currentInput,
					description: "",
					id: currentID + 1,
					done: false,
					priority: false
				}
			];

			this.storageSetData(newTasksData);

			this.setState({
				taskInputValue: "",
				lastID: currentID + 1,
				tasksData: newTasksData
			});
		}
	};

	removeTaskHandler = (event) => {
		const taskVariables = this.getTaskVariables(event);

		taskVariables.tasksData.splice(taskVariables.taskIndex, 1);

		this.storageSetData(taskVariables.tasksData);

		this.setState({
			tasksData: taskVariables.tasksData
		});
	};

	doneTaskHandler = (event) => {
		const taskVariables = this.getTaskVariables(event);

		taskVariables.tasksData[taskVariables.taskIndex].done = true;

		this.storageSetData(taskVariables.tasksData);

		this.setState({
			tasksData: taskVariables.tasksData
		});
	};

	clearTasksHandler = () => {
		localStorage.removeItem("tasksData");

		this.setState({
			tasksData: []
		});
	};

	showDoneListHandler = () => {
		const doneListStatus = this.state.doneListSwitch;

		this.setState({
			doneListSwitch: !doneListStatus
		});
	};

	priorityTaskHandler = (event) => {
		const taskVariables = this.getTaskVariables(event);

		const taskWithEvent = taskVariables.tasksData.splice(taskVariables.taskIndex, 1);

		let newTasksData = [ ...taskWithEvent, ...taskVariables.tasksData ];

		if (taskVariables.taskDOM.classList.contains("task--priority")) {
			taskWithEvent[0].priority = false;

			const prioritiesArr = newTasksData.filter((task) => {
				return task.priority === true;
			});

			const pendingArr = newTasksData.filter((task) => {
				return task.priority === false;
			});

			newTasksData = [ ...prioritiesArr, ...pendingArr ];
		} else {
			taskWithEvent[0].priority = true;
		}

		this.storageSetData(newTasksData);

		this.setState({
			tasksData: newTasksData
		});
	};

	render() {
		let doneList;

		doneList = this.state.doneListSwitch ? (
			<TaskList
				tasksData={this.state.tasksData}
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
					inputChangeFunc={this.changeInputValueHandler}
					submitFormFunc={this.addTaskHandler}
					clearTasksFunc={this.clearTasksHandler}
				/>
				<TaskList
					tasksData={this.state.tasksData}
					doneList={false}
					removeTaskFunc={this.removeTaskHandler}
					doneTaskFunc={this.doneTaskHandler}
					priorityTaskFunc={this.priorityTaskHandler}
				/>
				<Btn styles="btn--finished" clickFunc={this.showDoneListHandler}>
					Show done tasks
				</Btn>
				{doneList}
			</main>
		);
	}
}

export default App;
