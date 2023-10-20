import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PriceCheckComponent } from './price-check/price-check.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'PriceCheck', component: PriceCheckComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
