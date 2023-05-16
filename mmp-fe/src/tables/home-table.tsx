import { useContractRead } from "wagmi";
import { MintButton } from "../button/mint-button";
import { utils } from "ethers";
import { contractAbi } from "../constant/contract-abi";
import { useEffect, useState } from "react";
import { Square } from "./square";
import { EditModal } from "../modals/editModal";
import { createContext } from "react";
export const SigninContext = createContext({});


// TODO: Il tokenId e la i non corrispondono negli array imgSrcData, altTextData e webUrlData (vedi initButtons e renderTable)


interface TableProps {
	rows: number;
	columns: number;
}

interface Point {
	row: number;
	column: number;
}

export function HomeTable(props: TableProps) {

	const ROWS = 256;
	const COLUMNS = 256;
	const base_uri = "https://gateway.pinata.cloud/ipfs/";

	const { rows, columns } = props;
	const imgsrc: string[] = [];
	const alttext: string[] = [];
	const weburl: string[] = [];
	const cid: string[] = [];

	const contractAddress = "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c";

	const { data, isError, isLoading } = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "getAllMintedTokenURI",
		args: [],
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
	const [tokenId, setTokenId] = useState(0);
	

	useEffect(() => {
		if (data) {
			initButtons(data);
		}
	}, [data]);

	async function initButtons(data: any) {

		let response: Response[] = [];

		for (let i = 0; i < data.length; i++) {
			if (data[i] != null && data[i] !== "") {
				response[i] = await fetch(base_uri + data[i], {
					method: "GET",
					headers: {
						Accept: "application/json",
					},
				});

				response[i].json().then((new_data) => {
					const id = new_data.tokenId;
					imgsrc[id] = new_data.imgURL;
					setImgSrcData([...imgsrc]);

					alttext[id] = new_data.altText;
					setAltTextData([...alttext]);

					weburl[id] = new_data.webURL;
					setWebUrlData([...weburl]);

					cid[id] = data[i];
					setCIDData([...cid]);
					console.log(cid);
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
              stateChanger={setShow}
              tokenIdChanger={setTokenId}
              isMinted={CIDData[currentTokenID] !== undefined ? true : false}
            />
          </td>
        );
			}

			tableRows.push(<tr key={i}>{tableCells}</tr>);
		}

		return (
			<table>
				<tbody>{tableRows}</tbody>
			
			</table>

		);
  };

	return (
    <div>
      {renderTable()}
			<EditModal
				tokenId={tokenId}
				show={show}
			/>
    </div>
  );
}
