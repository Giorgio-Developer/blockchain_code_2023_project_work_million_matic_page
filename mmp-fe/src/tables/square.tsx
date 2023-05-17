import "bootstrap/dist/css/bootstrap.min.css";
import { useAccount, useContractRead } from "wagmi";
import { contractAbi } from "../constant/contract-abi";

export function Square(props: any) {
  const imageSize = {
    width: "200px",
    heigth: "200px",
  };

  const { address } = useAccount();

	const contractAddress = "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c";

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
    <div>
      <button
        data-row={props.row}
        data-col={props.col}
        id={props.tokenId}
        onClick={clickButton}
        data-minted={props.isMinted}
      >
        <a href={props.weburl} target="_blank" rel="noreferrer">
          <img
            style={imageSize}
            src={
              props.imgsrc
                ? props.imgsrc
                : "https://static.vecteezy.com/ti/vettori-gratis/p3/7978653-coca-cola-popular-drink-brand-logo-vinnytsia-ucraina-16-maggio-202-gratuito-vettoriale.jpg"
            }
            alt={props.alttext ? props.alttext : "Million Matic Page"}
          />
        </a>
      </button>
    </div>
  );
}


