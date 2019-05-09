import React from "react";

const Task = (props) => {
	return (
		<li className="task-list__task" id={props.taskID}>
			{props.children} <i className="task-list__icon fas fa-check" onClick={props.removeFunc} />
		</li>
	);
};

export default Task;
