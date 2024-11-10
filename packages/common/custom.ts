import { Common, createCustomCommon, Mainnet } from "@ethereumjs/common"
import { createBlob4844Tx, TransactionType, TxData } from '@ethereumjs/tx'
import { bytesToHex } from '@ethereumjs/util'
import { trustedSetup } from '@paulmillr/trusted-setups/fast.js'
import { TransactionRequest, Wallet } from 'ethers'
import { ethers } from 'ethers'
import { KZG as microEthKZG } from 'micro-eth-signer/kzg'


async function main() {
    const kzg = new microEthKZG(trustedSetup)
    const customCommon = createCustomCommon(
        {
          name: 'my-network',
          chainId: 1,
          url:"https://ethereum-mainnet.g.allthatnode.com/full/evm/5da65013a9004d8da1983f17cae83366",
        },
        Mainnet,
        {
            customCrypto:{kzg}
        }
      )
    
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
    
      const tx = createBlob4844Tx(txData, { common:customCommon })
      const a = tx.getDataGas()

      
      console.log(tx.getEffectivePriorityFee(0n));
      console.log(tx.maxFeePerGas);
      console.log(tx.maxPriorityFeePerGas);
      console.log(tx.maxFeePerBlobGas);
}

void main()