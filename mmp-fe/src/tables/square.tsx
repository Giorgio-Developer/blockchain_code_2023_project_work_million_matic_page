import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContractRead } from "wagmi";
import { contractAbi } from "../constant/contract-abi";

export function Square(props: any) {
  const imageSize = {
    width: "200px",
    heigth: "200px",
  };

	const contractAddress = "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c";

  	const { data, isError, isLoading } = useContractRead({
      address: contractAddress,
      abi: contractAbi,
      functionName: "ownerOf",
      args: [props.tokenId],
    });

  const clickButton = async () => {

    console.log("L'address dell'owner è " + data);

    props.tokenIdChanger(props.tokenId);
    if (props.isMinted) {
      props.stateChanger(true);
    } else {
      props.showMintModalChanger(true);
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


