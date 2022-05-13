// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundMe {

	uint public totalAmount;
	uint public currentAmount;
	bool public isSuccessful;
	bool public isSnatched;
	address payable user;
	
	constructor() payable {
		totalAmount = 10 ether;
		currentAmount = 0 ether;
		isSuccessful = false;
		isSnatched = false;
	}

    function fund() public payable {
        require(msg.value > 0);
		currentAmount += msg.value;
		if (currentAmount == totalAmount){
			isSuccessful = true;
		}
	}

    function refund(uint amount) public payable {
        require(amount > 0);
		require(amount <= currentAmount);
		user = payable(msg.sender);
        user.transfer(amount);
		currentAmount -= amount;
	}
	
	function snatch() public payable {
		user = payable(msg.sender);
        user.transfer(currentAmount);
		currentAmount = 0;
		totalAmount += 10 ether;
		isSuccessful = false;
		isSnatched = true;
	}
}
