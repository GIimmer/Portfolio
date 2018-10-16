import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HumanService } from './human.service';
import { ScrollToModule } from 'ng2-scroll-to';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DjikstraComponent } from './djikstra/djikstra.component';
import { AboutComponent } from './about/about.component';
import { DraftChatComponent } from './draft-chat/draft-chat.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { UntitledComponent } from './untitled/untitled.component';
import { DjikstraService } from './djikstra.service';
import { MobileComponent } from './mobile/mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    DjikstraComponent,
    AboutComponent,
    DraftChatComponent,
    ECommerceComponent,
    UntitledComponent,
    MobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollToModule.forRoot(),
  ],
  providers: [HumanService, DjikstraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
