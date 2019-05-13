import React from "react";

const Task = (props) => {
	let styles = [ "task", props.styles ];

	let priorityTitle = "Add priority";

	if (props.taskPriority) {
		styles.push("task--priority");
		priorityTitle = "Remove priority";
	}

	styles = styles.join(" ");

	return (
		<li className={styles} id={props.taskID}>
			{props.children}
			<div className="task__container-icon">
				<i className="task__icon fas fa-trash-alt" onClick={props.removeTaskFunc} title="Remove task" />
				<i className="task__icon fas fa-star" onClick={props.priorityTaskFunc} title={priorityTitle} />
				<i className="task__icon fas fa-check" onClick={props.doneTaskFunc} title="Mark task as done" />
			</div>
		</li>
	);
};

export default Task;
