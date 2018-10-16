export class TrieNode {
    char: string;
    result: string;
    nexts: TrieNode[];
    constructor(char){
        this.char = char;
        this.nexts = [];
    }
}
