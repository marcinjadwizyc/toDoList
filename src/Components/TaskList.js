import React from "react";

import Task from "./Task";

const TaskList = (props) => {
	let tasks;

	if (props.doneList === false) {
		tasks = props.tasksData.map((task) => {
			if (task.done === false) {
				return (
					<Task key={task.id} taskID={task.id} removeFunc={props.removeFunc} doneFunc={props.doneFunc}>
						{task.taskValue}
					</Task>
				);
			}
		});
	} else if (props.doneList) {
		tasks = props.tasksData.map((task) => {
			if (task.done) {
				return (
					<Task
						styles="task--done"
						key={task.id}
						taskID={task.id}
						removeFunc={props.removeFunc}
						doneFunc={props.doneFunc}
					>
						{task.taskValue}
					</Task>
				);
			}
		});
	}

	return <ul className="taskList">{tasks}</ul>;
};

export default TaskList;
