import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { faMessage, faCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/api/user.service';
import { User } from 'src/app/interfaces/user';
import { map } from 'rxjs';
@Component({
  selector: 'app-requests-card',
  templateUrl: './requests-card.component.html',
  styleUrls: ['./requests-card.component.css'],
})
export class RequestsCardComponent implements OnInit {
  icons = { faMessage, faCircle };
  @Input() requests!: any;
  @Input() Pet!: Pet;
  userInfo$!: any;

  constructor(private getUserService: UserService) {}

  ngOnInit() {
    console.log('Requests', this.requests);
    this.userInfo$ = this.getUserService
      .getUserInfo(this.requests[0].Requests[0])
      .pipe(map((res: any) => console.log(res.userInfo)));
  }
}
