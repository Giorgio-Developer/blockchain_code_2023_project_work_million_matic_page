import { useContractReads } from "wagmi";
import { contractAbi } from "../constant/contract-abi";
import { useEffect, useState } from "react";
import { Square } from "./square";
import { EditModal } from "../modals/editModal";
import { InfoModal } from "../modals/infoModal";
import { MintModal } from "../modals/mintModal";
import { LoadingSpinner } from "./loading-spinner";
import axios from 'axios';

/*
interface TableProps {
	rows: number;
	columns: number;
}

interface Point {
	row: number;
	column: number;
}
*/

export function HomeTable(props: any) {

	const ROWS = (process.env.REACT_APP_MAX_ROWS !== undefined) ? parseInt(process.env.REACT_APP_MAX_ROWS) : 256;
	const base_uri = process.env.REACT_APP_IPFS_BASE_URI;
	const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

	const rows = props.rows;
	const columns = props.columns;
	const userAddressOnPage = props.userAddressOnPage;
	const name: string[] = [];
	const nftImage: string[] = [];
	const description: string[] = [];
	const externalURL: string[] = [];
	const cid: string[] = [];

	const { data, isError, isLoading } = useContractReads({
		contracts: [
			{
				address: contractAddress,
				abi: contractAbi,
				functionName: "getAllMintedTokenURI",
				args: [],
			},
			{
				address: contractAddress,
				abi: contractAbi,
				functionName: "getAllMintedNFTs",
				args: [],
			},
		],
	});

	const initNameData: string[] = [];
	const initNftImageData: string[] = [];
	const initDescriptionData: string[] = [];
	const initExternalURLData: string[] = [];
	const initCIDData: string[] = [];
	const [nameData, setNameData] = useState(initNameData);
	const [nftImageData, setNftImageData] = useState(initNftImageData);
	const [descriptionData, setDescriptionData] = useState(initDescriptionData);
	const [externalURLData, setExternalURLData] = useState(initExternalURLData);

	// Dati per le modali
	const [nameInfo, setNameInfo] = useState("");
	const [nftImageInfo, setNftImageInfo] = useState("");
	const [descriptionInfo, setDescriptionInfo] = useState("");
	const [externalURLInfo, setExternalURLInfo] = useState("");
	const [CIDData, setCIDData] = useState(initCIDData);
	const [tokenId, setTokenId] = useState(0);

	const [show, setShow] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showMintModal, setShowMintModal] = useState(false);
	const [tokenIdMintingStatus, setTokenIdMintingStatus] = useState({});
	const [loadingSpinner, setLoadingSpinner] = useState(false);
	const [nftOwnerAddress, setNftOwnerAddress] = useState('');
	const [mintTxStatusChanger, setMintTxStatusChanger] = useState(false);


	const allMintedTokenURI = (data !== undefined) ? data[0] : [];
	const allMintedNFTs: any = (data !== undefined) ? data[1] : [];
	let buttonAlreadyInitiated = false;
	//console.log("getAllMintedTokenURI: " + allMintedTokenURI);
	//console.log("getAllMintedNFTs: " + allMintedNFTs);

	const ipfsJsonData: string[] = [];

	// Funzione per aggiornare il valore di una chiave
	const updateValue = (key: number, value: boolean) => {
		setTokenIdMintingStatus(prevData => ({
			...prevData,
			[key]: value
		}));
	};

	const checkKeyExistence = (key:number) => {
		return tokenIdMintingStatus.hasOwnProperty(key);
	};

	function setMintedPropertyForTokenId() {
		for (let index = 0; index < allMintedNFTs.length; index++) {
			updateValue(parseInt(allMintedNFTs[index]._hex), true);
		}
	}

	useEffect(() => {
		if (!buttonAlreadyInitiated && allMintedTokenURI) {
			buttonAlreadyInitiated = true;
			initButtons(allMintedTokenURI);
		}
		setMintedPropertyForTokenId();

	}, [allMintedTokenURI]);

	//Manage the minting status when the mint transaction is finished
	useEffect(() => {
		if (mintTxStatusChanger) {
			updateValue(tokenId, true);
		}
	}, [mintTxStatusChanger]);


	async function getIPFSData(tokenUri: string) {

		let jsonData: any;
		const ipfs_url = tokenUri;
		//console.log("ipfs_url: " + ipfs_url);
	  
		const config = {
		  headers: {
			'Content-Type': 'application/json',
		  },
		};
	  
		try {
			const response = await axios.get(ipfs_url, config);
			//console.log(response.data);

			const serializedData = response.data["/"];

			if (serializedData && serializedData.bytes) {
				const decodedBytes = atob(serializedData.bytes);
				jsonData = JSON.parse(decodedBytes);
				//console.log(jsonData);
				// Puoi utilizzare jsonData come oggetto JSON deserializzato
			} else {
				//console.log(response.data);
				jsonData = response.data;
			}
		} catch (error) {
			console.error(error);
		}

		//console.log(jsonData);
		const id = jsonData.tokenId;
		//console.log("jsonData.tokenId: " + jsonData.tokenId);

		name[id] = jsonData.name;
		setNameData([...name]);

		nftImage[id] = jsonData.image;
		setNftImageData([...nftImage]);

		description[id] = jsonData.description;
		setDescriptionData([...description]);

		externalURL[id] = jsonData.external_url;
		setExternalURLData([...externalURL]);

		cid[id] = tokenUri;
		setCIDData([...cid]);

	}


	async function initButtons(allMintedTokenURI: any) {

		//console.log("initButtons");

		let requests: any[] = [];

		for (let i = 0; i < allMintedTokenURI.length; i++) {

			const nftTokenURI =allMintedTokenURI[i];

			if (nftTokenURI != null && nftTokenURI !== "" ) {

				/*TODO migliorare il controllo
				  AL momento verifico che il cast del token URI sia o no un numero
				  Se lo è andrà in not a number e non fara la richiesta ad ipfs
				  */
				if(nftTokenURI.length == 112){
					//console.log(i+". "+base_uri + allMintedTokenURI[i]);
					requests.push(getIPFSData(nftTokenURI));
				}
			}
		}

		// Gestione delle richieste in parallelo
		Promise.all(requests).then(function (results) {});

	}

	function calculateTokenId(rows: number, columns: number) {
		return rows * ROWS + columns;
	}


