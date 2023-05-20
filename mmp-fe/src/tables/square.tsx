import "bootstrap/dist/css/bootstrap.min.css";
import { useAccount, useContractRead } from "wagmi";
import { contractAbi } from "../constant/contract-abi";
import MillionMaticPageSymbol from "../images/MillionMaticPageSymbol.png";
import MillionMaticPageSymbolSold from "../images/MillionMaticPageSymbolSold.png";
import { useEffect } from "react";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

export function Square(props: any) {

	const imageSize = {
		width: "50%",
		heigth: "100%",
		//padding: "5px",
		//border: "solid 1px dimgrey",
	};

	const { data, isError, isLoading } = useContractRead({
		address: contractAddress,
		abi: contractAbi,
		functionName: "ownerOf",
		args: [props.tokenId],
		enabled:false
	});

	const clickButton = async () => {

		let userAddressOnPage = props.userAddressOnPage;

		let NFTOwnerAddress = data;
		const isMinted = props.isMinted;

		console.log("The user address on page is: " + props.userAddressOnPage);
		console.log("The NFT owner address is: " + NFTOwnerAddress);

		props.tokenIdChanger(props.tokenId);
		props.setImgSrcInfo(props.imgsrc);
		props.setAltTextInfo(props.alttext);
		props.setWebUrlInfo(props.weburl);

		//console.log("props.imgsrc: " + props.imgsrc);
		//console.log("props.alttext: " + props.alttext);
		//console.log("props.weburl: " + props.weburl);

		if (!isMinted) {
			console.log("The NFT is not minted: show mint modal");
			props.showMintModalChanger(true);
		} else {

			if (userAddressOnPage === NFTOwnerAddress) {
				console.log("The address of the user on the page and the address of the owner of the selected NFT are the same: show edit modal");
				props.showEditModalChanger(true);
			} else {
				console.log("The address of the user on the page and the address of the owner of the selected NFT aren't the same Open info modal");
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
				data-imgsrc = {props.imgsrc}
				data-alttext = {props.alttext}
				data-weburl = {props.weburl}
			>
				<img
					style={imageSize}
					src={props.imgsrc ? props.imgsrc : (props.isMinted ? MillionMaticPageSymbolSold : MillionMaticPageSymbol)}
					alt={props.alttext ? props.alttext : "Million Matic Page"}
				/>
			</button>
		</div>
	);
}


