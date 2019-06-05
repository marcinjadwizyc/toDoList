import React from "react";

const taskContext = React.createContext({
	changeTaskStatus: () => {}
});

export default taskContext;