/*
	function calculateRowCol(tokenId: number) {
		let rows = Math.floor(tokenId / ROWS);
		let cols = tokenId % ROWS;

		let point: Point = {
			row: rows,
			column: cols,
		};

		return point;
	}
*/
	const renderTable = () => {
		const tableRows = [];

		for (let i = 0; i < rows; i++) {
			const tableCells = [];
			for (let j = 0; j < columns; j++) {
				let currentTokenID = calculateTokenId(i, j);
				tableCells.push(
					<td key={`${i}-${j}`}>
						<Square
							row={i}
							col={j}
							userAddressOnPage={userAddressOnPage}
							tokenId={currentTokenID}
							name={nameData[currentTokenID]}
							nftImage={nftImageData[currentTokenID]}
							description={descriptionData[currentTokenID]}
							externalURL={externalURLData[currentTokenID]}

							// Funzioni per passare i dati alle modal
							setNameInfo={setNameInfo}
							setNftImageInfo={setNftImageInfo}
							setDescriptionInfo={setDescriptionInfo}
							setExternalURLInfo={setExternalURLInfo}

							tokenIdChanger={setTokenId}
							isMinted={checkKeyExistence(currentTokenID)}
							nftOwnerAddressChanger={setNftOwnerAddress}
							showInfoModalChanger={setShowInfoModal}
							showMintModalChanger={setShowMintModal}
							showEditModalChanger={setShow}

						/>
					</td>
				);
			}

			tableRows.push(<tr key={i}>{tableCells}</tr>);
		}

		return (
			<div id="home-table-container">
				<table id="home-table">
					<tbody>
						{tableRows}
					</tbody>
				</table>
			</div>
		);
  };

	const clickCloseButton = async () => {
		// console.log("Close");
		setShow(false);
		setShowInfoModal(false);
		setShowMintModal(false);
	};

	return (
	<div>
		{renderTable()}
		<EditModal tokenId={tokenId} nameInfo={nameInfo} nftImageInfo={nftImageInfo} descriptionInfo={descriptionInfo} externalURLInfo={externalURLInfo} show={show} clickCloseButton={clickCloseButton} nftOwnerAddress={nftOwnerAddress} setLoadingSpinner={setLoadingSpinner} />
		<InfoModal tokenId={tokenId} nameInfo={nameInfo} nftImageInfo={nftImageInfo} descriptionInfo={descriptionInfo} externalURLInfo={externalURLInfo} show={showInfoModal} clickCloseButton={clickCloseButton} nftOwnerAddress={nftOwnerAddress}/>
		<MintModal tokenId={tokenId} show={showMintModal} clickCloseButton={clickCloseButton} setLoadingSpinner={setLoadingSpinner} mintTxStatusChanger={setMintTxStatusChanger}/>
		<LoadingSpinner show={loadingSpinner} />
	</div>
  );
}
