import { Component, Input, OnInit } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { faMessage, faCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/api/user.service';
import { User } from 'src/app/interfaces/user';
import { map } from 'rxjs';
import { RequestsService } from 'src/app/services/api/requests.service';
@Component({
  selector: 'app-requests-card',
  templateUrl: './requests-card.component.html',
  styleUrls: ['./requests-card.component.css'],
})
export class RequestsCardComponent {
  icons = { faMessage, faCircle };
  @Input() requests!: any;
  @Input() Pet!: Pet;
  usersInfo$!: any;

  constructor(private getRequestService: RequestsService) {}

  acceptRequest = (id: string) => {
    console.log('Accept Adoption Request', id);
    this.getRequestService
      .acceptAdoptRequest(this.Pet.PetID, id)
      .subscribe((res) => {
        console.log(res);
        alert('Adoption Request Accepted');
      });
  };
  rejectRequest = (id: string) => {
    console.log('Reject Adoption Request', id);
    this.getRequestService
      .rejectAdoptRequest(this.Pet.PetID, id)
      .subscribe((res) => {
        console.log(res);
        alert('Adoption Request Reject');
      });
  };
}
