import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptComponent } from './adopt/adopt.component';
import { LandingComponent } from './landing/landing.component';
import { PetviewComponent } from './petview/petview.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'adopt',
    component: AdoptComponent,
  },
  {
    path: 'adopt/petview/:PetID',
    component: PetviewComponent,
  },
  {
    path: 'petview/:PetID',
    component: PetviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
