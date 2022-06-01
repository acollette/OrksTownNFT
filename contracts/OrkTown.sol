//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OrkTown is ERC721A, ERC2981, Ownable {

    string public collectionURI;
    uint96 public maxMint;
    uint256 public maxSupply;
    string private OpenseaContractURI;

    constructor(uint96 _royaltyFeesInBips, string memory _contractURI, uint96 _maxMint, uint256 _maxSupply, string memory _openseaContractURI) ERC721A("Orks", "ORK") {
        setRoyaltyInfo(msg.sender, _royaltyFeesInBips);
        collectionURI = _contractURI;
        maxMint = _maxMint;
        maxSupply = _maxSupply;
        OpenseaContractURI = _openseaContractURI;

    }

    function mint (uint256 quantity) external payable {
        require(quantity <= maxMint, "Max amount per mint exceeded");
        require((totalSupply() + quantity) <= maxSupply );
        _safeMint(msg.sender, quantity);
    }

    function _startTokenId() internal view override returns (uint256){
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

    function supportsInterface (bytes4 interfaceId) public view override (ERC721A, ERC2981) returns (bool){
        return 
            interfaceId == type(IERC2981).interfaceId || 
            interfaceId == 0x01ffc9a7 || // ERC165 interface ID for ERC165.
            interfaceId == 0x80ac58cd || // ERC165 interface ID for ERC721.
            interfaceId == 0x5b5e139f;  // ERC165 interface ID for ERC721Metadata.
    }

    function setRoyaltyInfo (address _receiver, uint96 _feeNumerator) public onlyOwner {
        _setDefaultRoyalty(_receiver, _feeNumerator) ;
    }

    function setContractURI (string calldata _contractURI) external onlyOwner {
        collectionURI = _contractURI;
    }

    function contractURI() public view returns (string memory) {
        return OpenseaContractURI;
    }


}
