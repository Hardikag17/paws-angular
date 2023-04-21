import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ButtonComponent } from './components/button/button.component';
import { AdoptComponent } from './adopt/adopt.component';
import { CardComponent } from './components/card/card.component';
import { PetviewComponent } from './petview/petview.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    LandingComponent,
    ButtonComponent,
    AdoptComponent,
    CardComponent,
    PetviewComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, FontAwesomeModule, FormsModule],
  exports: [ButtonComponent, CardComponent, LoaderComponent],
})
export class SharedModule {}
