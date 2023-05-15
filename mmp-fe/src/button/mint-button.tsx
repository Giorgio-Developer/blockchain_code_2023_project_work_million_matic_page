import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "../constant/contract-abi";

const contractAddress = "0x507e782bCcC5f0a2cc563E7b619092c14b72FA3B";

export function MintButton(props: any) {

  const abi = contractAbi;

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "ourMint",
    args: [props.row, props.col],
    overrides: {
      value: 1,
    },
  });
  
  const { data, write } = useContractWrite(config);

  const handleMint = async () => {

    console.log(write);
    if (!write) return;
    console.log(config);
    write();
  };

  const imageSize = {
    width: "200px",
    heigth: "200px",
  };

  // 👈️ empty dependencies array

  return (
    <div>
      <button data-row={props.row} data-col={props.col} onClick={handleMint}>
        <img
          style={imageSize}
          src="https://static.vecteezy.com/ti/vettori-gratis/p3/7978653-coca-cola-popular-drink-brand-logo-vinnytsia-ucraina-16-maggio-202-gratuito-vettoriale.jpg"
          alt="buttonpng"
        />
      </button>
    </div>
  );
}
