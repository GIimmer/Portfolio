export class Meteor {
    x: number;
    y: number;
    dx: number;
    dy: number;
    midX: number;
    midY: number;
    distEnd = 0;
    spikes: number;
    outerRadius: number;
    innerRadius: number;
    positionArr: number[][] = [];
    color: number[];
    counter: number = 0;
    colorArr: number[][];
    constructor(x, y, dx, dy, midX, midY, spikes, innerRadius, outerRadius, counter){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.midX = midX;
        this.midY = midY;
        this.spikes = spikes;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.counter = counter;
        this.positionArr.push([x,y]);
        this.colorArr = [[33,83,104],[15,46,73],[75,111,135]];
        let incredibleSpeed = Math.abs(dx) + Math.abs(dy);
        for(let color of this.colorArr){
            if(Math.floor(incredibleSpeed*15)<180){
                color[0] += Math.floor(incredibleSpeed*32);
                color[1] -= Math.floor(incredibleSpeed*2);
                color[2] -= Math.floor(incredibleSpeed*2);
            } else {
                color[0] = 255;
                color[1] = 40;
                color[2] = 50;
            }
            Math.floor(incredibleSpeed*15)
        }
        console.log("Here is this colorArr ", this.colorArr);
        this.color = this.colorArr[Math.floor(Math.random()*this.colorArr.length)]
    }
    draw(c, position, num){
        var rot=Math.PI/2*3;
        var cx=position[0];
        var cy=position[1];
        let x=position[0];
        let y=position[1];
        var step=Math.PI/this.spikes;

        c.beginPath();
        c.moveTo(cx,cy-this.outerRadius)
        for(let i=0;i<this.spikes;i++){
        x=cx+Math.cos(rot)*this.outerRadius;
        y=cy+Math.sin(rot)*this.outerRadius;
        c.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*this.innerRadius;
        y=cy+Math.sin(rot)*this.innerRadius;
        c.lineTo(x,y)
        rot+=step
        }
        c.lineTo(cx,cy-this.outerRadius);
        c.closePath();
        c.lineWidth=2;
        c.fillStyle = 'rgba(' + this.color[0].toString() + ',' + this.color[1].toString() + ',' + this.color[2].toString() + ',' + num.toString() + ')';
        c.fill();
    }
    update(c, pHeight) {
        if((this.x + this.outerRadius) > innerWidth || (this.x - this.outerRadius) < 0){
            this.dx = -this.dx;
        }
        if((this.y + this.outerRadius) > pHeight || (this.y - this.outerRadius) < 0){
            this.dy = -this.dy;
        }
        if((Math.pow((this.midX-this.x), 2) + Math.pow((this.midY-this.y), 2)) < 10816 ){
            this.resolveCollision();
        }
        if(this.counter > 150){
            this.counter = 0;
            this.color = this.colorArr[Math.floor(Math.random()*this.colorArr.length)];
        }
        this.positionArr.push([ (this.x+=this.dx), (this.y+=this.dy) ])
        if(this.positionArr.length > 10){
            this.positionArr.shift();
        }
        this.counter ++;
        for(let i = 0; i<this.positionArr.length; i++){
            this.draw(c, this.positionArr[i], (i/10));
        }
    }
    resolveCollision() {
        this.dx = -this.dx; //Reverse direction
        this.dy = -this.dy;
        let speed = Math.sqrt(this.dx*this.dx + this.dy*this.dy);
        let currentAngle = Math.atan2(this.dy, this.dx);

        //The angle between the ball's center and the orbs center
        let reflectionAngle = Math.atan2(this.midY - this.y, this.midX - this.x);
        //The outcome of this "static" collision is just a angular reflection with preserved speed
        let newAngle = 2*reflectionAngle - currentAngle;

        this.dx = speed * Math.cos(newAngle); //Setting new velocity
        this.dy = speed * Math.sin(newAngle);
    }
}
