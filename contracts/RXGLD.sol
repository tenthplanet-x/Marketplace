// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RXGLD is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("RXGLD", "RG") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address account, uint256 mount) public onlyOwner returns (bool)  {
        _mint(account, mount);
        return true;
    }

    event Log(string func, address sender, uint256 value, bytes data);


    receive() external payable {
        emit Log("receive", msg.sender, msg.value, "");
    }

    fallback() external payable {
        emit Log("fallback", msg.sender, msg.value, msg.data);
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    }

    function withdraw1(uint256 amount) public onlyOwner {
        payable(msg.sender).transfer(amount);
    }

    function withdraw2(uint256 amount) public onlyOwner {
        bool done = payable(msg.sender).send(amount);
        require(done, "send failed");
    }

    function withdraw3(uint256 amount) public onlyOwner {
        (bool done,) = msg.sender.call{value: amount}("");
        require(done, "call failed");
    }

}