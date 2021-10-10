import { StringLiteralLike } from "typescript";
import * as CryptoJS from "crypto-js";

class Block {
    public index:number;
    public hash: string;
    public previousHash:string;
    public data:string;
    public timestamp: number;

    static calculateBlockHash = (index:number, previousHash:string, timestamp:number, data:string ) : string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    // this is static method, so you can use this without any Block instance



    constructor(index:number, hash:string, previousHash:string, data:string, timestamp:number){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;        
    }
}

const genesisBlock:Block = new Block(0, "2020202020220202","","Hello",123456);

let blockchain: Block[] = [genesisBlock]; // this type is array of Block 

const getBlockchain = () : Block[] => blockchain;
const getLatestBlock = () : Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block => {
    const previosBlock: Block = getLatestBlock();
    const newIndex: number = previosBlock.index + 1;
    const newTimestamp : number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(newIndex, previosBlock.hash, newTimestamp, data);

    const newBlock : Block = new Block(newIndex, newHash, previosBlock.hash, data, newTimestamp);
    return newBlock;
}

console.log(createNewBlock("Hello"), createNewBlock("bye bye"));

export {}; // what is it? s