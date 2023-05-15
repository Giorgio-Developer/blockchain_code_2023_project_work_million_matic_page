import { useContractRead } from "wagmi";
import {MintButton} from "../button/mint-button";
import { utils } from "ethers";
import { contractAbi } from "../constant/contract-abi";


interface TableProps {
  rows: number;
  columns: number;
}

interface Point {
  row: number;
  column: number;
}



export function HomeTable(props: TableProps) {
  const { rows, columns } = props;



  const ROWS = 256;
  const COLUMNS = 256;  

  const contractAddress = "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c";
/*
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'getGroupMetadata',
    //args: [0,4,0,4]
	args: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  });
  */

  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAllMintedTokenURI',
    //args: [0,4,0,4]
	args: []
  });


  console.log(data);




  let metadataArray: any[][] = [];
  let metadata: any = {};

  const cleanData = (data:any) => {

    data.forEach((row: any[],rowCounter:number) => {
      metadataArray[rowCounter] = [];
      row.forEach((col: any,colCounter:number) => {
       metadataArray[rowCounter][colCounter] = splitData(col);
      })
    });

  };

  function splitData(items:string){
    let splitted:string[] = items.replace(";","").split(",");

    metadata.row = splitted[0].split(": ")[1];
    metadata.col = splitted[1].split(": ")[1];
    metadata.tokenID = splitted[2].split(": ")[1];
    metadata.tokenURI = splitted[3].split(": ")[1];
    metadata.altText = splitted[4].split(": ")[1];
    metadata.webURL = splitted[5].split(": ")[1];

    return metadata;   

  }

  console.log(data);


  console.log(getAll(data));




  //cleanData(data);
  //console.log(metadataArray);
	// https://gateway.pinata.cloud/ipfs/bafkreifg75xs4w3htd2ief3rr36r7qn52o6n4tz666ulshxjoem37qixfq

  	async function getAll(data: any) {

		let response: Response[] = [];

		const base_uri = "https://gateway.pinata.cloud/ipfs/";

		for (let i = 0; i < data.length; i++) {

			//const el = JSON.parse(data[i]);
			response[i] = await fetch(base_uri + data[i], {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			});

			response[i].json().then((new_data) => {
				console.log(new_data);
			});
		}
	}



  function calculateTokenId(rows:number, columns:number){
    return (rows * ROWS ) + columns;
  } 

  function calculateRowCol(tokenId:number){

    let rows = Math.floor(tokenId / ROWS);
    let cols = tokenId % ROWS;

    let point:Point = {
      row: rows,
      column:cols
    };
    
    return point;
  } 


  const renderTable = () => {
    const tableRows = [];
    for (let i = 0; i < rows; i++) {
      const tableCells = [];
      for (let j = 0; j < columns; j++) {
        tableCells.push(
          <td key={`${i}-${j}`}>
            <MintButton row={i} col={j} tokenId={calculateTokenId(i,j)}/>
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

  return <div>{renderTable()}</div>;
}