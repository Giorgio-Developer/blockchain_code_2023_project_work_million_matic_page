/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CSSProperties, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContract, useSigner, useWaitForTransaction } from 'wagmi';
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

	const [name, setName] = useState(props.nameInfo);
	const [nftImage, setNftImage] = useState(props.nftImageInfo);
	const [description, setDescription] = useState(props.descriptionInfo);
	const [externalURL, setExternalURL] = useState(props.externalURLInfo);
	const [tokenId, setTokenId] = useState(0);
	const [txHash, setTxHash] = useState('');
	const [successMessage, setSuccessMessage] = useState(false);
	const handleClose = () => {
		props.clickCloseButton();
		setSuccessMessage(false);
	} ; // () => setShow(false);

	const nftOpenSeaLink = process.env.REACT_APP_OPENSEA_BASE_URL + contractAddress + "/" + props.tokenId;

	const contract = useContract({
		abi: abi,
		address: contractAddress
	})

	const { data:signer } = useSigner();

	const {data, isError, isLoading, isSuccess } = useWaitForTransaction({
		hash: txHash as `0x${string}`,
	})

	useEffect(() => {
		if (props.show === true) {
			setTokenId(props.tokenId);
			console.log(props.tokenId);
		}
	}, [props.show]);


	const sendDataToIPFS = async () => {

		console.log('sendDataToIPFS Started...');

		const dataToSend: TypeDataToSend = {
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

		// Attivo il loading spinner
		handleTransactionStart();

		const res = await axios(configIPFS);
		let cid = res.data.IpfsHash;
		console.log(cid);

		if(res && signer){
			try {
				const tx = await contract?.connect(signer).setTokenURI(tokenId,cid);
				console.log("tx: ", tx.hash);
				setTxHash(tx.hash);
			} catch (error) {
				handleTransactionError();
			}

		}

	};


	function handleChange(event:any) {

		console.log(event.target.value);

		
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
	/*	*/

	}


	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleTransactionStart = () => {
			console.log('Salvataggio dati su IPFS e poi su Blockchain...');
			props.setLoadingSpinner(true);
			setSuccessMessage(false);
	}

	const handleTransactionSuccess = () => 
	{
		console.log('handleTransactionSuccess');
		props.setLoadingSpinner(false);
		setTxHash("");
		//handleClose();

		setSuccessMessage(true);
		updateShowedImage();
		props.imgUpdatedChanger(nftImage);

	}

	const handleTransactionError = () => {
		console.log('handleTransactionError');
		props.setLoadingSpinner(false);
	}

	useEffect(() => {
		if (isSuccess && data && txHash !== '' ) {

			handleTransactionSuccess();
		}
	}, [handleTransactionSuccess, isSuccess]);


	const updateShowedImage = () => {
		console.log('updateShowedImage');



	}
	
	return (
		<div
			className="modal show"
			style={{ display: 'block', position: 'initial' }}
		>

			<Modal show={props.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Modal - NFT: #{props.tokenId}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<img src={props.nftImageInfo ? props.nftImageInfo : MillionMaticPageSymbolSold} alt={props.descriptionInfo} width="100%" style={imageStyle} />
						<Form.Group className="mb-3" controlId="nameForm">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" placeholder={props.nameInfo ?  props.nameInfo : "Insert your NFT name"} name='nameControl' onChange={handleChange} value={name} disabled={successMessage}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="nftImageForm">
							<Form.Label>Image Url</Form.Label>
							<Form.Control type="text" placeholder={props.nftImageInfo ? props.nftImageInfo : "Insert your NFT image url"} name='imageUrlControl' onChange={handleChange} value={nftImage} disabled={successMessage}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="descriptionForm">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" placeholder={props.descriptionInfo ? props.descriptionInfo : "Insert your NFT description"} name='descriptionControl' onChange={handleChange} value={description}  disabled={successMessage}/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="externalURLForm">
							<Form.Label>Web Url</Form.Label>
							<Form.Control type="text" placeholder={props.externalURLInfo ? props.externalURLInfo : "Insert your NFT web url"} name='externalURLControl' onChange={handleChange} value={externalURL} disabled={successMessage}/>
						</Form.Group>
					</Form>


					<div className="messageContainer">
						{isLoading && <div>Loading...</div> }
						{/* isError && <div className="messageContainer"><br/>Per aggiornare i dati è necessario confermare la transazione tramite il proprio wallet<br/><br/></div> */}
						{successMessage && <div>Complimenti salvataggio avvenuto correttamente !!!</div> }

					</div>
					<div id="btnsContainer">
						<Button variant="primary" onClick={sendDataToIPFS}>
							Save Changes
						</Button>
						&nbsp;
						<a href={nftOpenSeaLink} target="_blank" rel="noreferrer">
							<Button>Look on OpenSea</Button>
						</a>
					</div>

				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>


				</Modal.Footer>
			</Modal>
		</div>
	);
}