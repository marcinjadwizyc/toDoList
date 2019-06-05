import React from "react";

const taskContext = React.createContext({
	changeTaskStatus: () => {},
	updateTask: () => {}
});

export default taskContext;
