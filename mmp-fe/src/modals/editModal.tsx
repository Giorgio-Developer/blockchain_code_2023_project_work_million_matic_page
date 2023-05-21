import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CSSProperties, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { contractAbi } from "../constant/contract-abi";
import MillionMaticPageSymbolSold from "../images/MillionMaticPageSymbolSold.png";

var axios = require('axios');

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

const PINATA_APIKEY = process.env.REACT_APP_PINATA_APIKEY;
const PINATA_SECRET = process.env.REACT_APP_PINATA_SECRET;
const abi = contractAbi;

export function EditModal(props: any) {

interface TypeDataToSend {
	name:string;
	image: string;
	description: string;
	external_url: string;
	tokenId: number;
}

const imageStyle = {
	width: '100%',
	padding: '20px',
	margin: '0px',
	border: '1px solid black',
};

  const ownerAddressStyle: CSSProperties = {
		textAlign: 'left',
		fontSize: '1.05em',
		marginLeft: '3%',
	};

const [name, setName] = useState('');
const [nftImage, setNftImage] = useState('');
const [description, setDescription] = useState('');
const [externalURL, setExternalURL] = useState('');
const [tokenId, setTokenId] = useState("");
const [contentIdentificator, setContentIdentificator] = useState('');
const handleClose = () => {props.clickCloseButton()} ; // () => setShow(false);


let txExecuting = false;

const { config } = usePrepareContractWrite({
	address: contractAddress,
	abi: abi,
	functionName: "setTokenURI",
	args: [tokenId, contentIdentificator]
});

const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

	useEffect(() => {
		if (props.show === true) {
		setTokenId(props.tokenId);
		console.log(props.tokenId);
		}
	}, [props.show]);

	useEffect(() => {
		if (contentIdentificator !== undefined && contentIdentificator !== '' && !txExecuting) {
		//writeToBlockchain();
		console.log('writing on Blockchain');
		if (!write) return;
		console.log(config)
		write(); // write to blockchain

		}
	}, [contentIdentificator]);

	const sendDataToIPFS = () => {

  //const { data, isLoading, isSuccess, isError,  write } = useContractWrite(config);

		const dataToSend:TypeDataToSend = {
			name: name,
			image: nftImage,
			description: description,
			external_url: externalURL,
			tokenId: props.tokenId,
		}

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

		const res = axios(configIPFS)
			.then(function (response: any) {
				// console.log('ipfsHash: ', response.data.IpfsHash);
				setContentIdentificator(response.data.IpfsHash);
				console.log('contentIdentificator: ', contentIdentificator);
			})
			.catch(function (error: any) {
				// handle error
				console.log(error);
			});
	};



  function handleChange(event:any) {
	let targetId = event.currentTarget.id;

	  switch(targetId) {
		  case 'nameForm':
			  setName(event.target.value);
			  break;
		  case 'nftImageForm':
			  setNftImage(event.target.value);
			  break;
		  case 'descriptionForm':
			  setDescription(event.target.value);
			  break;
		  case 'externalURLForm':
			  setExternalURL(event.target.value);
			  break;
	  }

  }

  const [loading, setLoading] = useState(false);
  
  const polygon_base_uri = "https://mumbai.polygonscan.com/tx/";

  const handleTransactionStart = () => {
    txExecuting = true;
		console.log('Salvataggio dati su Blockchain in corso...');
    setLoading(true);
    props.setLoadingSpinner(true);
  }
  const handleTransactionSuccess = () => {
      txExecuting = false;
      console.log('Dati salvati correttamente su Blockchain');  
      setLoading(false);
      props.setLoadingSpinner(false);
      handleClose();
  }
  const handleTransactionError = () => {
      setLoading(false); 			// Imposta lo stato di loading a false una volta completata o fallita la transazione
      props.setLoadingSpinner(false);
  }

  useEffect(() => {
		if (isLoading) {
			handleTransactionStart();
		}
	}, [handleTransactionStart, isLoading]);

  useEffect(() => {
		if (isSuccess && data ) {
			handleTransactionSuccess();
		}
	}, [handleTransactionSuccess, isSuccess]);

	useEffect(() => {
		if (isError) {
			handleTransactionError();
		}
	}, [handleTransactionError, isError]);

  return (
		<div
		className="modal show"
		style={{ display: 'block', position: 'initial' }}
		>

		<Modal show={props.show} onHide={handleClose}>
			<Modal.Header closeButton>
			<Modal.Title>Edit Modal - NFT: #{props.tokenId}</Modal.Title>
			</Modal.Header>

      <h2 style={ownerAddressStyle}>{props.nftOwnerAddress ? "Owner are you! Your Address : " : ""}</h2>
			<h2 style={ownerAddressStyle}>{props.nftOwnerAddress ? props.nftOwnerAddress : ""}</h2>

			<Modal.Body>
			<Form>
				<img src={props.nftImageInfo ? props.nftImageInfo : MillionMaticPageSymbolSold} alt={props.descriptionInfo} width="100%" style={imageStyle} />
				<Form.Group className="mb-3" controlId="nameForm">
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" placeholder={props.nameInfo ? "Old: " + props.nameInfo : "Insert your NFT name"} name='nameControl' onChange={handleChange}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="nftImageForm">
					<Form.Label>Image Url</Form.Label>
					<Form.Control type="text" placeholder={props.nftImageInfo ? "Old: " + props.nftImageInfo : "Insert your NFT image url"} name='imageUrlControl' onChange={handleChange}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="descriptionForm">
					<Form.Label>Description</Form.Label>
					<Form.Control type="text" placeholder={props.descriptionInfo ? "Old: " + props.descriptionInfo : "Insert your NFT description"} name='descriptionControl' onChange={handleChange}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="externalURLForm">
					<Form.Label>Web Url</Form.Label>
					<Form.Control type="text" placeholder={props.externalURLInfo ? "Old: " + props.externalURLInfo : "Insert your NFT web url"} name='externalURLControl' onChange={handleChange}/>
				</Form.Group>
			</Form>

			</Modal.Body>

			<Modal.Footer>
			<Button variant="secondary" onClick={handleClose}>
				Close
			</Button>
			<Button variant="primary" onClick={async () => {
				//console.log('Invio i dati a IPFS...'); 
				sendDataToIPFS();
			}}>
				Save Changes
			</Button>
      {isLoading && <div>Loading...</div>}
  		{isError && <div><br/><b> Oh no !!!</b><br/>Messaggio di ko !!!<br/></div>}
			</Modal.Footer>
		</Modal>
		</div>
	);
}