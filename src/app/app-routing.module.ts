import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultFullComponent } from './result-full/result-full.component';

const routes: Routes = [
  { path: 'i/:i', component: ResultFullComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
