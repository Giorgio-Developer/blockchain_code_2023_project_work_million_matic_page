import { MintButton } from "../button/mint-button";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export function MintModal(props: any) {
    
const handleClose = () => {props.clickCloseButton()} ; 

return (
      
    <div>
       <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Mint Modal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
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