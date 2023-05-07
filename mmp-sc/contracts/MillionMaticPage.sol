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
 * - getTokenURIsOfMintedNFTs() -> array of tokenURI
 * - getAltTextsOfMintedNFTs() -> array of tokenURI
 * - getWebURLssOfMintedNFTs() -> array of tokenURI
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

/*
    In NFT_x_y salviamo i tokenId degli NFT mintati. Il tokeID = 0 lo è di fatto non mintato, in quanto nel costruttore impostiamo _tokenIdCounter = 1
*/

contract MillionMaticPage is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // STATE VARs
    Counters.Counter private _tokenIdCounter;

    // 1 * decimals()
    uint256 constant price = 1;

    // Optional mapping for tokenId AlText
    mapping(uint256 => string) private _altTexts;
    // Optional mapping for tokenId WebURL
    mapping(uint256 => string) private _webURLs;
    // Mapping Row, Col con tokenID
    mapping(uint256 => mapping(uint256 => uint256)) private NFT_x_y;


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
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }

    function ourMint(uint256 row, uint256 col) public payable {
        require(msg.value > 0, "The price is too low");
        require(NFT_x_y[row][col] == 0, "NFT already minted");
       
        uint256 tokenId = _tokenIdCounter.current();

        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        NFT_x_y[row][col] = tokenId;

    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }


    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }


    function altText(uint256 tokenId) public view returns (string memory) {
        _requireMinted(tokenId);
        return _altTexts[tokenId];
    }

    function webURL(uint256 tokenId) public view  returns (string memory) {
        _requireMinted(tokenId);
        return  _webURLs[tokenId];
    }

    function setTokenURI(uint256 tokenId,  string memory imageUrl) public onlyNftOwner(tokenId) existsNFT(tokenId) {
        _setTokenURI(tokenId, imageUrl);
    }

    function setAltText(uint256 tokenId, string memory altText) public onlyNftOwner(tokenId) existsNFT(tokenId) {
        _altTexts[tokenId] = altText;
    }

    function setWebURL(uint256 tokenId, string memory webUrl) public onlyNftOwner(tokenId) existsNFT(tokenId) {
       _webURLs[tokenId] = webUrl;
    }

    /*
    TODO: 
    function _burn(uint256 tokenId) internal virtual override {
    }
    */

    // INTERNAL
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual override {
        super._setTokenURI(tokenId, _tokenURI);
    }

}