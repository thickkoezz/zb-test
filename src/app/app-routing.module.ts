import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 's1',
    loadChildren: () => import('./section/1/s1.module').then(m => m.S1Module)
  },
  {
    path: 's2',
    loadChildren: () => import('./section/2/s2.module').then(m => m.S2Module)
  },
  {
    path: 's3',
    loadChildren: () => import('./section/3/s3.module').then(m => m.S3Module)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
