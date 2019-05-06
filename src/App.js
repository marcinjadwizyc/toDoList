import React, { Component } from "react";

import Background from "./Components/Background";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";

class App extends Component {
	state = {
		taskInputValue: "",
		tasks: [ "Task 1", "Task 2", "Task 3" ]
	};

	updateTaskInputValue = (event) => {
		const newTaskInputValue = event.target.value;

		this.setState({
			taskInputValue: newTaskInputValue
		});
	};

	render() {
		return (
			<main className="app">
				<Background />
				<TaskForm taskInputValue={this.state.taskInputValue} changeFunc={this.updateTaskInputValue} />
				<TaskList tasks={this.state.tasks} />
			</main>
		);
	}
}

export default App;
