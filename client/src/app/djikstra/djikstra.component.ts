import { Component, OnInit } from '@angular/core';
import { DjikstraService } from '../djikstra.service';
import { Graph } from '../classes/graph';
import { Path } from '../classes/path';
import { Node } from '../classes/node';
import { Router } from '@angular/router';
import { Star } from '../classes/star';
import { nodeStar } from '../classes/circle';
import { Meteor } from '../classes/meteor';

@Component({
  selector: 'app-djikstra',
  templateUrl: './djikstra.component.html',
  styleUrls: ['./djikstra.component.css']
})
export class DjikstraComponent implements OnInit {
  canvas: any;
  myGraph: Graph;
  whichHover: string;
  whichClick: string;
  shapeArray: any = [];
  animating: boolean = false;
  path: any;
  ctx: any;
  points: any[];
  t: number;
  mpX: number;
  mpY: number;
  pHeight: number = (window.innerHeight*.86);
  subscription: any;
  mouseDown: any = {x: null, y: null};
  mouseUp: any = {x: null, y: null};
  newStarCounter: number = 0;

  endReference: any = {
    'about': 1,
    'uGame': 4,
    'userDash': 2,
    'draftChat': 3
  }
  mouse: any = {
    x: undefined,
    y: undefined
  }

  constructor(
    private _router: Router,
    private _djikstraService: DjikstraService
    ) {}

  ngOnInit() {
    let isMobile = this.detectmob();
    if(isMobile == true){
      window.location.href = "http://google.com";
    }
    this.subscription = this._djikstraService.clickLink.subscribe((value)=> {
      this.animating = false;
      this.t = 1;
      this.points = [];
      this.whichClick = value;
      this.prepareDjikstra();
    });
    this.showCanvas();
  }
  detectmob() {
    if(window.innerWidth <= 1225 || window.innerHeight <= 650) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit(){
  }
  ngOnDestroy() {
    if (this._djikstraService.hoverLink.subscribe) {
      this.subscription.unsubscribe();
    }
  }

  mouseDownFunc(e){
    this.mouseDown.x = e.pageX;
    this.mouseDown.y = e.pageY;
  }
  mouseUpFunc(e){
    this.mouseUp.x = e.pageX;
    this.mouseUp.y = e.pageY;
    this.userStar();
  }
  userStar(){
    if(this.newStarCounter > 10){
      return;
    }
    let innerRadius = Math.floor(Math.random()*1 + 2);
    let outerRadius = Math.floor(Math.random()*2 + 5);
    let spikes = Math.floor(Math.random()*2 + 5);
    let x: number = this.mouseDown.x;
    let y: number = this.mouseDown.y - (window.innerHeight*.07);
    let midX = this.canvas.width/2;
    let midY = this.canvas.height/2;
    let dx = (this.mouseDown.x - this.mouseUp.x) * .01;
    let dy = (this.mouseDown.y - this.mouseUp.y) * .01;
    let counter = Math.floor(Math.random()*150)
    this.shapeArray.push(new Meteor(x, y, dx, dy, midX, midY, spikes, innerRadius, outerRadius, counter));
    this.newStarCounter++;
  }

  prepareDjikstra(){
    this.myGraph = new Graph;
    for(let node of this.shapeArray){
      this.myGraph.addNode(node.x, node.y);
    }
    let endNode: any;
    endNode = this.myGraph.nodes[this.endReference[this.whichClick]];
    for(let i = 0; i < this.myGraph.numNodes(); i++){
      this.myGraph.nodes[i].getDistEnd(endNode);
      for(let j = i+1; j < this.myGraph.numNodes(); j++){
        let nodesDist = this.myGraph.nodes[i].getDist(this.myGraph.nodes[j]);
        this.myGraph.addEdge(i, j, nodesDist);
      }
    }
    this.runDjikstra(endNode);
  }

  runDjikstra(endNode: Node){
    let bestPath = this.directedDFS(this.myGraph.nodes[0], endNode);
    this.handleDjikstra(bestPath);
  }
  handleDjikstra(bestPath){
    this.points=this.calcWaypoints(bestPath);
    this.points = JSON.parse(JSON.stringify(this.points));
    this.animoo();
    

  }

  animoo(){
    if(this.t<this.points.length-1){
      requestAnimationFrame(this.animoo.bind(this));
    } else {
      this._djikstraService.upperShadow.next('0px 4px 6px #555555');
      this._djikstraService.lowerShadow.next('0px -4px 6px #555555');
      // console.log("This points length is: ", this.points.length);
      // console.log("This points: ", this.points);
      // console.log("This t is: ", this.t);
      console.log("Making it to navigate");
      this._router.navigate(['/' + this.whichClick]);
    }
    // draw a line segment from the last waypoint
    // to the current waypoint
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[this.t-1].x,this.points[this.t-1].y);
    this.ctx.lineTo(this.points[this.t].x,this.points[this.t].y);
    this.ctx.lineWidth = 1;
    // this.ctx.strokeStyle = "#f75400";
    this.ctx.strokeStyle = "#f7b900";
    this.ctx.stroke();
    // increment "t" to get the next waypoint
    this.t++;
}

