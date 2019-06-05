import React from "react";
import PropTypes from "prop-types";

import Btn from "./Btn";

const TaskForm = (props) => {
	return (
		<form className="taskForm" onSubmit={props.addTask}>
			<input
				type="text"
				className="taskForm__input"
				placeholder="Add new task..."
				value={props.inputValue}
				onChange={props.changeInputValue}
			/>
			<div className="taskForm__container-btn">
				<Btn styles="btn--form" click={props.addTask}>
					Add task
				</Btn>
				<Btn styles="btn--form" click={props.clearTasks}>
					Clear tasks
				</Btn>
			</div>
		</form>
	);
};

TaskForm.propTypes = {
	inputValue: PropTypes.string.isRequired,
	changeInputValue: PropTypes.func.isRequired,
	addTask: PropTypes.func.isRequired,
	clearTasks: PropTypes.func.isRequired
};

export default TaskForm;
