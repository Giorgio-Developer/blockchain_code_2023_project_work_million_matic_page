import { MintButton } from "../button/mint-button";
import { ConnectWallet } from "../button/connect-wallet-button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSProperties } from 'react';
import MillionMaticPageSymbol from "../images/MillionMaticPageSymbol.png";
import { useAccount, useConnect } from "wagmi";


export function MintModal(props: any) {

const { address } = useAccount();

const handleClose = () => {props.clickCloseButton()} ; 

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

return (
      
    <div>
       <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>NFT: #{props.tokenId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<img src={MillionMaticPageSymbol} alt="NFT #{props.tokenId}" width="100%" style={imageStyle} />
				<div style={descriptionStyle}>
					available for 1 MATIC
				</div>
				{ (address !== undefined) ? <MintButton tokenId={props.tokenId} handleClose={handleClose} setLoadingSpinner={props.setLoadingSpinner} /> : <ConnectWallet /> }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
)

}