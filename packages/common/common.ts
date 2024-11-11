import { ethers } from "ethers";
import dotenv from 'dotenv'
dotenv.config()

export const init = () => {
    if (!process.env.PROVIDER_URL) throw new Error('PROVIDER_URL is required');
    if (!process.env.SIGNER_PK) throw new Error('SIGNER_PK is required');
  
    const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URL);
    const signer = new ethers.Wallet(process.env.SIGNER_PK, provider);
  
    return {
      provider,
      signer
    };
  };