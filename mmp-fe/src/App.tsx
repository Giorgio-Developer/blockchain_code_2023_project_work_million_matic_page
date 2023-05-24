import { useAccount, useConnect } from "wagmi";
import './App.css';
import {HomeTable} from "./tables/home-table";
import MillionMaticPageTitle from "./images/MillionMaticPageTitle.png";
import { Button } from "react-bootstrap";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const ROWS = (process.env.REACT_APP_ROWS != undefined) ? parseInt(process.env.REACT_APP_ROWS) : 4;
const COLUMNS = (process.env.REACT_APP_COLUMNS != undefined) ? parseInt(process.env.REACT_APP_COLUMNS) : 4;

function App() {

	document.body.style.backgroundColor = "#202020";

	const { address } = useAccount();
	const { connect, connectors } = useConnect();


	const userAddressOnPage = address;

	return (
		<div className="App">
			<div className="image-title-container">
				<img src={MillionMaticPageTitle} alt="Million Matic Page" className="image-title"/>
			</div>
			<div id="container-master">
				<div id="table-container">
					<HomeTable rows={ROWS} columns={COLUMNS} userAddressOnPage={userAddressOnPage}/>
				</div>
			</div>
			<br></br>
			{/* Metamask Button */}
			{connectors.map((connector) => (
				<Button key={connector.id} onClick={() => connect({ connector })}>
					{"Connect with " + connector.name}
				</Button>
				))}
		</div>
	);
}


export default App;

