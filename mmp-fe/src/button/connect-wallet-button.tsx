import { Button } from "react-bootstrap";
import { useConnect } from "wagmi";

export function ConnectWallet(props: any) {

	const { connect, connectors } = useConnect();

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