import { Common, Hardfork, Mainnet } from '@ethereumjs/common'
import { createBlob4844Tx, TransactionType, TxData } from '@ethereumjs/tx'
import { bytesToHex } from '@ethereumjs/util'
import { trustedSetup } from '@paulmillr/trusted-setups/fast.js'
import { KZG as microEthKZG } from 'micro-eth-signer/kzg'
import { TransactionRequest, Wallet } from 'ethers'
import { ethers } from 'ethers'

const main = async () => {
  const kzg = new microEthKZG(trustedSetup)

  // Instantiate `common`
  const common = new Common({
    chain: Mainnet,
    hardfork: Hardfork.Cancun,
    customCrypto: { kzg },
  })



//   const txHash = "0x9c1fbda4f649ac806ab0faefbe94e1a60282eb374ead6aa01bac042f52b28a8c"
//   const blobTx = await provider.getTransaction(txHash)
//   console.log(blobTx);
  console.log("signer address: "+signer.address);
  
//   const tt: TransactionRequest= {
//     type:TransactionType.BlobEIP4844,
//     blobs:
//   }
//   const fee = await provider.getFeeData()

  const txData:TxData[TransactionType.BlobEIP4844] = {
    // data: '0x',
    // gasLimit: '0x02625a00',
    // maxPriorityFeePerGas: '0x01',
    // maxFeePerGas: '0xff',
    // nonce: '0x00',
    to: '0xcccccccccccccccccccccccccccccccccccccccc',
    // value: '0x0186a0',
    // v: '0x01',
    // r: '0xafb6e247b1c490e284053c87ab5f6b59e219d51f743f7a4d83e400782bc7e4b9',
    // s: '0x479a268e0e0acd4de3f1e28e4fac2a6b32a4195e8dfa9d19147abe8807aa6f64',
    // chainId: '0x01',
    // accessList: [],
    // type: '0x05',
    blobsData: ['abcd'],
  }

  const tx = createBlob4844Tx(txData, { common })

  console.log(tx.maxFeePerGas);
  console.log(tx.maxPriorityFeePerGas);
  console.log(tx.maxFeePerBlobGas);
  tx.nonce
  
//   console.log(bytesToHex(tx.hash())) //0x3c3e7c5e09c250d2200bcc3530f4a9088d7e3fb4ea3f4fccfd09f535a3539e84
}

void main()