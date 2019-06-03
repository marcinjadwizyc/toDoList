import React from "react";

import Task from "./Task/Task";

const TaskList = (props) => {
	let styles = [ "taskList" ];

	if (props.isDone) {
		styles.push("taskList--done");
	}

	const tasks = props.data.map((task) => {
		if (task.done === props.isDone) {
			return (
				<Task data={task} key={task.id}>
					{task.title}
				</Task>
			);
		} else {
			return null;
		}
	});

	return <ul className={styles.join(" ")}>{tasks}</ul>;
};

export default TaskList;
