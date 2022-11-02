import { transactions, codec, cryptography } from "@liskhq/lisk-client";
import { fetchAccountInfo } from "./liskUserData";
import { baseAssetSchema } from "./liskCommon";
import { objects } from '@liskhq/lisk-utils';
import { getFullAssetSchema,calcMinTxFee } from "./liskCommon";

export async function getMarketNfts(category) {
    return fetch("http://localhost:8080/api/nft_tokens")
    .then((res) => res.json())
    .then((res) => res.data);
}

export async function getMarketNftsByID(id) {
    return fetch(`http://localhost:8080/api/nft_tokens/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

  
export const fetchNodeInfo = async () => {
  return fetch("http://localhost:4000/api/node/info")
    .then((res) => res.json())
    .then((res) => res.data);
};


export const sendTransactions = async (tx) => {
  return fetch("http://localhost:4000/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tx),
  })
    .then((res) => res.json())
    .then((res) => res.data)
};

export const purchaseNFTTokenSchema = {
    $id: "lisk/nft/purchase",
    type: "object",
    required: ["nftId", "purchaseValue"],
    properties: {
      nftId: {
        dataType: "bytes",
        fieldNumber: 1,
      },
      purchaseValue: {
        dataType: "uint64",
        fieldNumber: 2,
      },
      name: {
        dataType: "string",
        fieldNumber: 3,
      },
    },
};

export const purchaseNFTToken = async ({
    name,
    nftId,
    purchaseValue,
    passphrase,
    fee,
    networkIdentifier,
    minFeePerByte,
  }) => {
    const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
      passphrase
    );
    
    const address = cryptography.getAddressFromPassphrase(passphrase);
  
    console.log(networkIdentifier);
    const {
      sequence: { nonce },
    } = await fetchAccountInfo(address.toString("hex"));
    const { id, ...rest } = transactions.signTransaction(
      purchaseNFTTokenSchema,
      {
        moduleID: 1024,
        assetID: 1,
        nonce: BigInt(nonce),
        fee: BigInt(transactions.convertLSKToBeddows(fee)),
        senderPublicKey: publicKey,
        asset: {
          name,
          nftId: Buffer.from(nftId, "hex"),
          purchaseValue: BigInt(transactions.convertLSKToBeddows(purchaseValue)),
        },
      },
      Buffer.from(networkIdentifier, "hex"),
      passphrase
    );
  
    return {
      id: id.toString("hex"),
      tx: codec.codec.toJSON(getFullAssetSchema(purchaseNFTTokenSchema), rest),
      minFee: calcMinTxFee(purchaseNFTTokenSchema, minFeePerByte, rest),
    };
  };
  
export const sellNFTSchema = {
    $id: "lisk/nft/sell",
    type: "object",
    required: ["nftId", "minPurchaseMargin"],
    properties: {
      nftId: {
        dataType: "bytes",
        fieldNumber: 1,
      },
      minPurchaseMargin: {
        dataType: "uint32",
        fieldNumber: 2,
      },
      name: {
        dataType: "string",
        fieldNumber: 3,
      },
    },
  };
export const sellNFTToken = async ({
    name,
    nftId,
    minPurchaseMargin,
    passphrase,
    fee,
    networkIdentifier,
    minFeePerByte,
  }) => {
const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
passphrase
);
const address = cryptography.getAddressFromPassphrase(passphrase);

const {
sequence: { nonce },
} = await fetchAccountInfo(address.toString("hex"));

const { id, ...rest } = transactions.signTransaction(
sellNFTSchema,
{
moduleID: 1024,
assetID: 3,
nonce: BigInt(nonce),
fee: BigInt(transactions.convertLSKToBeddows(fee)),
senderPublicKey: publicKey,
asset: {
name,
nftId: Buffer.from(nftId, "hex"),
minPurchaseMargin: parseInt(minPurchaseMargin),
},
},
Buffer.from(networkIdentifier, "hex"),
passphrase
);

return {
id: id.toString("hex"),
tx: codec.codec.toJSON(getFullAssetSchema(sellNFTSchema), rest),
minFee: calcMinTxFee(sellNFTSchema, minFeePerByte, rest),
};
};
