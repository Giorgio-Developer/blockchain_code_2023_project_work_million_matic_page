import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

var axios = require('axios');


const contractAddress = "0x507e782bCcC5f0a2cc563E7b619092c14b72FA3B";
const PINATA_APIKEY="027104963f9bcfa01a66";
const PINATA_SECRET="3a9e6115be91898f15e89d8fd1ef8c43051077e2c3eebb455b43cedc8e2b8b9b";
const PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwM2MyYjVkMC0xOWI0LTQ0OTgtYTJmZS02MDNlY2VlY2I2YjciLCJlbWFpbCI6InJpY2NhcmRvOTVtb2xpbmFyaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMDI3MTA0OTYzZjliY2ZhMDFhNjYiLCJzY29wZWRLZXlTZWNyZXQiOiIzYTllNjExNWJlOTE4OThmMTVlODlkOGZkMWVmOGM0MzA1MTA3N2UyYzNlZWJiNDU1YjQzY2VkYzhlMmI4YjliIiwiaWF0IjoxNjgzNzM3ODQ1fQ.C3G3EPsVimMHUxldjBcgsZMtG6iIdpbo8H-N4kDJgLI";
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "altText",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "maxROW",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "maxCOL",
          "type": "uint8"
        }
      ],
      "name": "getAllMetadata",
      "outputs": [
        {
          "internalType": "string[][]",
          "name": "",
          "type": "string[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAltTextsOfMintedNFTs",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "startRow",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "endRow",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "startCol",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "endCol",
          "type": "uint8"
        }
      ],
      "name": "getGroupMetadata",
      "outputs": [
        {
          "internalType": "string[][]",
          "name": "",
          "type": "string[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokenURIsOfMintedNFTs",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWebURLssOfMintedNFTs",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "row",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "col",
          "type": "uint8"
        }
      ],
      "name": "ourMint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "altText",
          "type": "string"
        }
      ],
      "name": "setAltText",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "imageUrl",
          "type": "string"
        }
      ],
      "name": "setTokenURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "webUrl",
          "type": "string"
        }
      ],
      "name": "setWebURL",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "webURL",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

export function EditModal(props: any) {


  interface TypeDataToSend {
    imgURL: string;
    altText: string;
    webURL: string;
  }

  const [show, setShow] = useState(false);
  const [imgURL, setImgURL] = useState('');
  const [altText, setAltText] = useState('');
  const [webURL, setWebURL] = useState('');
  const [contentIdentificator, setContentIdentificator] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "setTokenURI",
    args: [5,contentIdentificator]
  });
  
  const { data, write } = useContractWrite(config);
  
    const sendDataToIPFS = async () => {

      const dataToSend:TypeDataToSend = {
        imgURL: imgURL,
        altText: altText,
        webURL: webURL
      }

      console.log("I dati inviati ad IPFS sono " + dataToSend);

      var dataIPFS = JSON.stringify({
        "pinataOptions": {
      "cidVersion": 1
      },
        "pinataMetadata": {
            "name": "NFTData",
            "keyvalues": {
            "customKey": "customValue",
            "customKey2": "customValue2"
            }
        },
      "pinataContent": dataToSend
      });

      var configIPFS = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: { 
        'pinata_api_key': PINATA_APIKEY,
        'pinata_secret_api_key': PINATA_SECRET,
        'Content-Type': 'application/json', 
        },
        data : dataIPFS
        };

      const res = await axios(configIPFS);
      console.log(res.data.IpfsHash); 

      setContentIdentificator(res.data.IpfsHash);

      console.log(contentIdentificator);


      /* if (!write) return;
      console.log(config)
      write(); */

    };


  function handleChange(event:any) {
    let targetId = event.currentTarget.id;
    
    switch(targetId) {
      case 'imageUrlForm':
        setImgURL(event.target.value);
      break;
      case 'altTextForm':
        setAltText(event.target.value);
      break;
      case 'webURLForm':
        setWebURL(event.target.value);
      break;
    }

  }

    return (
      
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="imageUrlForm">
              <Form.Label>Image Url</Form.Label> 
              <Form.Control type="text" placeholder="image.png" name='imageUrlControl' onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="altTextForm">
              <Form.Label>Alt Text</Form.Label>
              <Form.Control type="text" placeholder="....."  name='altTextControl' onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="webURLForm">
              <Form.Label>Web Url</Form.Label>
              <Form.Control type="text" placeholder="www.google.com" name='webURLControl' onChange={handleChange}/>
            </Form.Group>
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={sendDataToIPFS}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }