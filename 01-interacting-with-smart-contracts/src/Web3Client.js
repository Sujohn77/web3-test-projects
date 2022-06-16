import NFTContractBuild from 'contracts/NFT.json';
import Web3 from 'web3';

let selectedAccount;

let nftContract;
let erc20Contract;

let isInitialized = false;

export const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
        provider
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                selectedAccount = accounts[0];
                console.log(`Selected account is ${selectedAccount}`);
            })
            .catch((err) => {
                console.log(err);
                return;
            });

        window.ethereum.on('accountsChanged', function (accounts) {
            selectedAccount = accounts[0];
            console.log(`Selected account changed to ${selectedAccount}`);
        });
    }

    const web3 = new Web3(provider);

    const networkId = await web3.eth.net.getId();

    nftContract = new web3.eth.Contract(NFTContractBuild.abi, NFTContractBuild.networks[networkId].address);

    // const erc20Abi = [
    //     {
    //         constant: true,
    //         inputs: [
    //             {
    //                 name: '_owner',
    //                 type: 'address',
    //             },
    //         ],
    //         name: 'balanceOf',
    //         outputs: [
    //             {
    //                 name: 'balance',
    //                 type: 'uint256',
    //             },
    //         ],
    //         payable: false,
    //         stateMutability: 'view',
    //         type: 'function',
    //     },
    // ];

    // erc20Contract = new web3.eth.Contract(
    //     erc20Abi,
    //     // Dai contract on bscsan
    //     '0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5'
    // );

    isInitialized = true;
};

export const getOwnBalance = async () => {
    if (!isInitialized) {
        await init();
    }

    return erc20Contract.methods
        .balanceOf(selectedAccount)
        .call()
        .then((balance) => {
            console.log(balance);
            return Web3.utils.fromWei(balance);
        });
};

export const mintToken = async () => {
    if (!isInitialized) {
        await init();
    }

    return nftContract.methods.mint(selectedAccount).send({ from: selectedAccount });
};
