// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../interfaces/ILayerZeroEndpoint.sol";
import "../interfaces/ILayerZeroReceiver.sol";
import "hardhat/console.sol";

contract TestMarketplace is ILayerZeroReceiver {

    event ReceiveMsg(
        uint16 _srcChainId,
        address _from,
        uint16 _count,
        bytes _payload
    );

    ILayerZeroEndpoint public endpoint;
    uint16 public messageCount;
    bytes public message;

    constructor(address _endpoint) {
        endpoint = ILayerZeroEndpoint(_endpoint);
    }

    function sendMsg(
        uint16 _dstChainId,
        bytes calldata _destination,
        bytes calldata payload
    ) public payable {
        endpoint.send{value: msg.value}(
            _dstChainId,
            _destination,
            payload,
            payable(msg.sender),
            address(this),
            bytes("")
        );
    }

    function lzReceive(
        uint16 _srcChainId,
        bytes memory _from,
        uint64,
        bytes memory _payload
    ) external override {
        require(msg.sender == address(endpoint));
        address from;
        assembly {
            from := mload(add(_from, 20))
        }
        if (
            keccak256(abi.encodePacked((_payload))) ==
            keccak256(abi.encodePacked((bytes10("ff"))))
        ) {
            endpoint.receivePayload(
                1,
                bytes(""),
                address(0x0),
                1,
                1,
                bytes("")
            );
        }
        message = _payload;
        messageCount += 1;
        emit ReceiveMsg(_srcChainId, from, messageCount, message);
    }

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
    
}