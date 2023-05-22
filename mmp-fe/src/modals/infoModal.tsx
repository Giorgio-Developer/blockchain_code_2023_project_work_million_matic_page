import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CSSProperties } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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

	const ownerAddressStyle: CSSProperties = {
		textAlign: 'left',
		fontSize: '1.05em',
		marginLeft: '3%',
	};

	const handleClose = () => {props.clickCloseButton()};

	const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;
	let nftOpenSeaLink = process.env.REACT_APP_OPENSEA_BASE_URL + contractAddress + "/" + props.tokenId;

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
					<h2 style={ownerAddressStyle}>{props.nftOwnerAddress ? "Owner Address: " : ""}</h2>
					<h2 style={ownerAddressStyle}>{props.nftOwnerAddress ? props.nftOwnerAddress : ""}</h2>
					<Modal.Body>

						<a href={props.externalURLInfo ? props.externalURLInfo : process.env.REACT_APP_MMP_BASE_URL} target="_blank" rel="noreferrer">
							<img src={props.nftImageInfo ? props.nftImageInfo : MillionMaticPageSymbolSold} alt={props.descriptionInfo} width="100%" style={imageStyle} />
						</a>
						<div style={descriptionStyle}>
							{props.descriptionInfo}
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>Close</Button>
						<a href={nftOpenSeaLink} target="_blank" rel="noreferrer"><Button>Look on OpenSea</Button></a>
						<a href={props.externalURLInfo ? props.externalURLInfo : process.env.REACT_APP_MMP_BASE_URL} target="_blank" rel="noreferrer"><Button>Go to website</Button></a>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
}
