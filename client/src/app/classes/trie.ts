import {TrieNode} from './trie-node';
export class Trie {
    head: TrieNode;
    constructor(){
        this.head = new TrieNode("");
    }
    add(key, value){
        let runner = this.head;
        let keyLen = key.length;
        for(let i = 0; i < keyLen; i++){
            let nodeInNexts = false;
            for(let node of runner.nexts){
                if(node.char == key[i]){
                    nodeInNexts = true;
                    if(i == (keyLen-1)){
                        node.result = value;
                        break;
                    }
                    runner = node;
                    break
                }
            }
            if(!nodeInNexts){
                let newNode = new TrieNode(key[i]);
                if(i == (keyLen-1)){
                    newNode.result = value;
                }
                runner.nexts.push(newNode);
                runner = newNode;
            }
        }
    }
    contains(key: string){
        let runner = this.head;
        let keyLen = key.length;
        for(let i = 0; i  < keyLen; i++){
            let charContained = false;
            for(let node of runner.nexts){
                if(node.char.toLowerCase() == key[i].toLowerCase()){
                    if(i == (keyLen - 1)){
                        if(node.result!=null){
                            return node.result;
                        } else {
                            return '<p>Non viable input :(</p>';
                        }
                    }
                    runner = node;
                    charContained = true;
                    break;
                }
            }
            if(!charContained){
                return '<p>Non viable input =|</p>';
            }
        }
        return '<p>Non viable input o.O</p>';
    }
    autoComplete(prefix: string){
        let runner = this.head;
        let preLen = prefix.length;
        for(let i = 0; i < preLen; i++){
            let preChar = false;
            for(let node of runner.nexts){
                if(node.char.toLowerCase() == prefix[i].toLowerCase()){
                    runner = node;
                    preChar = true;
                    break;
                }
            }
            if(!preChar){
                let emptyArr: string[] = [];
                return emptyArr;
            }
        }
        function RSuffixes(thisNode: TrieNode, builtSuff: string, suffixList: string[] ){
            if(thisNode.nexts.length == 0){
                if(thisNode.result != null){
                    suffixList.push(builtSuff);
                    return suffixList;
                }
            }
            for(let node of thisNode.nexts){
                let newSuff: string = builtSuff + node.char;
                RSuffixes(node, newSuff, suffixList);
                newSuff = builtSuff;
            }
            if(thisNode.result != null){
                suffixList.push(builtSuff);
            }
            return suffixList
        }
        let tempList: string[] = [];
        let suffResult: string[] = RSuffixes(runner, "", tempList);
        return suffResult;
    }
}
