import Web3 from 'web3';

export async function connect() {
    if (!window.ethereum) {
        alert("Get MetaMask!");
        return;
    }

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
}

export function getAddress() {
    var account = '';
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        account = window.ethereum.selectedAddress;
        if (typeof account === 'undefined' || account == null) {
            account = '';
        }
    }
    // var buffer = _malloc(lengthBytesUTF8(account) + 1);
    // stringToUTF8(account, buffer, account.length + 1);
    // return buffer;
    return account;
}

export async function checkIfWalletIsConnected(onConnected) {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length > 0) {
            const account = accounts[0];
            onConnected(account.toLowerCase());
            return;
        }
    }
}

export async function checkIfWalletIsConnected2() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        if (accounts.length > 0) {
            const account = accounts[0];
            return account.toLowerCase();
        }
    }
    return "";
}