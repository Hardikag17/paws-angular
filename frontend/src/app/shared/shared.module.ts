import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [LandingComponent, ButtonComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [ButtonComponent],
})
export class SharedModule {}
