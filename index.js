const SHA256 = require('crypto-js/sha256');

class CryptoBlock{
  constructor(index, timestamp, data, precedingHash=" "){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }
  computeHash(){
    return SHA256(
      this.index +
      this.precedingHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce
    ).toString();
  }
  proofOfWork(difficulty){
    while(this.hash.substring(0,difficulty)!=Array(difficulty+1).join("0")){
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}
class CryptoBlockChain{
  constructor(){
    this.blockchain = [this.startInitialBlock()];
    this.difficulty = 4;
  }
  startInitialBlock(){
    return new CryptoBlock(0,"25/05/2023","Initial block in the chain","0");
  }
  addNewBlock(newBlock){
    newBlock.precedingHash = this.lastBlock().hash;
    // newBlock.hash = newBlock.computeHash();
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }
  lastBlock(){
    return this.blockchain[this.blockchain.length-1];
  }
  checkChainValidity(){
    for(let i=1;i<this.blockchain.length;i++){
      const currentBlock = this.blockchain[i];
      const precedingBlock  = this.blockchain[i-1];

      if(currentBlock.hash!=currentBlock.computeHash()){
        return false;
      }
      if(currentBlock.precedingHash!==precedingBlock.hash){
        return false;
      }
    }
    return true;
  }
}
let smashingCoin = new CryptoBlockChain();
smashingCoin.addNewBlock(
  new CryptoBlock(1,"26/05/2023",{
    sender:" Nagaraju chary",
    recipient: "chary",
    amount: 50
  })
);

smashingCoin.addNewBlock(new CryptoBlock(2,"27/05/2023",
{
  sender: "manasa",
  recipient: "shanlar",
  amount: 100,
}))

smashingCoin.addNewBlock(new CryptoBlock(3,"28/05/2023",
{
  sender:"veera",
  recipient: "anu",
  amount: 2000,
}))

console.log("checking validity");
console.log(smashingCoin.checkChainValidity());n
smashingCoin.blockchain[2].data.sender="vhebhbr"
console.log("checking validity after changing values");
console.log(smashingCoin.checkChainValidity());