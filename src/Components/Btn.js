import React from "react";
import PropTypes from "prop-types";

const Btn = (props) => {
	const styles = [ "btn", props.styles ].join(" ");

	return (
		<button className={styles} onClick={props.click}>
			{props.children}
		</button>
	);
};

Btn.propTypes = {
	click: PropTypes.func.isRequired,
	styles: PropTypes.string
};

export default Btn;
