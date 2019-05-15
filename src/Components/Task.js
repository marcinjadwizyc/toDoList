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
			<div className="task__main">
				{props.children}
				<div className="task__icons">
					<i className="task__icon fas fa-trash-alt" onClick={props.removeTaskFunc} title="Remove task" />
					<i className="task__icon fas fa-star" onClick={props.priorityTaskFunc} title={priorityTitle} />
					<i className="task__icon fas fa-check" onClick={props.doneTaskFunc} title="Mark task as done" />
				</div>
			</div>
			{false ? (
				<div className="task__extention">
					<input className="task__title-input" type="text" />
					<textarea className="task__description-input">Describe your task here...</textarea>
				</div>
			) : null}
		</li>
	);
};

export default Task;
