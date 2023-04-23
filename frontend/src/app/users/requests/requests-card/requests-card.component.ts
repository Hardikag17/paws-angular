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
  usersInfo$!: any;

  constructor(private getUserService: UserService) {}

  ngOnInit() {
    console.log(this.requests);
    // if (this.requests[0].length > 0)
    //   this.requests[0].Requests.forEach((element: any) => {
    //     this.getUserService
    //       .getUserInfo(element)
    //       .pipe(map((res: any) => this.usersInfo$.push([res])));
    //   });
  }

  acceptRequest = (id: string) => {
    console.log('Accept Adoption Request', id);
  };
  rejectRequest = (id: string) => {
    console.log('Reject Adoption Request', id);
  };
}
