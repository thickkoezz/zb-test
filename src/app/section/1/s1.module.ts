import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { S1Component } from './s1.component';

const routes: Routes = [
  { path: '', component: S1Component }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [
    S1Component
  ]
})
export class S1Module { }
