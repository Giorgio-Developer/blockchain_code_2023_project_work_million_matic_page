// SPDX-License-Identifier: GPL 3
/**
* @title MillionMaticPage
* @author Giorgio Sanfilippo, Riccardo , Davide Mele, Maurizio Custodi
* @notice 
* @dev ContractDescription
* @custom:dev-run-script file_path
*/

/** TODO LIST
 * VARs & CONSTANTs
 * - const price = 1 * decimals(18)										// 1 MATIC - Per debug lasciara a 1 wei
 * - 
 * FUNCTIONS
 * - withdrawBalance() onlyOwner -> bool								// Preleviamo i fondi dal contratto
 * - getNFTByRowCol(row, col) -> tokenId
 * - getNFTByOwner(owner) -> array of tokenId
 * - checkOwnerOfNFT(tokenId) -> bool 									// Verifica che il msg.sender sia il proprietario del NFT (utile per il modal)
 * BULK getters
 * - getMintedNFTs() -> array of tokenId
 * - getTokenURIsOfMintedNFTs() -> array of tokenURI 					// "www.aaa.com;www.bb.com;"
 * - getAltTextsOfMintedNFTs() -> string						// "AltText1;AltText2;;"
 * - getWebURLssOfMintedNFTs() -> array of WebURLs
 * 
 * - getAllMetadata(maxROW, maxCol)	-> string							// O così: getTokenURIsOfMintedNFTs() + getAltTextsOfMintedNFTs() + getWebURLssOfMintedNFTs()
 * 																		// "row: 0, col: 0, tokenId: 1, tokenURI: www.aaa.com, altText: AltText1, webURL: www.aaa.com;
 * 																		//  row: 0, col: 1, tokenId: 2, tokenURI: www.bb.com, altText: AltText2, webURL: www.bb.com;
 * 																		// ...abi
 * 																		// row: 1, col: 0, tokenId: 99, tokenURI: www.bb.com, altText: AltText2, webURL: www.bb.com;
 * - getNFTMetadata(tokenId) -> string									
 * BULK setter
 * - setNFTMetadata(tokenId, tokenURI, altText, webURL) -> bool
 * 
 * VALUTARE SE POSSONO ESSERE UTILI
 * - getMintedNFTsByOwner(owner) -> array of tokenId 					// Per ora non serve
 * - getLocationByTokenId(tokenId) -> row, col
 * - getOwnerByTokenId(tokenId) -> owner
 * - getOwnerByRowCol(row, col) -> owner
 * 
 * TESTs
 * - Verificare cosa accade con le varie transfer (safeTransferFrom, transferFrom, etc)
 */

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MillionMaticPage is ERC721, ERC721URIStorage, Ownable {

	// STATE VARs

	// 1 * decimals()
	uint256 constant price = 1;

	uint256[] public mintedNFTs;

	// EVENTS
	//event minted(address indexed _from, bytes32 indexed _id, uint _value);

	// MODIFIERS
	modifier onlyNftOwner(uint256 tokenId) {
	  require(msg.sender == ownerOf(tokenId));
	  _;
   }

	modifier existsNFT(uint256 tokenId) {
	  require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
	  _;
   }

	constructor() ERC721("MillionMaticPage", "MMP") {

	}

	function _baseURI() internal pure override returns (string memory) {
		return "";
	}

/*
	function ourMint(uint8 row, uint8 col) public payable {
		require(msg.value > 0, "The price is too low");
		require(NFT_x_y[row][col] == 0, "NFT already minted");

		uint256 tokenId = _tokenIdCounter.current();

		_tokenIdCounter.increment();
		_safeMint(msg.sender, tokenId);

		NFT_x_y[row][col] = tokenId;

	}
*/

	function ourMint(uint256 tokenId) public payable {
		require(msg.value > 0, "The price is too low");
		//require(NFT_x_y[row][col] == 0, "NFT already minted");
		//uint256 tokenId = _tokenIdCounter.current();
		//_tokenIdCounter.increment();

		_safeMint(msg.sender, tokenId);
		mintedNFTs.push(tokenId);

	}

	// The following functions are overrides required by Solidity.
	function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

	/*
	TODO: 
	function _burn(uint256 tokenId) internal virtual override {
	}
	*/



	function getTokenURIsOfMintedNFTs() public view returns (string[] memory) {
		string[] memory result;

		for (uint i = 0; i < mintedNFTs.length; i++) {
				result[i] = tokenURI(mintedNFTs[i]);
		}

		return result;
	}

/*
	function getAllMetadata(uint256 maxROW, uint256 maxCOL) public view returns (string memory) {
		string memory result = "";

		for (uint256 row = 0; row < maxROW; row++) {
			for (uint256 col = 0; col < maxCOL; col++) {

				uint256 tokenId = NFT_x_y[row][col];

				if (tokenId != 0) {
					result = string(abi.encodePacked(result, "row: ", row, ", col: ", col, ", tokenId: ", tokenId, ", tokenURI: ", tokenURI(tokenId), ", altText: ", _altTexts[tokenId], ", webURL: ", _webURLs[tokenId], ";"));
				} else {
					result = string(abi.encodePacked(result, "row: ", row, ", col: ", col, ", tokenId: ", tokenId, ", tokenURI: ", "", ", altText: ", "", ", webURL: ", "", ";"));
				}

			}
		}

		return result;

	}

	function getAllMetadata(uint8 maxROW, uint8 maxCOL) public view returns (string[][] memory) {
		string[][] memory result = new string[][](maxROW);

		for (uint8 row = 0; row < maxROW; row++) {
			result[row] = new string[](maxCOL);
			for (uint8 col = 0; col < maxCOL; col++) {

				uint256 tokenId = NFT_x_y[row][col];

				if (tokenId != 0) {
					result[row][col] = string(abi.encodePacked("row: ", row, ", col: ", col, ", tokenId: ", tokenId, ", tokenURI: ", tokenURI(tokenId), ", altText: ", _altTexts[tokenId], ", webURL: ", _webURLs[tokenId], ";"));
				} else {
					result[row][col] = string(abi.encodePacked("row: ", row, ", col: ", col, ", tokenId: ", tokenId, ", tokenURI: ", "", ", altText: ", "", ", webURL: ", "", ";"));
				}

			}
		}

		return result;

	}
*/



	function getAllMintedTokenURI() public view returns (string[] memory) {

		string[] memory res = new string[](mintedNFTs.length);

		for (uint i = 0; i < mintedNFTs.length; i++) {
			res[i] = tokenURI(mintedNFTs[i]);
		}

		return res;
	}

	function getGroupMetadata(uint256[] calldata tokenIds) public view returns (string[] memory) {

		string[] memory data = new string[](tokenIds.length);

		for(uint256 i=0; i < tokenIds.length; i++) {
			if (_exists(tokenIds[i]))
				data[i] = tokenURI(tokenIds[i]);
			else 
				data[i] = "";
		}

		return data;

	}


	function getGroupMetadataInterval(uint256 startTokenIds, uint256 endTokenIds) public view returns (string[] memory) {

		if(startTokenIds > endTokenIds)
			revert("startTokenIds > endTokenIds");

		string[] memory data = new string[]((endTokenIds - startTokenIds)+1);


		for(uint256 tokenId = startTokenIds; tokenId <= endTokenIds; tokenId++) {
			if (_exists(tokenId))
				data[tokenId] = tokenURI(tokenId);
			else 
				data[tokenId] = "";
		}

		return data;

	}

	function setTokenURI(uint256 tokenId, string memory _tokenURI) public onlyNftOwner(tokenId) existsNFT(tokenId) returns (bool) {
		_setTokenURI(tokenId, _tokenURI);
		return true;
	}


/*
	function withdrawBalance() public onlyOwner returns (bool) {
		uint256 balance = address(this).balance;
		payable(msg.sender).transfer(balance);
		return true;
	}
*/

// TODO: Modificare i tokenId in uint16

	// INTERNAL
	function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual override {
		super._setTokenURI(tokenId, _tokenURI);
	}

}