  calcWaypoints(bestPath){
    let waypoints=[];
    let steps = bestPath.steps;
    let speedr = 1;
    for(let i = steps.length - 2; i>=0; i--){
      let pt0=steps[i+1][0];
      let pt1=steps[i][0];
      let dx=pt1.x-pt0.x;
      let dy = pt1.y-pt0.y;
      for(let j=0; j<speedr; j++){
        let x=pt0.x+dx*j/speedr;
        let y=pt0.y+dy*j/speedr;
        waypoints.push({x:x,y:y})
      }
      if(i == 0){
        waypoints.push({x:pt0.x,y:pt0.y})
      }
      if(speedr > 3){
        speedr -= 2;
      } else if(speedr == 1){
        speedr = 15;
      }
    }
    return(waypoints);
}

  directedDFS(start: Node, end: Node, visited: Node[] = [], memo: any = {}){
    let path = new Path(start);
    visited.push(start);
    if(start.doesEq(end)){
      visited.pop();
      return path;
    }
    let shortest: any = null;
    let tempPath: any;
    for(let node of this.myGraph.nodes){
      if((!visited.includes(node))&&(node.distEnd < start.distEnd)){
        let newPath = null;
        if(memo[node.name] != undefined){
          newPath = memo[node.name];
        } else {
          newPath = this.directedDFS(node, end, visited, memo);
        }
        if(newPath == null){
          continue;
        }
        tempPath = path.clonePath();
        let tempNewPath = newPath.clonePath();
        tempPath.concatenatePath(tempNewPath);
        let tempPathDist = tempPath.getDist();
        if((shortest == null) || (tempPathDist < shortest.getDist())){
          shortest = tempPath.clonePath();
          memo[node.name] = newPath.clonePath();
        }
      }
    }
    if(shortest == null){
      return null;
    } else {
      visited.pop();
      return shortest;
    }
  }

  initCanvas(){
    let starY = this.canvas.height - 25,
      starX = this.canvas.width - 60,
      midX = (this.canvas.width/2),
      midY = (this.canvas.height/2),
      starMaker = [[midX, midY],[60,25, 'about'], [starX,25, 'draftChat'], [60,starY, 'userDash'], [starX,starY, 'unTitled']];
    this.mpX = midX - 100;
    this.mpY = midY - 100;
    for(let star of starMaker){
      let newStar = new Star(star[0], star[1], 5, 15, 3);
      this.shapeArray.push(newStar);
      // this.endReference[star[2]] = newStar;
    }
    for(let i = 0; i < 105; i++){
      let innerRadius = Math.floor(Math.random()*2 + 1);
      let outerRadius = Math.floor(Math.random()*9 + 2);
      let spikes = Math.floor(Math.random()*1.2 + 4);
      let x: number;
      let y: number;
      let valid = false;
      while(!valid){
        x = (Math.random() * (innerWidth - outerRadius * 2) + outerRadius);
        y = (Math.random() * (this.pHeight - outerRadius * 2) + outerRadius);
        if(   (Math.pow(midX-x, 2) + Math.pow(midY-y, 2)) > 10816 ){
          valid = true;
        }
      }
      let dx = (Math.random() - 0.5) * .4;
      let dy = (Math.random() - 0.5) * .4;
      let counter = Math.floor(Math.random()*450)
      this.shapeArray.push(new nodeStar(x, y, dx, dy, midX, midY, spikes, innerRadius, outerRadius, counter));
    }
  }

  animate() {
    if(this.animating){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for(let i = 0; i < this.shapeArray.length; i++){
          this.shapeArray[i].update(this.ctx, this.pHeight);
      }
      requestAnimationFrame(()=>{
        this.animate();
      })
    }
  }
  showCanvas(){
    this.canvas = document.querySelector('canvas');
    this.canvas.setAttribute('height', this.pHeight);
    this.canvas.setAttribute('width', window.innerWidth);
    this.ctx = this.canvas.getContext('2d');

    this.initCanvas();
    this.animating = true;
    this.animate();
  }
  onResize(event){
    this.animating = false;
    this.pHeight = (event.target.innerHeight*.86);
    this.shapeArray = [];
    this.showCanvas();
  }
}