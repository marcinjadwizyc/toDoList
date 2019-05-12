import React from "react";

const Task = (props) => {
	const styles = [ "task", props.styles ].join(" ");

	return (
		<li className={styles} id={props.taskID}>
			{props.children}
			<div className="task__container-icon">
				<i className="task__icon fas fa-trash-alt" onClick={props.removeTaskFunc} title="Remove task" />
				<i className="task__icon fas fa-check" onClick={props.doneTaskFunc} title="Mark task as done" />
			</div>
		</li>
	);
};

export default Task;
