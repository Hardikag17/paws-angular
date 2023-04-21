import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/interfaces/pet';
import { RequestsService } from 'src/app/services/api/requests.service';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent {
  request$!: Observable<{ Pet: Pet; status: string }>;
  requests$!: Observable<[{ Pet: Pet; requests: [string] }]>;

  constructor(private getRequestsServcie: RequestsService) {}

  ngOnInit() {
    this.request$ = this.getRequestsServcie.getRequestByUserID();
    this.requests$ = this.getRequestsServcie.getRequestsByRescuerID();
  }
}
