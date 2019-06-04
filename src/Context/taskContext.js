import React from "react";

const taskContext = React.createContext({
	updateTask: () => {}
});

export default taskContext;
