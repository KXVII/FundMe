# Instructions on deployment

### Environment configuration

Please install `React`, `truffle`, `ganachem`, `web3` and `MetaMask` plug on Chrome.

### Deployment

1. Clone the repository.

2. Create a new project in ganache and import truffle-config.js in the root directory.

3. Open the terminal window in the root directory and run `truffle migrate`.

4. Open MetaMask on Chrome and import several accounts from ganache with private keys.

5. Connect the MetaMask wallet with the network with the RPC server http://127.0.0.1:7545.

6. Copy the deployed FundMe contract address in ganache to substitute the address variable in line 6 of `src/contract.js` and save.

7. Input `npm install`, and then `npm start` to start the webpage.

8. Make sure the accounts connected to the webpage.

9. When you see correct address on the webpage, that means you are all set.# FundMe
