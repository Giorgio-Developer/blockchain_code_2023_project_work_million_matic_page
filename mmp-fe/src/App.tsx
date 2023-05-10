import { useAccount, useConnect, useBalance, usePrepareContractWrite, useContractWrite, useContractRead } from "wagmi";
import { contractAbi } from "./constant/contract-abi";
import './App.css';

import {HomeTable} from "./tables/home-table";

const contractAddress = "0x507e782bCcC5f0a2cc563E7b619092c14b72FA3B";

const PINATA_APIKEY="027104963f9bcfa01a66"
const PINATA_SECRET="3a9e6115be91898f15e89d8fd1ef8c43051077e2c3eebb455b43cedc8e2b8b9b"

const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK(PINATA_APIKEY, PINATA_SECRET);

function App() {

    
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const { connect, connectors } = useConnect();  



    const ROWS = 256;
    const COLUMNS = 256;

/*     pinata.testAuthentication().then((result:any) => {
        //handle successful authentication here
        console.log(result);
    }).catch((err:any) => {
        //handle error here
        console.log(err);
    }); */

/*     const body = {
        message: 'Pinatas are awesome'
    };
    const options = {
        pinataMetadata: {
            name: MyCustomName,
            keyvalues: {
                customKey: 'customValue',
                customKey2: 'customValue2'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    }); */


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