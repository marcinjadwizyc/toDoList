import React from "react";

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
				<button className="btn btn__form">Add task</button>
				<button className="btn btn__form" onClick={props.clearFunc}>
					Clear tasks
				</button>
			</div>
		</form>
	);
};

export default TaskForm;
