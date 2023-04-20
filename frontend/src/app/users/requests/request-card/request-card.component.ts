import { Component, Input } from '@angular/core';
import { faMessage, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Pet } from 'src/app/interfaces/pet';
import { userRequests } from 'src/app/interfaces/user-Requests';
import { RequestsService } from 'src/app/services/api/requests.service';
@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css'],
})
export class RequestCardComponent {
  icons = { faMessage, faCircle };
  @Input() request!: Pet;
  @Input() status!: string;
}
