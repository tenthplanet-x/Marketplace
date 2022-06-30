// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RXNFT is ERC721, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;


    /**
     * not include _max_tokenId
     */
    uint256 private _max_tokenId = 10000;

    uint256 private _mintPrice = 0.0001 ether;

    string private baseURI;
    string public baseExtension = ".json";

    constructor() ERC721("RXNFT", "RXNFT") {
    }

    function mint(uint256 tokenQuantity) public payable {

        require(
            _tokenIds.current() + tokenQuantity <= _max_tokenId,
            "Sale would exceed max supply"
        );

        require(
            msg.value >= tokenQuantity * _mintPrice,
            "Not enough ether sent"
        );

        _mint(tokenQuantity);
    }

    function _mint(uint256 tokenQuantity) internal {
        for (uint256 i = 0; i < tokenQuantity; i++) {
            uint256 newItemId = _tokenIds.current();
            require(newItemId < _max_tokenId, "Sale would exceed max supply");
            _safeMint(msg.sender, newItemId);
            _tokenIds.increment();
        }
    }

    function setMaxTokenId(uint256 maxTokenId) external onlyOwner {
        require(
            maxTokenId > _max_tokenId,
            "new max_tokenId max _max_tokenId"
        );
        _max_tokenId = maxTokenId;
    }



    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseU = _baseURI();
        return bytes(baseU).length > 0 ? string(abi.encodePacked(baseU, tokenId.toString(), baseExtension)) : "";
    }


    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setMintPrice(uint256 mintPrice) external onlyOwner {
        _mintPrice = mintPrice;
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) public onlyOwner {
        payable(msg.sender).transfer(amount);
    }
}
