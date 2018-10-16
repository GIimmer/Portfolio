import { Node } from './node';

export class Path {
    start: Node;
    steps: any[][];
    constructor(start: Node){
        this.start = start;
        this.steps = [];
        this.addStep(start, 0.0)
    }
    addStep(nextNode, dist){
        this.steps.push([nextNode, dist]);
    }
    getDist(){
        let result = 0.0;
        for(let step of this.steps){
            result += step[1];
        }
        return result;
    }
    concatenatePath(other: Path){
        let temp = this.steps[0];
        this.steps = [];
        for(let step of other.steps){
            this.steps.push(step)
        }
        this.steps[(this.steps.length-1)][1] = this.start.getDist(this.steps[(this.steps.length-1)][0]);
        this.steps.push(temp);
        return;
    }
    delStep(){
        this.steps.pop();
        return
    }
    clonePath(){
        let tempPath = new Path(this.start);
        tempPath.steps = [];
        for(let i = 0; i<this.steps.length-1; i++){
            tempPath.steps.push(this.steps[i]);
        }
        tempPath.steps.push([this.start, 0.0]);
        return tempPath;
    }

}
