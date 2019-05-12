import React from "react";

const Btn = (props) => {
	const styles = [ "btn", props.styles ].join(" ");

	return (
		<button className={styles} onClick={props.clickFunc}>
			{props.children}
		</button>
	);
};

export default Btn;
