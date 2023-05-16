import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "../constant/contract-abi";

const contractAddress = "0x43E310D5A9604653361eB53085aa3dfF77b3dc3c";

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

	return (
		<div>
			<button onClick={handleMint}>Mint</button>
		</div>
	);
}
