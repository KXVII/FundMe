import { abi } from "./abi";
import Web3 from "web3";

var web3;
var contract;
const contractAddress = "0xBc0D28B66751fc49225071A58c70daEDa3C2b40b";


const checkCompatible = async () => {
  if (window.ethereum || window.web3) {
    web3 = new Web3(window.web3.currentProvider);
    contract = new web3.eth.Contract(abi, contractAddress);
    try {
      await window.ethereum.enable();
    } catch (error) {
    }
  }
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
    return false;
  }
  return true;
};


const total = async () => {
  let result = await contract.methods
    .totalAmount()
    .call((error, result) => result);
  return web3.utils.fromWei(result, "ether");
};


const current = async () => {
  let result = await contract.methods
    .currentAmount()
    .call((error, result) => result);
  return web3.utils.fromWei(result, "ether");
};


const success = async () => {
  let result = await contract.methods
    .isSuccessful()
    .call((error, result) => result);
  return result;
};

const snatched = async () => {
  let result = await contract.methods
    .isSnatched()
    .call((error, result) => result);
  return result;
};


const account = async () => {
  return window.ethereum.selectedAddress;
};


const fund = (amount) => {
  let amountWei = web3.utils.toWei(amount.toString(), "ether");
  contract.methods
    .fund()
    .send({
      from: window.ethereum.selectedAddress,
	  to: contractAddress,
      value: amountWei,
      gas: 3000000,
    })
    .then(() => console.log("Successfully funded!"));
};


const refund = (amount) => {
  let amountWei = web3.utils.toWei(amount.toString(), "ether");
  contract.methods
    .refund(amountWei)
    .send({
	  from: window.ethereum.selectedAddress,
	  to: contractAddress,
      gas: 3000000,
    })
    .then(() => console.log("Successfull withdrawal!"));
};

const snatch = () => {
	contract.methods.snatch()
	.send({
	  from: window.ethereum.selectedAddress
    })
};


const fundContract = {
  total,
  fund,
  success,
  snatched,
  account,
  current,
  refund,
  snatch,
  checkCompatible,
};

export default fundContract;
