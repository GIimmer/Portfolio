import { Node } from './node';

export class Graph {
    nodes: Node[];
    edges: number[][];
    constructor(){
        this.nodes = [];
        this.edges = [[]];
    }
    addNode(x,y){
        let newNode = new Node(x,y);
        this.nodes.push(newNode);
        if(this.edges[0][0] == undefined){
            this.edges[0] = [0];
        } else {
            let counter = 0;
            for(let row of this.edges){
                row.push(-1);
                counter ++;
            }
            let newRow = new Array(counter);
            newRow.fill(-1);
            newRow.push(0)
            this.edges.push(newRow);
        }
    }
    addEdge(src: number, dest: number, weight: number){
        this.edges[src][dest] = weight;
        this.edges[dest][src] = weight;
    }
    numNodes(){
        return this.nodes.length;
    }
    neighborsOf(node){
        return this.edges[node];
    }
    hasNode(node){
        return this.nodes.includes(node);
    }
    reprGraph(){
        let res = '';
        for(let row in this.edges){
            for(let neighbor in this.edges[row]){
                res = res + row + '->' + neighbor + '-' + this.edges[row][neighbor];
            }
        }
    }
}
