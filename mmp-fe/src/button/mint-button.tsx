import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "../constant/contract-abi";
import { Button } from "react-bootstrap";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

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
		<div className="mint-button-container">
			<Button variant="primary" onClick={handleMint}>
				Buy
			</Button>
		</div>
	);
}
