import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MetricsService } from 'src/app/services/api/metrics.service';

Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  chart!: any;
  metrics!: any;

  constructor(private getMetricsService: MetricsService) {}

  ngOnInit() {
    this.getMetricsService.getMetrics().subscribe((res: any) => {
      this.metrics = res.metric;
      this.createChart();
    });
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: {
        labels: [
          'total_no_of_pets',
          'no_of_pets_adopted',
          'no_of_cats',
          'no_of_dogs',
          'others',
        ],
        datasets: [
          {
            label: 'total',
            data: this.metrics,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              //   "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              //   "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
