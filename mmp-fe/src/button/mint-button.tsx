import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "../constant/contract-abi";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS as `0x${string}`;

export function MintButton(props: any) {

	const [loading, setLoading] = useState(false);
	const [buyButtonStyle, setBuyButtonStyle] = useState({ display: 'inline' });

	const abi = contractAbi;

	const { config } = usePrepareContractWrite({
		address: contractAddress,
		abi: abi,
		functionName: "ourMint",
		args: [props.tokenId],
		overrides: {
			value: 1,
		},
	});

	const { data, isLoading, isSuccess, isError, write } = useContractWrite(config);

	const handleTransactionStart = () => {
			setLoading(true); 							// Imposta lo stato di loading a true per mostrare il loader
			props.setLoadingSpinner(true);				// Mostro lo Spinner
	}
	const handleTransactionSuccess = () => {
			setBuyButtonStyle({ display: 'none' });
			setLoading(false);							// Imposta lo stato di loading a false una volta completata o fallita la transazione
			props.setLoadingSpinner(false);
	}
	const handleTransactionError = () => {
			setLoading(false); 			// Imposta lo stato di loading a false una volta completata o fallita la transazione
			props.setLoadingSpinner(false);
	}

	useEffect(() => {
		if (isLoading) {
			handleTransactionStart();
		}
	}, [handleTransactionStart, isLoading]);
	
	useEffect(() => {
		if (isSuccess) {
			handleTransactionSuccess();
		}
	}, [handleTransactionSuccess, isSuccess]);

	useEffect(() => {
		if (isError) {
			handleTransactionError();
		}
	}, [handleTransactionError, isError]);

	const handleMint = async () => {

		if (loading) return; // Se la transazione è già in corso, non fare nulla

		try {
			if (!write) return; 		// Se la funzione di scrittura non è stata inizializzata, non fare nulla
			await write(); 				// Esegui la transazione
		} catch (error) {
			console.error(error);
		} finally {
		}
	};


	const polygon_base_uri = "https://mumbai.polygonscan.com/tx/";

	return (
		<div className="mint-button-container">
			 <Button variant="primary" onClick={handleMint} disabled={loading} style={buyButtonStyle}>
				Buy 
			</Button>
			{isLoading && <div>Loading...</div>}
			{isSuccess && <div><br/>*** Excellent !!!  ***<br/><b>This NFT now it's Your</b><br/><a href={polygon_base_uri+JSON.stringify(data)}>See the transaction</a></div>}
			{isError && <div><br/><b> Oh no !!!</b><br/>You refused to purchase the greatest NFT of all time !!!<br/><b>Everyone deserves a second chance to be rich, buy it now</b></div>}
		</div>
	);
}
