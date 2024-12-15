블록체인은 흔히 하나의 거대한 장부로 비유된다. 이는 전 세계에 분산된 노드들이 모두 동일한 데이터베이스를 공유하고 있기 때문이다. 블록체인 장부에 기록된 잔액, 계좌, 논스 등의 정보는 블록체인의 현재 상태(state)를 의미한다. 제네시스 블록(최초의 블록)의 상태부터 순서대로 블록이 추가 될때 마다 이전 상태에서 다음 상태로 계속 이동하는 과정이 블록체인의 매커니즘이다.</br>
특정 블록에 포함된 트랜잭션은 특정 블록 시점(block number)에서 발생한 이벤트를 뜻한다. 과거의 이벤트는 이전 블록 넘버에서 발생한 이벤트를 뜻하며, 앞으로 일어날 미래의 이벤트는 다음 블록 넘버에서 발생하는 이벤트이다. 즉, 블록체인의 시간 개념은 블록 단위이다.</br>
트랜잭션은 블록체인 네트워크에서 이더를 전송하거나 상태를 변경하는 데 사용되는 작업 단위를 의미한다. 트랜잭션은 이더리움 가상 머신 (EVM)에서 실행되며, 이더리움 네트워크의 노드들이 이를 검증하고 블록에 포함시킨다. 이 과정에서 트랜잭션은 이더리움 프로토콜에서 정해진 표준(규칙)에 따라 작성해야지만 노드에서 받아들인다. 이번 포스트를 통해 이더리움이 정한 트랜잭션 작성 방법과 과정에 대해 알아보고, 직접 코드로 구현하는 내용을 다뤄볼 예정이다.

## EIP-2718
> EIP-2718(opens in a new tab) is what allows for this behavior. Transactions are interpreted as: TransactionType || TransactionPayload<br/>
> 출처 이더리움 공식 org | https://ethereum.org/developers/docs/transactions#typed-transaction-envelope

이더리움의 Transaction은 크게 Transaction Type(이하 Type) 과Transaction Payload(이하 Payload)로 두가지 필드(field)로 구성되어 있으며, 일렬로 나열된 두 필드의 데이터를 RLP Encode하면 최종적인 Transaction이 된다. 