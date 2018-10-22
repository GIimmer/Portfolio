import { Component, OnInit, NgZone } from '@angular/core';
import {ScrollToModule} from 'ng2-scroll-to';
import * as $ from 'jquery';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css']
})
export class ECommerceComponent implements OnInit {
  private eventOptions: boolean|{capture?: boolean, passive?: boolean};
  dScrollSuggest: boolean = true;
  dScrollUp: boolean = false;
  scrollW: any;
  constructor(private ngZone: NgZone) { }

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
        this.dScrollSuggest = false;
        this.scrollW = $(document.getElementById('uDashBody'));
        let proximity = ((this.scrollW[0].scrollHeight- this.scrollW[0].clientHeight )- this.scrollW[0].scrollTop);
        if(proximity < 1000){
          this.dScrollUp = true;
        } else {
          this.dScrollUp = false;
        }
      });
    }
  }
}
