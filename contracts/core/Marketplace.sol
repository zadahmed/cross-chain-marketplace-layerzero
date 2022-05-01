// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../LZ/NonblockingLzApp.sol";
import "hardhat/console.sol";
import "../interfaces/ILayerZeroReceiver.sol";

contract TestMarketplace is NonblockingLzApp {

    uint public counter;
    ILayerZeroEndpoint public endpoint;


    // Endpoint.sol estimateFees() returns the fees for the message
    function estimateFees(
        uint16 _dstChainId,
        address _userApplication,
        bytes calldata _payload,
        bool _payInZRO,
        bytes calldata _adapterParams
    ) external view returns (uint256 nativeFee, uint256 zroFee) {
        return
            endpoint.estimateFees(
                _dstChainId,
                _userApplication,
                _payload,
                _payInZRO,
                _adapterParams
            );
    }

    constructor(address _lzEndpoint) NonblockingLzApp(_lzEndpoint) {
        endpoint = ILayerZeroEndpoint(_lzEndpoint);
    }

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory) internal override {
        counter += 1;
    }

    function incrementCounter(uint16 _dstChainId) public payable {
        _lzSend(_dstChainId, bytes("Hello"), payable(msg.sender), 0xb4df72B301340f09E818a02325C781d318904d3F, bytes(""));
    }
}