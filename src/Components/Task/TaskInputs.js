import React from "react";

const TaskInputs = () => {
	return (
		<div className="task__extention">
			<input className="task__title-input" type="text" />
			<textarea className="task__description-input" placeholder="Describe your task here..." />
		</div>
	);
};

export default TaskInputs;
