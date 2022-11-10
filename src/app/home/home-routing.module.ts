import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'infoedit',
    loadChildren: () => import('./info-edit/info-edit.module').then( m => m.InfoEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}