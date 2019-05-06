import React from "react";

const Task = (props) => {
	return <li className="task-list__task">{props.children}</li>;
};

export default Task;
