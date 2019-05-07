import React from "react";

const TaskForm = (props) => {
	return (
		<form className="task-form" onSubmit={props.submitFunc}>
			<input
				type="text"
				className="task-form__input"
				placeholder="Add new task..."
				value={props.taskInputValue}
				onChange={props.changeFunc}
			/>
			<div className="task-form__buttons">
				<button className="task-form__btn">Add task</button>
				<button className="task-form__btn" onClick={props.clearFunc}>
					Clear tasks
				</button>
			</div>
		</form>
	);
};

export default TaskForm;
