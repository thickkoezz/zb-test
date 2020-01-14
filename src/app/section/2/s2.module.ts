import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { S2Component } from './s2.component';

const routes: Routes = [
  { path: '', component: S2Component }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [
    S2Component
  ]
})
export class S2Module { }
