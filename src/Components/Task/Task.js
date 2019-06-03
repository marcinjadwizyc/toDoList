import React from "react";

import TaskIcons from "./TaskIcons";
import TaskInputs from "./TaskInputs";

const Task = (props) => {
	return (
		<li className="task">
			<div className="task__main">
				{props.children}
				<TaskIcons />
			</div>
		</li>
	);
};

export default Task;
