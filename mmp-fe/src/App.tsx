import { useAccount, useConnect, useBalance, usePrepareContractWrite, useContractWrite, useContractRead } from "wagmi";
import { contractAbi } from "./constant/contract-abi";
import './App.css';

import {HomeTable} from "./tables/home-table";

const contractAddress = "0x507e782bCcC5f0a2cc563E7b619092c14b72FA3B";

const PINATA_APIKEY="027104963f9bcfa01a66"
const PINATA_SECRET="3a9e6115be91898f15e89d8fd1ef8c43051077e2c3eebb455b43cedc8e2b8b9b"
const PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwM2MyYjVkMC0xOWI0LTQ0OTgtYTJmZS02MDNlY2VlY2I2YjciLCJlbWFpbCI6InJpY2NhcmRvOTVtb2xpbmFyaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDI3MTA0OTYzZjliY2ZhMDFhNjYiLCJzY29wZWRLZXlTZWNyZXQiOiIzYTllNjExNWJlOTE4OThmMTVlODlkOGZkMWVmOGM0MzA1MTA3N2UyYzNlZWJiNDU1YjQzY2VkYzhlMmI4YjliIiwiaWF0IjoxNjgzNzM3ODQ1fQ.C3G3EPsVimMHUxldjBcgsZMtG6iIdpbo8H-N4kDJgLI";

//const pinataSDK = require('@pinata/sdk');
//const pinata = new pinataSDK(PINATA_APIKEY, PINATA_SECRET);

function App() {

    
    const { address } = useAccount();
    const { data: balance } = useBalance({ address });
    const { connect, connectors } = useConnect();  



    const ROWS = 256;
    const COLUMNS = 256;



    var axios = require('axios');
        var data = JSON.stringify({
        "pinataOptions": {
    "cidVersion": 1
  },
        "pinataMetadata": {
            "name": "testing",
            "keyvalues": {
            "customKey": "customValue",
            "customKey2": "customValue2"
            }
        },
  "pinataContent": {
    "somekey": "somevalue"
  }
});

var config = {
  method: 'post',
  url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
  headers: { 
    'pinata_api_key': PINATA_APIKEY,
    'pinata_secret_api_key': PINATA_SECRET,
    'Content-Type': 'application/json', 
  },
  data : data
};

const res = axios(config);

console.log(res.data);

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

function axios(arg0: { method: string; url: string; data: FormData; headers: { pinata_api_key: string; pinata_secret_api_key: string; "Content-Type": string; }; }) {
    throw new Error("Function not implemented.");
}
