import { useAccount, useConnect, useBalance, usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "../constant/contract-abi";

const contractAddress = "0xD4Be9810D708d7a12b209F0c41dB51b303622aEa";

export function MintButton(props: any) {
    const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "ourMint",
    args: [props.row, props.col],
    overrides: {
      value: 1,
    }
  });
  const { data, write } = useContractWrite(config);

  const handleMint = async () => {
    console.log(write)
    if (!write) return;
    console.log(config)
    write();
  };

  const imageSize = {
    width: "100px",
    heigth: "100px"
  }

  return (
    <div>
        <button onClick={handleMint}>
          <img style={imageSize} src="https://static.vecteezy.com/ti/vettori-gratis/p3/7978653-coca-cola-popular-drink-brand-logo-vinnytsia-ucraina-16-maggio-202-gratuito-vettoriale.jpg" alt="buttonpng" />
        </button>
    </div>
  );
}