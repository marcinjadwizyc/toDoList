import React from "react";

const TaskInputs = (props) => {
	return (
		<div className="task__extention">
			<input className="task__title-input" type="text" value={props.data.title} />
			<textarea
				className="task__description-input"
				placeholder="Describe your task here..."
				value={props.data.description}
			/>
		</div>
	);
};

export default TaskInputs;
