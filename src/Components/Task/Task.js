import React from "react";

import TaskIcons from "./TaskIcons";
import TaskInputs from "./TaskInputs";

const Task = (props) => {
	return (
		<li className="task" id={props.taskObj.id}>
			<div className="task__main">
				{props.children}
				<TaskIcons />
			</div>
			{props.taskObj.open ? <TaskInputs /> : null}
		</li>
	);
};

export default Task;
