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
    args: [3, 3],
    overrides: {
      value: 1,
    }
  });
  const { data, write } = useContractWrite(config);

  const handleMint = async () => {
    if (!write) return;
    write();
  };

  const openModal = async (row:number,col:number) => {
    console.log(row,col);
    console.log(config);
    console.log(data);
    //console.log('write);
  };

  const line0 = ["0, 0", "0, 1", "0, 2", "0, 3"];
  const line1 = ["1, 0", "1, 1", "1, 2", "1, 3"];
  const line2 = ["2, 0", "2, 1", "2, 2", "2, 3"];
  const line3 = ["3, 0", "3, 1", "3, 2", "3, 3"];

  return (
    <div className="App">
      <div id="table-container">
      <table>
        {[line0, line1, line2, line3].map((line, index) => (
          <tr key={index}>
          {line.map((cell, cellIndex) => (
            <td key={cellIndex}>
              <button>{cell}</button>
            </td>
          ))}
          </tr>
        ))}
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
        <button onClick={() => openModal(1,1)} >
          <img src="https://i.ibb.co/CW5Wvry/buttonpng.png" alt="buttonpng" />
        </button>
      </div>
    </div>
  );
}


export default App;