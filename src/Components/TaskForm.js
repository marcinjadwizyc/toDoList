import React from "react";

import Btn from "./Btn";

const TaskForm = (props) => {
	return (
		<form className="taskForm" onSubmit={props.submitFunc}>
			<input
				type="text"
				className="taskForm__input"
				placeholder="Add new task..."
				value={props.taskInputValue}
				onChange={props.changeFunc}
			/>
			<div className="taskForm__container-btn">
				<Btn styles="btn__form">Add task</Btn>
				<Btn styles="btn__form" clickFunc={props.clearFunc}>
					Clear tasks
				</Btn>
			</div>
		</form>
	);
};

export default TaskForm;
