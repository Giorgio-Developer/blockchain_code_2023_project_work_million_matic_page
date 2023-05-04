import { useAccount, useConnect, useBalance, usePrepareContractWrite, useContractWrite } from "wagmi";
import { contractAbi } from "./constant/contract-abi";
import './App.css';

const contractAddress = "0xD4Be9810D708d7a12b209F0c41dB51b303622aEa";

function App() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "ourMint",
    args: [1, 2],
    overrides: {
      value: 1,
    }
  });
  const { data, write } = useContractWrite(config);

  const handleMint = async () => {
    if (!write) return;
    write();
  };

  console.log(data, 1);

  const ncol = 4;
  const nrig = 4;

  let tabella = ""
  for(let i = 1; i < ncol; i++) {
    tabella = tabella + "<tr>"
    for(let y = 1; y < nrig; y++){
      tabella = tabella + "<td>" + i + " " + y + "</td>";
    }
    tabella = tabella + "</tr>"
  }

  return (
    <div className="App">
      <div id="table-container">
        <table>
          <tr>
            {tabella}
          </tr>
        </table>
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
        <button onClick={handleMint}>Mint</button>
      </div>
    </div>
  );
}

export default App;