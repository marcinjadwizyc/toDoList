import React from "react";

const Task = (props) => {
	return (
		<li className="task" id={props.taskID}>
			{props.children} <i className="task__icon fas fa-check" onClick={props.removeFunc} />
		</li>
	);
};

export default Task;
