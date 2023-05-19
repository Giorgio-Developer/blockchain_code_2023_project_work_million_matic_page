import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CSSProperties, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MillionMaticPageSymbol from "../images/MillionMaticPageSymbol.png";
import MillionMaticPageSymbolSold from "../images/MillionMaticPageSymbolSold.png";

export function InfoModal(props: any) {

	const imageStyle = {
		width: '100%',
		padding: '20px',
		margin: '0px',
		border: '1px solid black',
	};
	
	const descriptionStyle: CSSProperties = {
		textAlign: 'right',
		fontSize: '0.75em',
	};

	const handleClose = () => {props.clickCloseButton()};

	return (
		<div>
			<div
				className="modal show"
				style={{ display: "block", position: "initial" }}
			>
				<Modal show={props.show} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>NFT: #{props.tokenId}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<a href={props.weburl ? props.weburl : process.env.REACT_APP_MMP_BASE_URL} target="_blank" rel="noreferrer">
							<img src={props.imgsrc ? props.imgsrc : MillionMaticPageSymbolSold} alt={props.alttext} width="100%" style={imageStyle} />
						</a>
						<div style={descriptionStyle}>
							{props.alttext}
						</div>
						<a href={props.weburl ? props.weburl : process.env.REACT_APP_MMP_BASE_URL} target="_blank" rel="noreferrer">{props.weburl ? props.weburl : process.env.REACT_APP_MMP_BASE_URL}</a>

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}
