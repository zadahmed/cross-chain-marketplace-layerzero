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
        _lzSend(_dstChainId, bytes("Hello"), payable(msg.sender), 0xb4df72B301340f09E818a02325C781d318904d3F, bytes(""));
    }
}