import { Common, Hardfork, Mainnet } from "@ethereumjs/common";
import {
  blobsToCommitments,
  bytesToHex,
  commitmentsToVersionedHashes,
  getBlobs,
} from "@ethereumjs/util";
import { trustedSetup } from "@paulmillr/trusted-setups/fast.js";
import { KZG as microEthKZG } from "micro-eth-signer/kzg";

async function main() {
  const kzg = new microEthKZG(trustedSetup);
  const common = new Common({
    chain: Mainnet,
    hardfork: Hardfork.Cancun,
    customCrypto: { kzg },
  });

  const messageToBlob = "Hello 4844"; // will convert to bytes to used `utf8ToBytes`
  const blob = getBlobs(messageToBlob)[0];
  console.log(`1 Blob data lenth: ${blob.byteLength}`);

  const blob_versioned_hashes = commitmentsToVersionedHashes(blob);
  console.log(`1 Blob versioned hash: ${bytesToHex(blob_versioned_hashes[0])}`);

  // `blobsToCommitments``
  const commitment = kzg
    .blobToKzgCommitment(bytesToHex(blob)).toLowerCase();
  console.log(`1 Blob kzg commitment: ${commitment}`);
  
  const proof = kzg.computeBlobProof(bytesToHex(blob),commitment)
  console.log(`1 Blob kzg proof: ${proof.toString()}`);
}

void main();
