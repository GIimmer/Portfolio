import { Injectable, NgModule } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjikstraService {
  public hoverLink : Subject<string> = new Subject();
  public clickLink : Subject<string> = new Subject();
  public upperShadow : Subject<string> = new Subject();
  public lowerShadow : Subject<string> = new Subject();
  constructor() { }

  // setHover(whichHover: string){
  //   this.whichHover = whichHover;
  //   console.log("In the service and setting whichHover: ", this.whichHover);
  // }
  getHover(){
    return this.hoverLink;
  }
}
