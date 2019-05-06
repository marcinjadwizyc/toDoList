import React from "react";

import Task from "./Task";

const TaskList = (props) => {
	const tasks = props.tasks.map((task) => {
		return <Task>{task}</Task>;
	});

	return <ul className="task-list">{tasks}</ul>;
};

export default TaskList;
