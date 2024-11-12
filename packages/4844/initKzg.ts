import {
  Common,
  createCustomCommon,
  Hardfork,
  Mainnet,
  Sepolia,
} from "@ethereumjs/common";
import { createBlob4844Tx, TransactionType, TxData } from "@ethereumjs/tx";
import { trustedSetup } from "@paulmillr/trusted-setups/fast.js";
import { KZG as microEthKZG } from "micro-eth-signer/kzg";
import { init } from "../common/common";
import { ethers, hexlify, toBeHex, Transaction } from "ethers";
import { bytesToHex, stripHexPrefix } from "@ethereumjs/util";
import axios from "axios";

const main = async () => {
  try {
    const { provider, signer } = init();
    const { chainId } = await provider.getNetwork();

    const kzg = new microEthKZG(trustedSetup);

    // Instantiate `common`
    // const common = new Common({
    //   chain: Sepolia,
    //   hardfork: Hardfork.Cancun,
    //   customCrypto: { kzg },
    // });
    const common = createCustomCommon(
      {
        name: 'my-network',
        chainId: Number(chainId),
      },
      Mainnet,
      {
          customCrypto:{kzg}
      }
    )

    const nonce = await provider.getTransactionCount(signer.address);
    console.log("signer address: " + signer.address);
    console.log("nonce: " + nonce);

    const { maxFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData();

    const txData: TxData[TransactionType.BlobEIP4844] = {
      data: "0x",
      gasLimit: 800000,
      maxPriorityFeePerGas: maxPriorityFeePerGas!,
      maxFeePerGas: maxFeePerGas!,
      maxFeePerBlobGas: 1,
      nonce: nonce,
      to: "0xd644352a429f3ff3d21128820dcbc53e063685b1",
      // value: '0x0186a0',
      // v: '0x01',
      // r: '0xafb6e247b1c490e284053c87ab5f6b59e219d51f743f7a4d83e400782bc7e4b9',
      // s: '0x479a268e0e0acd4de3f1e28e4fac2a6b32a4195e8dfa9d19147abe8807aa6f64',
      chainId: chainId,
      // accessList: [],
      type: "0x03",
      blobsData: ["hello blob"],
    };

    const tx = createBlob4844Tx(txData, { common });
    console.log(2);

    console.log(tx.maxFeePerGas);
    console.log(tx.maxPriorityFeePerGas);
    console.log(tx.maxFeePerBlobGas);
    console.log(tx.nonce);
    console.log(tx.chainId);

    const pk = Buffer.from(stripHexPrefix(signer.privateKey), "hex");
    const a = tx.sign(pk);
    console.log(a.s);
    console.log(a.v);
    console.log(a.r);

    console.log(a.getSenderAddress().toString());
    console.log(a.verifySignature());
    console.log(a.isValid());
    const wrapper = a.serializeNetworkWrapper();
    // // console.log(bytesToHex(wrapper));

    // return

    // const parse = Transaction.from()
    // console.log(parse);

    // return

    // const response = await axios.post(
    //   "https://eth-sepolia.g.alchemy.com/v2/U46b9-ML7nce-EYa_1rF8fcUSOpJxGa2",
    //   {
    //     jsonrpc: "2.0",
    //     method: "eth_sendRawTransaction",
    //     params: [bytesToHex(wrapper)],
    //     id: 1,
    //   }
    // );

    // console.log(response);

    const res = await provider.broadcastTransaction(bytesToHex(wrapper))
    const receipt = await res.wait()
    console.log(receipt);

    //   console.log(bytesToHex(tx.hash())) //0x3c3e7c5e09c250d2200bcc3530f4a9088d7e3fb4ea3f4fccfd09f535a3539e84
  } catch (error: any) {
    console.log(error);
  }
};

void main();
