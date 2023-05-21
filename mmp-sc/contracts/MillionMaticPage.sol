// SPDX-License-Identifier: GPL 3
/**
* @title MillionMaticPage
* @author Giorgio Sanfilippo, Riccardo Molinari, Davide Mele, Maurizio Custodi
* @notice 
* @dev ContractDescription
* @custom:dev-run-script file_path
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

	string private baseURI;

	// EVENTS
	event minted(address indexed _from, uint256 indexed _tokenId);
	event tokenURISetted(address indexed _from, uint256 indexed _tokenId, string _tokenURI);

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

	function _baseURI() internal view override returns (string memory) {
		return baseURI;
	}


	function ourMint(uint256 tokenId) public payable {
		require(msg.value > 0, "The price is too low");

		_safeMint(msg.sender, tokenId);
		mintedNFTs.push(tokenId);

		emit minted(msg.sender, tokenId);

	}

	// Inibiamo la burn per scelta progettuale
	function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
		//super._burn(tokenId);
		require(false, "Burn is not allowed");
	}

	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

/*
	function getTokenURIsOfMintedNFTs() public view returns (string[] memory) {
		string[] memory result;

		for (uint i = 0; i < mintedNFTs.length; i++) {
				result[i] = tokenURI(mintedNFTs[i]);
		}

		return result;
	}
*/


	function getAllMintedNFTs() public view returns (uint256[] memory) {
		return mintedNFTs;
	}

	function getAllMintedTokenURI() public view returns (string[] memory) {

		string[] memory res = new string[](mintedNFTs.length);

		for (uint i = 0; i < mintedNFTs.length; i++) {
			res[i] = tokenURI(mintedNFTs[i]);
		}

		return res;
	}

	function getAllOwnerOfMintedNFTs() public view returns (address[] memory) {

		address[] memory res = new address[](mintedNFTs.length);

		for (uint i = 0; i < mintedNFTs.length; i++) {
			res[i] = ownerOf(mintedNFTs[i]);
		}

		return res;
	}

	function getIntervalAllOwnerOfMintedNFTs(uint256 startIndex, uint256 endIndex) public view returns (address[] memory) {
		
		require(startIndex < endIndex, "startIndex >= endIndex");
		require(endIndex <= mintedNFTs.length, "endIndex > mintedNFTs.length");
		uint256 length = (endIndex - startIndex)+1;

		address[] memory res = new address[](length);

		for (uint i = startIndex; i < endIndex; i++) {
			res[i] = ownerOf(mintedNFTs[i]);
		}

		return res;
	}

	function getIntervalMintedTokenURI(uint256 startIndex, uint256 endIndex) public view returns (string[] memory) {

		require(startIndex < endIndex, "startIndex >= endIndex");
		require(endIndex <= mintedNFTs.length, "endIndex > mintedNFTs.length");
		uint256 length = (endIndex - startIndex)+1;

		string[] memory res = new string[](length);

		for (uint i = startIndex; i < endIndex; i++) {
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

		emit tokenURISetted(msg.sender, tokenId, _tokenURI);
		return true;
	}


	function withdrawBalance() public onlyOwner returns (bool) {

		uint256 balance = address(this).balance;
		(bool sent, bytes memory data) = (msg.sender).call{value: balance}("");
		require(sent, "Failed to send Ether");
		return true;

	}

	// INTERNAL
	function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual override {
		super._setTokenURI(tokenId, _tokenURI);
	}

	function setBaseURI(string memory _newBaseURI) public onlyOwner{
		baseURI = _newBaseURI;
	}

}