import React from "react";

import Btn from "./Btn";
import TaskList from "./TaskList";

const Tasks = (props) => {
	let doneList;

	if (props.doneListVisible) {
		doneList = (
			<TaskList
				tasksData={props.tasksData}
				doneList={true}
				removeTaskFunc={props.removeTaskFunc}
				doneTaskFunc={props.doneTaskFunc}
			/>
		);
	} else {
		doneList = null;
	}

	return (
		<section>
			<TaskList
				tasksData={props.tasksData}
				doneList={false}
				removeTaskFunc={props.removeTaskFunc}
				doneTaskFunc={props.doneTaskFunc}
			/>
			<div className="doneTasks">
				<Btn styles="btn--finished" clickFunc={props.showDoneTasksFunc}>
					Show done tasks
				</Btn>
				{doneList}
			</div>
		</section>
	);
};

export default Tasks;
