import { Button } from "react-bootstrap";
import { useConnect } from "wagmi";

export function ConnectWallet(props: any) {

	const { connect, connectors } = useConnect();
	
	const connectWallet = async () => {
		console.log('ConnectWallet');
		//props.clickConnectWalletButton();

		connectors.map((connector) => (
			<button key={connector.id} onClick={() => connect({ connector })}>
				{connector.name}
			</button>
		))

	};

	return (
		<div className="mint-button-container">
			{
				connectors.map((connector) => (
					<Button variant="secondary" onClick={() => connect({ connector })}>
						Buy
					</Button>
					)
				)
			}
		</div>
	);
}