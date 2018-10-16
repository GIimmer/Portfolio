export class Star {
    colorArr = ["#FFDE59", "#FFE574", "#FFED91", "#FFF6B0", "#FFFDC4"];
    color: string;
    counter: number = 0;
    x: number;
    y: number;
    spikes: number;
    outerRadius: number;
    innerRadius: number;
    constructor(x, y, spikes, outerRadius, innerRadius){
        this.x = x;
        this.y = y;
        this.color = this.colorArr[Math.floor(Math.random()*this.colorArr.length)];
        this.counter = 0;
        this.spikes = spikes;
        this.outerRadius = outerRadius;
        this.innerRadius = innerRadius;
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
    update(c) {
        if(this.counter > 20){
          this.counter = 0;
          this.color = this.colorArr[Math.floor(Math.random()*this.colorArr.length)];
        } else {
          this.counter ++;
        }
        this.draw(c);
    }
}
