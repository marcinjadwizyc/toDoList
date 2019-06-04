import React, { useContext } from "react";

import TaskContext from "../../Context/taskContext";

const TaskIcons = (props) => {
	const context = useContext(TaskContext);

	return (
		<div className="task__icons">
			<i
				className="task__icon fas fa-trash-alt"
				title="Remove task"
				onClick={(event) => context.changeTaskStatus(event, "delete")}
			/>
			<i className="task__icon fas fa-edit" title="Edit task" />
			<i className="task__icon fas fa-star" title={props.priorityTitle} />
			<i
				className="task__icon fas fa-check"
				title="Mark task as done"
				onClick={(event) => context.changeTaskStatus(event, "done")}
			/>
		</div>
	);
};

export default TaskIcons;
