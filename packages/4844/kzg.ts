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
  const blobs = getBlobs(messageToBlob);
  console.log(blobs[0].byteLength);

  // `blobsToCommitments``
  const commitment = kzg
    .blobToKzgCommitment(bytesToHex(blobs[0]))
    .toLowerCase();
  console.log(commitment);

  const blob_versioned_hashes = commitmentsToVersionedHashes(blobs);
  console.log(bytesToHex(blob_versioned_hashes[0]));
}

void main();
