import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DjikstraComponent } from './djikstra/djikstra.component';
import { AboutComponent } from './about/about.component';
import { DraftChatComponent } from './draft-chat/draft-chat.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { UntitledComponent } from './untitled/untitled.component';
import { MobileComponent } from './mobile/mobile.component';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "/djikstra" },

  {path: "djikstra", component: DjikstraComponent},
  {path: "about", component: AboutComponent},
  {path: "draftChat", component: DraftChatComponent},
  {path: "eCommerce", component: ECommerceComponent},
  {path: "uGame", component: UntitledComponent},

  {path: "mobile", component: MobileComponent},

  {path: "*", redirectTo: "/djikstra" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
