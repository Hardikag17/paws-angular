import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/interfaces/pet';
import { RequestsService } from 'src/app/services/api/requests.service';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
})
export class RequestsComponent implements OnInit {
  request$!: Observable<{ Pet: Pet; status: string }>;
  requests$!: Observable<[{ Pet: Pet; requests: [string] }]>;

  constructor(
    private getRequestsServcie: RequestsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.request$ = this.getRequestsServcie.getRequestByUserID();
    this.requests$ = this.getRequestsServcie.getRequestsByRescuerID();
  }

  cancelRequest = () => {
    this.getRequestsServcie.cancelRequest().subscribe((res) => {
      console.log(res);
      this.router.navigate(['', 'adopt']).then(
        (requests) => {
          console.log('router navigation', requests);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };
}
