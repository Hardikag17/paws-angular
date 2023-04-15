import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SharedRoutingModule } from './shared-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ButtonComponent } from './components/button/button.component';
import { AdoptComponent } from './adopt/adopt.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [LandingComponent, ButtonComponent, AdoptComponent, CardComponent],
  imports: [CommonModule, SharedRoutingModule, FontAwesomeModule],
  exports: [ButtonComponent],
})
export class SharedModule {}
