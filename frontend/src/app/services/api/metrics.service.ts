import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROOT } from 'src/app/api-config';
@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  constructor(private http: HttpClient) {}

  getMetrics = () => {
    return this.http.get(`${API_ROOT}/analytics/metrics`);
  };
}
