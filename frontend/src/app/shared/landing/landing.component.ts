import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/api/pets.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  recentAdded$!: any;
  recentUpdated$!: any;
  tabValue: number = 1;

  constructor(private getPetsService: PetsService) {}

  ngOnInit(): void {
    this.recentUpdated$ = this.getPetsService.getRecentUpdatedPets();

    this.recentAdded$ = this.getPetsService.getRecentAddedPets();
  }

  handleTab = (value: number) => {
    this.tabValue = value;
  };
}
