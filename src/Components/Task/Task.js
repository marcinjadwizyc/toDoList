import React from "react";
import PropTypes from "prop-types";

import TaskIcons from "./TaskIcons";
import TaskInputs from "./TaskInputs";

const Task = (props) => {
	let styles = [ "task" ];
	let priorityTitle = "Add priority";

	if (props.data.priority) {
		styles.push("task--priority");
		priorityTitle = "Remove priority";
	} else if (props.data.open) {
		styles.push("task--open");
	}

	const inputs = props.data.open ? <TaskInputs data={props.data} /> : null;

	return (
		<li className={styles.join(" ")} id={props.data.id}>
			<div className="task__main">
				{props.children}
				<TaskIcons priorityTitle={priorityTitle} />
			</div>
			{inputs}
		</li>
	);
};

Task.propTypes = {
	data: PropTypes.object.isRequired
};

export default Task;
