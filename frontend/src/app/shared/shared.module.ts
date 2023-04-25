import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedRoutingModule } from './shared-routing.module';
import { LandingComponent } from './landing/landing.component';
import { ButtonComponent } from './components/button/button.component';
import { AdoptComponent } from './adopt/adopt.component';
import { CardComponent } from './components/card/card.component';
import { PetviewComponent } from './petview/petview.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LeafletComponent } from './components/leaflet/leaflet.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoadingPipe } from '../pipes/loading.pipe';
import { MessageComponent } from './components/message/message.component';
import { MessageDirective } from '../directives/message.directive';
@NgModule({
  declarations: [
    LandingComponent,
    ButtonComponent,
    AdoptComponent,
    CardComponent,
    PetviewComponent,
    LoaderComponent,
    LeafletComponent,
    AnalyticsComponent,
    ChartComponent,
    LoadingPipe,
    MessageComponent,
    MessageDirective,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule,
    FormsModule,
    LeafletModule,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    LoaderComponent,
    LoadingPipe,
    MessageComponent,
  ],
})
export class SharedModule {}
