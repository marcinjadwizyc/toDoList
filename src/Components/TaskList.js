import React from "react";

import Task from "./Task/Task";

const TaskList = (props) => {
	const tasks = props.data.map((task) => {
		if (task.done === props.isDone) {
			return (
				<Task data={task} key={task.id}>
					{task.title}
				</Task>
			);
		}
	});

	return <ul className="taskList">{tasks}</ul>;
};

export default TaskList;
