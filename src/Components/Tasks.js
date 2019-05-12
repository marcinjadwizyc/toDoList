import React from "react";

import Btn from "./Btn";
import TaskList from "./TaskList";

const Tasks = (props) => {
	let doneList;

	if (props.doneVisible) {
		doneList = (
			<TaskList
				tasksData={props.tasksData}
				doneList={true}
				removeFunc={props.removeFunc}
				doneFunc={props.doneFunc}
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
				removeFunc={props.removeFunc}
				doneFunc={props.doneFunc}
			/>
			<div className="doneTasks">
				<Btn styles="btn--finished" clickFunc={props.btnClickFunc}>
					Show done tasks
				</Btn>
				{doneList}
			</div>
		</section>
	);
};

export default Tasks;
