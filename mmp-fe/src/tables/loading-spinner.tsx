import { Spinner } from "react-bootstrap";

export function LoadingSpinner(props: { show: boolean }) {

	return (
		<div
			className="loading-spinner-overlay"
			style={{ 
				display: props.show ? "flex" : "none",
				backgroundColor: "#ffffff50"}
			}
		>
			<div className="loading-spinner-container">
				<Spinner animation="border" role="status" size="sm">
					<span className="sr-only"></span>
				</Spinner>
			</div>
		</div>
	);
}