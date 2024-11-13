<div align="center">
<h1 style="border-bottom: none;"> Blob Carrying Transactions </h1>
</div>

## Intro
이더리움은 현재 4가지 type의 transaction이 정의되어 있다. 그리고 transaction을 전달받는 블록체인 노드(네트워크)가 이를 구분하기 위해 이더리움은 EIP-2718를 도입하여 transaction 별로 type을 지정했다. type은 RLP 인코딩 단계에서 가장 앞단에 배치되며, 네트워크는 디코딩 단계에서 이를 통해 transaction을 구분할 수 있게 됬다. 그리고 이더리움의 덴쿤 업그레이드(2024-3-13)에서 EIP-4844가 
도입되며, type `0x03`을 지정받은 **Blob Carrying Transactions**이 새로 등장한다.

</br>


## What is Blob?
Blob Carrying Transactions은 Blob을 작성할 수 있는 새로운 필드(field)가 포함된 트랜잭션 형식(format)을 갖추고 있다.여기서 **`Blob`** 이란 **“다수의 데이터가 압축된 데이터” 를 저장하기 위해 암호학적으로 설계된 “저장 공간”** 이다. 그리고 이더리움은 **KZG Polynomial Commitments Scheme(이하 KZG)** 을 활용하여 Blob에 저장된 “다수의 데이터가 압축된 데이터”에 “특정 데이터”가 포함되었는지 검증 할 수 있다.

</br>

<div align="center">
    <img src="./img/blob_carrying_transactions_1.png" width="80%"> 
</div>
Blob은 하나당 32 bytes의 용량를 갖는 4096개의 필드로 구성되어 있다. 즉, 1 Blob에 최대 131,072 bytes (4096 &times 32 bytes  ≈ 128kB)의 용량(blobSize)를 수용할 수 있게 설계됬다.

</br>

<div align="center">

```
0 <= x < 52435875175126190479447740508185965837690552500527637822603658699938581184513
```

</div>

각 필드에는 위에 보이는 범위 내의 데이터만 저장할수 있다. 그 이유는 암호학적으로 검증하기 위해 사용하는 KZG가 타원곡선의 종류 중 하나인 BLS12–381를 사용하기 때문이다. 여기서 x의 최대값인 *5243…4513* 는 BLS12–381의 Field element (또는 modulus)이다.

> [!NOTE]
> KZG Polynomial Commitments Scheme의 암호학적 원리와 자세한 내용은 다음 시리즈에서 자세히 다룰것이며, 
> 지금은 Blob이 갖는 데이터 압축 능력과 증명 기능을 위해 사용하는 암호학이라고 생각하고 넘어가자.

</br>

```Typescript
import { getBlobs } from "@ethereumjs/util";
const messageToBlob = "Hello 4844";
const blob = getBlobs(messageToBlob)[0];
```

이더리움은 Blob을 롤업 체인들이 제공하는 데이터를 효율적으로 저장하기 위해 새롭게 만든 “저장 공간”이다. 하지만, 롤업 데이터 외에도 데이터를 압축하고 증명이 필요한 경우 언제든지 활용할 수 있다. 
예를 들어 `"Hello 4844"`라는 메시지를 Blob에 저장한다고 하면 문자열을 16진수로 변환한 후, 남은 공간(최대 131,072 bytes)을 zero padding 처리한다.

</br>

```Typescript
import { trustedSetup } from "@paulmillr/trusted-setups/fast.js";
import { KZG as microEthKZG } from "micro-eth-signer/kzg";

// kzg library
const kzg = new microEthKZG(trustedSetup);
const commitment = kzg.blobToKzgCommitment(bytesToHex(blobs)).toLowerCase();
```

`Commitment`는 KZG 암호학을 사용하여 Blob 원본를 압축한 데이터를 의미하며, 131,072 bytes 크기의 Blob 하나당 48 bytes 크기의 Commitment가 생성된다.
