import React from "react";

const Task = (props) => {
	let styles = [ "task", props.styles ];

	let priorityTitle = "Add priority";

	if (props.taskObj.priority) {
		styles.push("task--priority");
		priorityTitle = "Remove priority";
	}

	if (props.taskObj.open) {
		styles.push("task--open");
	}

	styles = styles.join(" ");

	return (
		<li className={styles} id={props.taskObj.id}>
			<div className="task__main">
				{props.children}
				<div className="task__icons">
					<i className="task__icon fas fa-trash-alt" onClick={props.removeTaskFunc} title="Remove task" />
					<i className="task__icon fas fa-edit" onClick={props.openTaskFunc} title="Edit task" />
					<i className="task__icon fas fa-star" onClick={props.priorityTaskFunc} title={priorityTitle} />
					<i className="task__icon fas fa-check" onClick={props.doneTaskFunc} title="Mark task as done" />
				</div>
			</div>
			{props.taskObj.open ? (
				<div className="task__extention">
					<input
						className="task__title-input"
						type="text"
						value={props.taskObj.title}
						onChange={props.changeTaskTitleFunc}
					/>
					<textarea
						className="task__description-input"
						placeholder="Describe your task here..."
						value={props.taskObj.description}
						onChange={props.changeTaskDescriptionFunc}
					/>
				</div>
			) : null}
		</li>
	);
};

export default Task;
