import Web3 from 'web3';

const nftManagerAbi = `[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "closeSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "category",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			}
		],
		"name": "establish",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "startSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "onSale",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "category",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					}
				],
				"internalType": "struct NftManager.Detail",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "category",
				"type": "uint256"
			}
		],
		"name": "getNFTs",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "onSale",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "category",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "contractAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					}
				],
				"internalType": "struct NftManager.Detail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nfts",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "onSale",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "valid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "testforWorking",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
`;
const nftManagerContractAddress = "0xe248F26e92dbE612174aC3C5d6c3bB705Ef215bc";

export async function getApproval(contractAddress, ipfsHash, public_key) {
    const web3 = new Web3(window.ethereum);
    if (typeof web3 !== 'undefined') {
        console.log("getApproval |", contractAddress, ipfsHash, public_key);
        var nftContractAbi = await fetch("https://ipfs.io/ipfs/" + ipfsHash)
            .then((response) => { console.log(response); return response.json(); })
            .then((responseJson) => {
                return responseJson.output.abi;
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        console.log("getApproval | nftContractAbi:", nftContractAbi);

        var myContract = new web3.eth.Contract(nftContractAbi, contractAddress);
        const response = await myContract.methods.isApprovedForAll(public_key, nftManagerContractAddress)
            .call({
                from: window.web3.currentProvider.selectedAddress,
            });
        console.log("getApproval | result:", response);
        return response;
    } else {
        console.log("web3 not defined");
    }
}

export async function setApproval(contractAddress, ipfsHash, perm) {
    const web3 = new Web3(window.ethereum);
    console.log("heyyyyyyyyyyyyyyyyy");
    if (typeof web3 !== 'undefined') {
        console.log("heyyyyyyyyyyyyyyyyy");
        var nftContractAbi = await fetch("https://ipfs.io/ipfs/" + ipfsHash)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.output.abi;
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        console.log("setApproval | nftContractAbi:", nftContractAbi);

        var myContract = new web3.eth.Contract(nftContractAbi, contractAddress);

        console.log("setApproval | perm:", perm);
        var response = await myContract.methods
            .setApprovalForAll(nftManagerContractAddress, perm)
            .send({
                from: window.web3.currentProvider.selectedAddress,
                to: contractAddress,
            });
        console.log("setApproval | response:", response);
        return response;
    } else {
        console.log("web3 not defined");
    }
}

export async function getMarketNfts(category) {
    return fetch("http://localhost:4000/api/nft_tokens")
    .then((res) => res.json())
    .then((res) => res.data);
}

export async function getUserNfts(public_key, category) {
	var res=[];
	console.log("getUserResp " +res)
	return res;
    const web3 = new Web3(window.ethereum);
    if (typeof web3 !== 'undefined') {
        var abi = JSON.parse(nftManagerAbi);
        var myContract = new web3.eth.Contract(abi, nftManagerContractAddress);
        console.log("getUserNfts called");
        var category_type;
        if (category == "land") category_type = 0;
        else if (category == "wearable") category_type = 1;
        else if (category == "decoration") category_type = 2;
        else {
            console.log("category ", category, " not known!");
            return;
        }
        const response = await myContract.methods.getNFTs(category_type)
            .call({
                from: window.web3.currentProvider.selectedAddress,
            });
        console.log("getUserNfts recieved result:", response);
        const result = [];
        for (let i = 0; i < response.length; i++) {
            if (response[i][0].toLowerCase() == public_key) {
                result.push({
                    price: response[i][2],
                    onSale: response[i][1],
                    owner: response[i][0].toLowerCase(),
                    contractAddress: response[i][5],
                    tokenId: response[i][4],
                    category: category
                })
            }
        }
        console.log("result:", result);
        return result;
    } else {
        console.log("web3 not defined");
    }
}

export async function getSpecific(contractAddress, id) {
    const web3 = new Web3(window.ethereum);
    if (typeof web3 !== 'undefined') {
        var abi = JSON.parse(nftManagerAbi);
        var myContract2 = new web3.eth.Contract(abi, nftManagerContractAddress);
        const response2 = await myContract2.methods.getInfo(contractAddress, id)
            .call({
                from: window.web3.currentProvider.selectedAddress,
            });
        var category_type = response2[3];
        var category;
        if (category_type == 0) category = "land";
        else if (category_type == 1) category = "wearable";
        else if (category_type == 2) category = "decoration";
        else category = "fuck";
        console.log("getSpecific recieved result for getNFTs:", response2);
        const result = {
            // name: response[0],
            // category: response[1],
            // description: response[2],
            price: response2[2],
            onSale: response2[1],
            owner: response2[0].toLowerCase(),
            contractAddress: response2[5],
            tokenId: response2[4],
            category: category,
            ipfsHash: response2[6]
        }
        console.log("result:", result);
        return result;

        console.log("getSpecific | fetching abi");
        var nftContractAbi = await fetch("https://ipfs.io/ipfs/QmZXbYk8QeGiT8Tzw8ESygbRVv4Xg1nynciTYzv3DJ1agD")
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.output.abi;
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        console.log("nftContractAbi:", nftContractAbi);
        // var abi = JSON.parse(nftManagerAbi);
        var myContract = new web3.eth.Contract(nftContractAbi, contractAddress);
        const response = await myContract.methods.getMetaData()
            .call({
                from: window.web3.currentProvider.selectedAddress,
            });
        console.log("getSpecific recieved result for getMetaData:", response);

        for (let i = 0; i < response2.length; i++) {
            console.log(response2[i][5].toLowerCase(), contractAddress.toLowerCase(), response2[i][4], id);
            if (response2[i][5].toLowerCase() == contractAddress.toLowerCase() && response2[i][4] == id) {
                const result = {
                    name: response[0],
                    category: response[1],
                    description: response[2],
                    price: response2[i][2],
                    onSale: response2[i][1],
                    owner: response2[i][0].toLowerCase(),
                    contractAddress: response2[i][5],
                    tokenId: response2[i][4],
                    category: category
                }
                console.log("result:", result);
                return result;
            }
        }
        console.log("Not Found specific!!!");
        return;

    } else {
        console.log("web3 not defined");
    }
}

export async function getSpecific2(contractAddress, id) {
    const web3 = new Web3(window.ethereum);
    if (typeof web3 !== 'undefined') {
        var abi = JSON.parse(nftManagerAbi);
        var myContract2 = new web3.eth.Contract(abi, nftManagerContractAddress);
        const response2 = await myContract2.methods.getInfo(contractAddress, id)
            .call({
                from: window.web3.currentProvider.selectedAddress,
            });
        var category_type = response2[3];
        var category;
        if (category_type == 0) category = "land";
        else if (category_type == 1) category = "wearable";
        else if (category_type == 2) category = "decoration";
        else category = "none";
        console.log("getSpecific recieved result for getNFTs:", response2);
        const result = {
            // name: response[0],
            // category: response[1],
            // description: response[2],
            price: response2[2],
            onSale: response2[1],
            owner: response2[0].toLowerCase(),
            contractAddress: response2[5],
            tokenId: response2[4],
            category: category,
            ipfsHash: response2[6]
        }
        console.log("result:", result);
        return result;
    } else {
        console.log("web3 not defined");
    }
}

export async function startSale(contractAddress, tokenId, price) {
    const web3 = new Web3(window.ethereum);
    if (typeof web3 !== 'undefined') {
        var abi = JSON.parse(nftManagerAbi);
        var myContract = new web3.eth.Contract(abi, nftManagerContractAddress);
        var response = await myContract.methods
            .startSale(price, contractAddress, tokenId)
            .send({
                from: window.web3.currentProvider.selectedAddress,
                to: nftManagerContractAddress,
            });
        console.log("startSale | response:", response);
        return response;
    } else {
        console.log("web3 not defined");
    }
}

export async function closeSale(contractAddress, tokenId, price) {
    const web3 = new Web3(window.ethereum);
    if (typeof web3 !== 'undefined') {
        var abi = JSON.parse(nftManagerAbi);
        var myContract = new web3.eth.Contract(abi, nftManagerContractAddress);
        var response = await myContract.methods
            .closeSale(contractAddress, tokenId)
            .send({
                from: window.web3.currentProvider.selectedAddress,
                to: nftManagerContractAddress,
            });
        console.log("closeSale | response:", response);
        return response;
    } else {
        console.log("web3 not defined");
    }
}

export async function buyProduct(contractAddress, tokenId, price) {
    const web3 = new Web3(window.ethereum);
    if (typeof web3 !== 'undefined') {
        var abi = JSON.parse(nftManagerAbi);
        var myContract = new web3.eth.Contract(abi, nftManagerContractAddress);
        var response = await myContract.methods
            .purchase(contractAddress, tokenId)
            .send({
                from: window.web3.currentProvider.selectedAddress,
                to: nftManagerContractAddress,
                value: price
            });
        console.log("closeSale | response:", response);
        return response;
    } else {
        console.log("web3 not defined");
    }
}