export class Node {
    id: number;
    name: string;
    x: number;
    y:number;
    distEnd: number;
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.name = x.toString() + y.toString();
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    doesEq(other){
        return this == other;
    }
    getDist(otherNode){
        let diffX = Math.abs(otherNode.x - this.x);
        let diffY = Math.abs(otherNode.y - this.y);
        return Math.pow(diffX,2) + Math.pow(diffY,2);
    }
    getDistEnd(endNode: Node){
        let diffX = Math.abs(endNode.x - this.x);
        let diffY = Math.abs(endNode.y - this.y);
        this.distEnd = Math.sqrt(Math.pow(diffX,2) + Math.pow(diffY,2));
    }
}
