//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NearFrens is ERC721A, Ownable {

    string private collectionURI;

    constructor() ERC721A("NearFrens", "FRENS") {
        _safeMint(msg.sender, 20);
    }

    function _startTokenId() internal pure override returns (uint256){
        return 1;
    }

    function _baseURI() internal view override returns (string memory){
        return collectionURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        string memory baseURI = _baseURI();

      
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenId),".json")) : '';   
    }

    function supportsInterface (bytes4 interfaceId) public view override (ERC721A) returns (bool){
        return 
            interfaceId == 0x01ffc9a7 || // ERC165 interface ID for ERC165.
            interfaceId == 0x80ac58cd || // ERC165 interface ID for ERC721.
            interfaceId == 0x5b5e139f;  // ERC165 interface ID for ERC721Metadata.
    }

    function setContractURI (string calldata _contractURI) external onlyOwner {
        collectionURI = _contractURI;
    }




}
