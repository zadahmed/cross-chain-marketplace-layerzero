// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../LZ/NonblockingLzApp.sol";
import "hardhat/console.sol";

contract TestMarketplace is NonblockingLzApp {

    uint public counter;

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {}

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory) internal override {
        counter += 1;
    }

    function incrementCounter(uint16 _dstChainId) public payable {
        _lzSend(_dstChainId, bytes(""), payable(msg.sender), address(0x0), bytes(""));
    }
}