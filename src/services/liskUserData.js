import { transactions, codec, cryptography } from "@liskhq/lisk-client";
import { getFullAssetSchema,calcMinTxFee } from "./liskCommon";

// blockapi - localhost:4000
var blockapi='https:blockapi.volaverse.com/block'

export const fetchAccountInfo = async (address) => {
    return fetch(blockapi+`/api/accounts/${address}`)
      .then((res) => res.json())
      .then((res) => res.data);
};

export async function checkIfUserIsConnected() {
    if (localStorage.getItem("address")){
        return true;
    }else{
        return false;
    }
}

export const transferAssetSchema = {
    $id: "lisk/transfer-asset",
    title: "Transfer transaction asset",
    type: "object",
    required: ["amount", "recipientAddress", "data"],
    properties: {
      amount: {
        dataType: "uint64",
        fieldNumber: 1,
      },
      recipientAddress: {
        dataType: "bytes",
        fieldNumber: 2,
        minLength: 20,
        maxLength: 20,
      },
      data: {
        dataType: "string",
        fieldNumber: 3,
        minLength: 0,
        maxLength: 64,
      },
    },
  };


export const transferFunds = async ({
    recipientAddress,
    amount,
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
    const recipient = cryptography.getAddressFromBase32Address(recipientAddress);
    const { id, ...rest } = transactions.signTransaction(
      transferAssetSchema,
      {
        moduleID: 2,
        assetID: 0,
        nonce: BigInt(nonce),
        fee: BigInt(transactions.convertLSKToBeddows(fee)),
        senderPublicKey: publicKey,
        asset: {
          amount: BigInt(transactions.convertLSKToBeddows(amount)),
          recipientAddress: recipient,
          data: "",
        },
      },
      Buffer.from(networkIdentifier, "hex"),
      passphrase
    );
  
    return {
      id: id.toString("hex"),
      tx: codec.codec.toJSON(getFullAssetSchema(transferAssetSchema), rest),
      minFee: calcMinTxFee(transferAssetSchema, minFeePerByte, rest),
    };
  };
  