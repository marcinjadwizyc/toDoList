import React from "react";

import Task from "./Task";

const TaskList = (props) => {
	const tasks = props.tasksData.map((task) => {
		return (
			<Task key={task.id} taskID={task.id} removeFunc={props.clickFunc}>
				{task.taskValue}
			</Task>
		);
	});

	return <ul className="task-list">{tasks}</ul>;
};

export default TaskList;
