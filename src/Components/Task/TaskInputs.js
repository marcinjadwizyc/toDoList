import React, { useContext } from "react";

import TaskContext from "../../Context/taskContext";

const TaskInputs = (props) => {
	const context = useContext(TaskContext);

	return (
		<div className="task__extention">
			<input
				className="task__title-input"
				type="text"
				value={props.data.title}
				onChange={(event) => context.updateTask(event, "title")}
			/>
			<textarea
				className="task__description-input"
				placeholder="Describe your task here..."
				value={props.data.description}
				onChange={(event) => context.updateTask(event, "description")}
			/>
		</div>
	);
};

export default TaskInputs;
