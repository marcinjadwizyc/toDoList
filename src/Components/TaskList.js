import React from "react";

import Task from "./Task";

const TaskList = (props) => {
	const styles = props.doneList ? "task--done" : "";

	const data = props.tasksData.filter((task) => {
		return task.done === props.doneList;
	});

	const tasks = data.map((task) => {
		return (
			<Task
				styles={styles}
				key={task.id}
				taskID={task.id}
				removeTaskFunc={props.removeTaskFunc}
				doneTaskFunc={props.doneTaskFunc}
			>
				{task.taskValue}
			</Task>
		);
	});

	return <ul className="taskList">{tasks}</ul>;
};

export default TaskList;
