import { Component, OnInit, NgZone } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private eventOptions: boolean|{capture?: boolean, passive?: boolean};
  scrollW: any;
  jLove: string;
  angular: any;
  jBeginning: string;
  jRebirth: string;
  jWhere: string;
  jHome: string;
  distance: number = -150;
  appendation: string = 'url(../../assets/images/jLove.jpg';

  


  constructor(private ngZone: NgZone) {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.eventOptions = true;
    this.ngZone.runOutsideAngular(() => {
        window.addEventListener('scroll', this.scroll, <any>this.eventOptions);
    });
  }
  ngOnDestroy() {
      window.removeEventListener('scroll', this.scroll, <any>this.eventOptions);
      //unfortunately the compiler doesn't know yet about this object, so cast to any
  }

  scroll = (): void => {
      if (true) {
         this.ngZone.run(() => {
            this.scrollW = $(document.getElementById('aboutBody'));
            if(this.scrollW[0].scrollTop < 550){
              this.distance = -150 + (this.scrollW[0].scrollTop * .25);
            }
            let proximity = ((this.scrollW[0].scrollHeight- this.scrollW[0].clientHeight )- this.scrollW[0].scrollTop);
            if(proximity < 750){
              if(proximity > 560){
                this.jLove = '#bf4c81';
                this.jBeginning = '#cccccc';
                this.appendation = 'url(../../assets/images/jLove.jpg';
              } else if(proximity > 475){
                this.jBeginning = '#79bf4c';
                this.jRebirth = '#cccccc';
                this.jLove = '#cccccc';
                this.appendation = 'url(../../assets/images/jBeginning.jpg';
              } else if(proximity >= 250){
                this.jRebirth = '#54b9d8';
                this.jBeginning = '#cccccc';
                this.jWhere = '#cccccc';
                this.appendation = 'url(../../assets/images/jRebirth.jpg';
              } else if(proximity >= 75){
                this.jWhere = '#efbc3b';
                this.jRebirth = '#cccccc';
                this.jHome = '#cccccc';
                this.appendation = 'url(../../assets/images/jWhere.jpg';
              } else{
                this.jHome = '#337c40';
                this.jWhere = '#cccccc';
                this.appendation = 'url(../../assets/images/jHome.jpg';
              }
            }
         });
      }
  };
}
