import "bootstrap/dist/css/bootstrap.min.css";
import { useContractRead } from "wagmi";
import { contractAbi } from "../constant/contract-abi";
import MillionMaticPageSymbol from "../images/MillionMaticPageSymbol.png";
import MillionMaticPageSymbolSold from "../images/MillionMaticPageSymbolSold.png";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

export function Square(props: any) {

	const safeCols = process.env.REACT_APP_COLUMNS ? process.env.REACT_APP_COLUMNS : "8";

	const imageWidth = window.innerWidth / (2 * parseInt(safeCols));
	const imageSize = {
		width: imageWidth+"px",
	};

	const {  data: ownerOfRequest , isError, refetch, isSuccess }  = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "ownerOf",
		args: [props.tokenId],
		enabled:false
	});

	const clickButton = async () => {

		const isMinted = props.isMinted;

		if (!isMinted) {

			console.log("The NFT is not minted: show mint modal");
			props.showMintModalChanger(true);

		} else {

			let ownerOfRequest = await refetch();

			if(ownerOfRequest){

				let userAddressOnPage = props.userAddressOnPage;

				let NFTOwnerAddress = ownerOfRequest.data;

				console.log("The user address on page is: " + props.userAddressOnPage);
				console.log("The NFT owner address is: " + NFTOwnerAddress);

				if (userAddressOnPage === NFTOwnerAddress) {
					console.log("The address of the user on the page and the address of the owner of the selected NFT are the same: show edit modal");
					props.showEditModalChanger(true);
				} else {
					console.log("The address of the user on the page and the address of the owner of the selected NFT aren't the same Open info modal");
					props.showInfoModalChanger(true);
					props.nftOwnerAddressChanger(NFTOwnerAddress);
				}

			}
		}

		//console.log("props.image: " + props.image);
		//console.log("props.description: " + props.description);
		//console.log("props.externalURL: " + props.externalURL);
		
		props.tokenIdChanger(props.tokenId);
		props.setNameInfo(props.name);
		props.setNftImageInfo(props.nftImage);
		props.setDescriptionInfo(props.description);
		props.setExternalURLInfo(props.externalURL);

	};

	return (
		<div id="square">
			<button
				data-row={props.row}
				data-col={props.col}
				id={props.tokenId}
				onClick={clickButton}
				data-minted={props.isMinted}
				data-nftimage = {props.nftImage}
				data-description = {props.description}
				data-externalurl = {props.externalURL}
			>
				<img
					style={imageSize}
					src={props.nftImage ? props.nftImage : (props.isMinted ? MillionMaticPageSymbolSold : MillionMaticPageSymbol)}
					alt={props.description ? props.description : "Million Matic Page"}
				/>
			</button>
		</div>
	);
}


