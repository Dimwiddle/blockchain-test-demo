// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract MyContract {
    mapping (address => uint) public accountBalances;

    receive() external payable {
        accountBalances[msg.sender] += msg.value;
    }

    function getAccountBalances(address accountAddress) external view returns (uint256){
        return accountBalances[accountAddress];
    }
}