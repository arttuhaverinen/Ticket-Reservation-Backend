import React from "react";
import { Toast, Button, Col, Row, Alert } from "react-bootstrap";
import "../App.css";
interface alertInterface {
	message: string;
	theme: string;
	showToast: boolean;
	setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
	setTheme: React.Dispatch<React.SetStateAction<string>>;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AlertMessage = ({
	message,
	theme,
	showToast,
	setShowToast,
	setTheme,
	setMessage,
}: alertInterface) => {
	const hideToastMessage = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setShowToast(false);
		setTheme("");
		setMessage("");
	};

	return (
		<Alert
			data-testid="AlertMessage-div"
			className="d-flex fade show"
			variant={theme}
		>
			{message}
			<Button
				onClick={(e) => setShowToast(false)}
				className="ms-auto btn btn-danger btn-close"
			></Button>
		</Alert>
	);
};

export default AlertMessage;
