import { useAccount, useConnect, useBalance } from "wagmi";
import './App.css';
import {HomeTable} from "./tables/home-table";
import MillionMaticPageTitle from "./images/MillionMaticPageTitle.png";
import MillionMaticPageSymbol from "./images/MillionMaticPageSymbol.png";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const ROWS = (process.env.REACT_APP_ROWS != undefined) ? parseInt(process.env.REACT_APP_ROWS) : 4;
const COLUMNS = (process.env.REACT_APP_COLUMNS != undefined) ? parseInt(process.env.REACT_APP_COLUMNS) : 4;

function App() {

	document.body.style.backgroundColor = "#202020";

	const { address } = useAccount();
	const { data: balance } = useBalance({ address });
	const { connect, connectors } = useConnect();  

	return (
		<div className="App">

		<div className="image-title-container">
			<img src={MillionMaticPageTitle} alt="Million Matic Page" className="image-title"/>
		</div>
		<div id="container-master">
			<div id="table-container">
				<HomeTable rows={ROWS} columns={COLUMNS} />
			</div>
		</div>
		
		{/* Metamask Button */}
		{connectors.map((connector) => (
			<button key={connector.id} onClick={() => connect({ connector })}>
				{connector.name}
			</button>
			))}
			
		<div>
			{address && <div>Address: {address}</div>}
			{balance && <div>Balance: {balance.formatted}</div>}
		</div>

		<div>
			Contract Address: {contractAddress}
		</div>
		</div>
	);
}


export default App;

