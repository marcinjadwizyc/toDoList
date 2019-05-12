import React from "react";

import Btn from "./Btn";

const TaskForm = (props) => {
	return (
		<form className="taskForm" onSubmit={props.submitFormFunc}>
			<input
				type="text"
				className="taskForm__input"
				placeholder="Add new task..."
				value={props.taskInputValue}
				onChange={props.inputChangeFunc}
			/>
			<div className="taskForm__container-btn">
				<Btn styles="btn--form">Add task</Btn>
				<Btn styles="btn--form" clickFunc={props.clearTasksFunc}>
					Clear tasks
				</Btn>
			</div>
		</form>
	);
};

export default TaskForm;
