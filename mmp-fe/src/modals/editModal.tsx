import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { contractAbi } from "../constant/contract-abi";

var axios = require('axios');

const contractAddress = "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c";
//const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS ? process.env.REACT_APP_CONTRACT_ADDRESS: undefined;
// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

const PINATA_APIKEY = process.env.REACT_APP_PINATA_APIKEY;
const PINATA_SECRET = process.env.REACT_APP_PINATA_SECRET;
const abi = contractAbi;

export function EditModal(props: any) {

  interface TypeDataToSend {
    imgURL: string;
    altText: string;
    webURL: string;
    tokenId: number;
  }

  const [show, setShow] = useState(false);
  const [imgURL, setImgURL] = useState('');
  const [altText, setAltText] = useState('');
  const [webURL, setWebURL] = useState('');
  const [tokenId, setTokenId] = useState("");
  const [contentIdentificator, setContentIdentificator] = useState('');

  let ipfsHash:string;

  const handleClose = () => setShow(false);

   const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "setTokenURI",
    args: [tokenId,contentIdentificator]
   }); 
  
  
  	useEffect(() => {
      if (props.show === true) {
        setTokenId(props.tokenId);
        console.log(props.tokenId);
      } 
    }, [props.show]);
  
  const { data, write } = useContractWrite(config);
  
    const sendDataToIPFS = async () => {

      const dataToSend:TypeDataToSend = {
        imgURL: imgURL,
        altText: altText,
        webURL: webURL,
        tokenId: props.tokenId,
      }

      console.log("I dati inviati ad IPFS sono " + JSON.stringify({dataToSend}));

      var dataIPFS = JSON.stringify({
        pinataOptions: {
          cidVersion: 1,
        },
        pinataMetadata: {
          name: "NFTData",
          keyvalues: {
            customKey: "customValue",
            customKey2: "customValue2",
          },
        },
        pinataContent: dataToSend,
      });

      var configIPFS = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        headers: {
          pinata_api_key: PINATA_APIKEY,
          pinata_secret_api_key: PINATA_SECRET,
          "Content-Type": "application/json",
        },
        data: dataIPFS,
      };

      const res = await axios(configIPFS);
      console.log(res.data.IpfsHash); 

      ipfsHash = res.data.IpfsHash;

      setContentIdentificator(ipfsHash);    

    };

    const writeToBlockchain = async () => {

      console.log(contentIdentificator);

      if (!write) return;
      console.log(config)
      write(); 

    };

  function handleChange(event:any) {
    let targetId = event.currentTarget.id;
    
    switch(targetId) {
      case 'imageUrlForm':
        setImgURL(event.target.value);
      break;
      case 'altTextForm':
        setAltText(event.target.value);
      break;
      case 'webURLForm':
        setWebURL(event.target.value);
      break;
    }

  }

    return (
      
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >


      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="imageUrlForm">
              <Form.Label>Image Url</Form.Label> 
              <Form.Control type="text" placeholder="image.png" name='imageUrlControl' onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="altTextForm">
              <Form.Label>Alt Text</Form.Label>
              <Form.Control type="text" placeholder="....."  name='altTextControl' onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="webURLForm">
              <Form.Label>Web Url</Form.Label>
              <Form.Control type="text" placeholder="www.google.com" name='webURLControl' onChange={handleChange}/>
            </Form.Group>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendDataToIPFS}>
            Save Changes
          </Button>
          <Button variant="primary" onClick={writeToBlockchain}>
            Send to Blockchain
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
