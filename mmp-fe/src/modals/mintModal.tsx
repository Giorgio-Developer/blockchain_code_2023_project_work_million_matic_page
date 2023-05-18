import { MintButton } from "../button/mint-button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSSProperties } from 'react';
import MillionMaticPageSymbol from "../images/MillionMaticPageSymbol.png";


export function MintModal(props: any) {
    
const handleClose = () => {props.clickCloseButton()} ; 

const imageStyle = {
    width: '100%',
    padding: '20px',
    margin: '0px',
    border: '1px solid black',
  };

  const descriptionStyle: CSSProperties = {
	textAlign: 'right',
  };

return (
      
    <div>
       <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Mint Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
				<img src={MillionMaticPageSymbol} alt="NFT #{props.tokenId}" width="100%" style={imageStyle} />
				<div style={descriptionStyle}>
					NFT: #{props.tokenId}
				</div>
                <MintButton />
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