import { useAccount, useConnect, useBalance, usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "./constant/contract-abi";
import './App.css';

import {HomeTable} from "./tables/home-table";

const contractAddress = "0x507e782bCcC5f0a2cc563E7b619092c14b72FA3B";

function App() {

    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const { connect, connectors } = useConnect();

    const ROWS = 4;
    const COLUMNS = 4;

    return (
        <div className="App">
        <div id="title">
            <h1>Million Matic Page</h1>
        </div>
        <div id="container-master">
            <div id="project-info-container">Project Info</div>
            <div id="table-container"><HomeTable rows={ROWS} columns={COLUMNS} /></div>
            <div id="modal-container">Modal</div>
        </div>
        
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