import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faMessage, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Pet } from 'src/app/interfaces/pet';
import { PetsService } from 'src/app/services/api/pets.service';
import { RequestsService } from 'src/app/services/api/requests.service';
import * as request from 'superagent';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css'],
})
export class RequestCardComponent {
  icons = { faMessage, faCircle };
  @Input() request!: Pet;
  @Input() status!: string;
  @Output() onCancelRequest: EventEmitter<Pet> = new EventEmitter();

  cancelRequest = () => {
    this.onCancelRequest.emit(this.request);
  };
}
