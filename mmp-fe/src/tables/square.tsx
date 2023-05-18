import "bootstrap/dist/css/bootstrap.min.css";
import { useAccount, useContractRead } from "wagmi";
import { contractAbi } from "../constant/contract-abi";
import MillionMaticPageSymbol from "../images/MillionMaticPageSymbol.png";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

export function Square(props: any) {

	const imageSize = {
		width: "40%",
		heigth: "100%",
	};

	const { address } = useAccount();

	const { data, isError, isLoading } = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "ownerOf",
		args: [props.tokenId],
	});

	const clickButton = async () => {

		let userAddressInPage = address;

		let NFTOwnerAddress = data;
		const isMinted = props.isMinted;

		console.log("L'address di chi è in pagina è" + userAddressInPage);
		console.log("L'address dell'owner è " + NFTOwnerAddress);

		props.tokenIdChanger(props.tokenId);

		if (!isMinted) {
			console.log("Open mint modal");
			props.showMintModalChanger(true);
		} else {
			if (userAddressInPage === NFTOwnerAddress) {
					console.log("Open edit modal");
					props.showEditModalChanger(true);
			} else {
					console.log("Open info modal");
					props.showInfoModalChanger(true);
			}
		}

	};

	return (
		<div id="square">
			<button
				data-row={props.row}
				data-col={props.col}
				id={props.tokenId}
				onClick={clickButton}
				data-minted={props.isMinted}
			>
				<img
					style={imageSize}
					src={props.imgsrc ? props.imgsrc : MillionMaticPageSymbol}
					alt={props.alttext ? props.alttext : "Million Matic Page"}
				/>
			</button>
		</div>
	);
}


