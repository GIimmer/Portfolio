import { NumberSymbol } from "@angular/common";

export class Circle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    distEnd = 0;
    radius: number;
    color: string;
    colorArr = ["#233656", "#415B76","#7B9BA6","#CDD6D5","#EEF4F2"]
    constructor(x, y, dx, dy, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = this.colorArr[Math.floor(Math.random()*this.colorArr.length)]
    }
    draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }
}


export class nodeStar {
    x: number;
    y: number;
    velocity: any = {}
    dx: number;
    dy: number;
    midX: number;
    midY: number;
    mass: number;
    distEnd = 0;
    spikes: number;
    outerRadius: number;
    innerRadius: number;
    color: string;
    counter: number = 0;
    colorArr = ["#0F2E49", "#215368", "#4B6F87"];
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
        this.mass = 1;
        this.velocity.x = dx;
        this.velocity.y = dy
        this.color = this.colorArr[Math.floor(Math.random()*this.colorArr.length)]
    }
    draw(c){
        var rot=Math.PI/2*3;
        var cx=this.x;
        var cy=this.y
        var x=this.x;
        var y=this.y;
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
        c.fillStyle = this.color;
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
        this.x += this.dx;
        this.y += this.dy
        this.counter ++;

        this.draw(c);
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
