import { Component } from '@angular/core';
import { MetricsService } from 'src/app/services/api/metrics.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent {
  metrics$!: Observable<any>;

  constructor(private getMetricsService: MetricsService) {}

  ngOnInit() {
    this.metrics$ = this.getMetricsService.getMetrics();
  }
}
