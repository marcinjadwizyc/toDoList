import React from "react";

const TaskIcons = (props) => {
	return (
		<div className="task__icons">
			<i className="task__icon fas fa-trash-alt" title="Remove task" />
			<i className="task__icon fas fa-edit" title="Edit task" />
			<i className="task__icon fas fa-star" title={props.priorityTitle} />
			<i className="task__icon fas fa-check" title="Mark task as done" />
		</div>
	);
};

export default TaskIcons;
