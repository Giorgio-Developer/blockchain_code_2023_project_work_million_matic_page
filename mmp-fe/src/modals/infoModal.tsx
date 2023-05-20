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

						<a href={props.webUrlInfo ? props.webUrlInfo : process.env.REACT_APP_MMP_BASE_URL} target="_blank" rel="noreferrer">
							<img src={props.imgSrcInfo ? props.imgSrcInfo : MillionMaticPageSymbolSold} alt={props.altTextInfo} width="100%" style={imageStyle} />
						</a>
						<div style={descriptionStyle}>
							{props.altTextInfo}
						</div>
					</Modal.Body>
					<Modal.Footer>
					<a href={props.webUrlInfo ? props.webUrlInfo : process.env.REACT_APP_MMP_BASE_URL} target="_blank" rel="noreferrer"><Button>Go to website</Button></a>
						<Button variant="secondary" onClick={handleClose}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}
