import React from "react";

import TaskIcons from "./TaskIcons";
import TaskInputs from "./TaskInputs";

const Task = (props) => {
	const inputs = props.data.open ? <TaskInputs /> : null;

	return (
		<li className="task" id={props.data.id}>
			<div className="task__main">
				{props.children}
				<TaskIcons />
			</div>
			{inputs}
		</li>
	);
};

export default Task;
