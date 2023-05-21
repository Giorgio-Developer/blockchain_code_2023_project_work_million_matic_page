import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
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
	imgURL: string;
	altText: string;
	webURL: string;
	tokenId: number;
}

const imageStyle = {
	width: '100%',
	padding: '20px',
	margin: '0px',
	border: '1px solid black',
};

const [imgURL, setImgURL] = useState('');
const [altText, setAltText] = useState('');
const [webURL, setWebURL] = useState('');
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

const handleTransactionStart = () => {
		txExecuting = true;
		console.log('Salvataggio dati su Blockchain in corso...');

	}

	useEffect(() => {
		if (isLoading) {
			handleTransactionStart();
		}
	}, [handleTransactionStart, isLoading]);

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

	const handleTransactionSuccess = () => {
		txExecuting = false;
		console.log('Dati salvati correttamente su Blockchain');
	}

	useEffect(() => {
		if (isSuccess && data) {
			//console.log("Transaction success", data);
			handleTransactionSuccess();
		}
	}, [handleTransactionSuccess, isSuccess]);


	const sendDataToIPFS = async () => {

		const dataToSend:TypeDataToSend = {
		imgURL: imgURL,
		altText: altText,
		webURL: webURL,
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

		const res = await axios(configIPFS)
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
			<Modal.Title>Edit Modal</Modal.Title>
			</Modal.Header>

			<Modal.Body>
			<Form>
				<Form.Group className="mb-3" controlId="imageUrlForm">
				<img src={props.imgSrcInfo ? props.imgSrcInfo : MillionMaticPageSymbolSold} alt={props.altTextInfo} width="100%" style={imageStyle} />
				<Form.Label>Image Url</Form.Label> 
				<Form.Control type="text" placeholder={props.imgSrcInfo ? "Old: " + props.imgSrcInfo : "Insert your NFT image url"} name='imageUrlControl' onChange={handleChange}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="altTextForm">
				<Form.Label>Alt Text</Form.Label>
				<Form.Control type="text" placeholder={props.altTextInfo ? "Old: " + props.altTextInfo : "Insert your NFT alt text"} name='altTextControl' onChange={handleChange}/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="webURLForm">
				<Form.Label>Web Url</Form.Label>
				<Form.Control type="text" placeholder={props.webUrlInfo ? "Old: " + props.webUrlInfo : "Insert your NFT web url"} name='webURLControl' onChange={handleChange}/>
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
			</Modal.Footer>
		</Modal>
		</div>
	);
}