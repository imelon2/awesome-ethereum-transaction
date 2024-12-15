import { JsonRpcProvider, keccak256, parseEther, parseUnits, TransactionRequest, Wallet } from "ethers"
import dotenv from "dotenv"
import { RLP } from "micro-eth-signer/rlp"
import { decodeRlp } from "ethers"
dotenv.config()

async function main() {
    const porivder = new JsonRpcProvider(process.env.PROVIDER_URL)
    
    const wallet = new Wallet(process.env.SIGNER_PK!,porivder) //0xd644352A429F3fF3d21128820DcBC53e063685b1
    
    const data : TransactionRequest = {
        type:0,
        to:"0xd644352A429F3fF3d21128820DcBC53e063685b1",
    }
    
    const parseTx = await wallet.populateTransaction(data)
    console.log(parseTx);
    console.log();
    const signed = await wallet.signTransaction(parseTx)
    console.log(signed);
    console.log();
    const arr = decodeRlp(signed)
    console.log(arr);
    
    const hash = keccak256(signed)
    console.log(hash);
    
    const res = await wallet.sendTransaction(parseTx)
    const receipt = await res.wait()
    console.log(receipt);
    
}

void main()