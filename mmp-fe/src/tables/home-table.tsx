import { useContractRead, useContractReads } from "wagmi";
import { contractAbi } from "../constant/contract-abi";
import { useEffect, useState } from "react";
import { Square } from "./square";
import { EditModal } from "../modals/editModal";
import { InfoModal } from "../modals/infoModal";
import { MintModal } from "../modals/mintModal";

interface TableProps {
	rows: number;
	columns: number;
}

interface Point {
	row: number;
	column: number;
}

export function HomeTable(props: TableProps) {

	const ROWS = (process.env.REACT_APP_MAX_ROWS !== undefined) ? parseInt(process.env.REACT_APP_MAX_ROWS) : 256;
	const base_uri = process.env.REACT_APP_IPFS_BASE_URI;
	const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

	const { rows, columns } = props;
	const imgsrc: string[] = [];
	const alttext: string[] = [];
	const weburl: string[] = [];
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

	const initImgSrcData: string[] = [];
	const initAltTextData: string[] = [];
	const initWebUrlData: string[] = [];
	const initCIDData: string[] = [];
	const [imgSrcData, setImgSrcData] = useState(initImgSrcData);
	const [altTextData, setAltTextData] = useState(initAltTextData);
	const [webUrlData, setWebUrlData] = useState(initWebUrlData);
	const [CIDData, setCIDData] = useState(initCIDData);
	const [show, setShow] = useState(false);
	const [showInfoModal, setShowInfoModal] = useState(false);
	const [showMintModal, setShowMintModal] = useState(false);
	const [tokenId, setTokenId] = useState(0);

	const allMintedTokenURI = (data !== undefined) ? data[0] : [];
	const allMintedNFTs: any = (data !== undefined) ? data[1] : [];

	console.log("getAllMintedTokenURI: " + allMintedTokenURI);
	console.log("getAllMintedNFTs: " + allMintedNFTs);
/*
	const mappedAllMintedNFTs = allMintedNFTs.map((tokenId: any) => {
	});
*/


	const mappedAllMintedNFTs: any[] = [];

	for (let index = 0; index < allMintedNFTs.length; index++) {
		const element = allMintedNFTs[index];
		mappedAllMintedNFTs[element] = true;
	}


	console.log(mappedAllMintedNFTs);

	

/*
interface typeMappedAllMintedNFTs {
	[key: number]: boolean;
}

const mappedAllMintedNFTs = {};

for (let index = 0; index < allMintedNFTs.length; index++) {
	const element = allMintedNFTs[index];
	//mappedAllMintedNFTs[element] = true;

	const myObj = {
			tokenId: element,
			writing: true,
			enjoyment: 10,
			meta: {
				minutesWriting: 20,
				minutesProcrastinating: 0,
			}
		};
}
*/

	useEffect(() => {
		if (allMintedTokenURI) {
			initButtons(allMintedTokenURI);
		}
	}, [allMintedTokenURI]);

	async function initButtons(allMintedTokenURI: any) {

		let response: Response[] = [];

		for (let i = 0; i < allMintedTokenURI.length; i++) {
			if (allMintedTokenURI[i] != null && allMintedTokenURI[i] !== "") {
				//console.log(base_uri + allMintedTokenURI[i]);
				response[i] = await fetch(base_uri + allMintedTokenURI[i], {
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				});

				response[i].json().then((new_data) => {

					const dataFromIPFS = new_data;
					const id = dataFromIPFS.tokenId;

					imgsrc[id] = dataFromIPFS.imgURL;
					setImgSrcData([...imgsrc]);

					alttext[id] = dataFromIPFS.altText;
					setAltTextData([...alttext]);

					weburl[id] = dataFromIPFS.webURL;
					setWebUrlData([...weburl]);

					cid[id] = allMintedTokenURI[i];
					setCIDData([...cid]);
				});
			}
		}
	}

	function calculateTokenId(rows: number, columns: number) {
		return rows * ROWS + columns;
	}

	function calculateRowCol(tokenId: number) {
		let rows = Math.floor(tokenId / ROWS);
		let cols = tokenId % ROWS;

		let point: Point = {
			row: rows,
			column: cols,
		};

		return point;
	}

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
							tokenId={currentTokenID}
							imgsrc={imgSrcData[currentTokenID]}
							alttext={altTextData[currentTokenID]}
							weburl={webUrlData[currentTokenID]}
							showEditModalChanger={setShow}
							tokenIdChanger={setTokenId}
							isMinted={(mappedAllMintedNFTs[currentTokenID] === true) ? true : false}
							//isMinted={allMintedNFTs.includes(currentTokenID)}
							showInfoModalChanger={setShowInfoModal}
							showMintModalChanger={setShowMintModal}
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

    console.log("Close");
    setShow(false);
	setShowInfoModal(false);
	setShowMintModal(false);
    
  };

	return (
    <div>
      {renderTable()}
      <EditModal tokenId={tokenId} show={show} clickCloseButton={clickCloseButton}/>
      <InfoModal tokenId={tokenId} show={showInfoModal} clickCloseButton={clickCloseButton} />
      <MintModal tokenId={tokenId} show={showMintModal} clickCloseButton={clickCloseButton} />
    </div>
  );
}
