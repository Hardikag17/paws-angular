import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { PetsService } from 'src/app/services/api/pets.service';
Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 500px;
        position: inherit;
      }
    `,
  ],
})
export class LeafletComponent implements OnInit {
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  userLocation!: { lat: number; lng: number };
  initialMarkers: [
    {
      position: { lat: number; lng: number };
      draggable: boolean;
    }
  ] = [
    {
      position: this.userLocation,
      draggable: false,
    },
  ];
  icon = new Leaflet.Icon({
    iconUrl: 'assets/marker-icon-2x.png',
    iconSize: [50, 50],
  });

  user = new Leaflet.Icon({
    iconUrl: '/assets/user.svg',
    iconSize: [50, 50],
  });

  constructor(private getPetsService: PetsService) {}

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.initialMarkers[0].position = this.userLocation;
    });
  }

  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy;  <a href="http://osm.org/copyright">OpenStreetMap</a>',
      }),
    ],
    opacity: 0.7,
    maxZoom: 19,
    detectRetina: true,
    zoom: 16,
    center: {
      lat: 17.4423937,
      lng: 78.3613099,
    },
  };

  onMapReady($event: Leaflet.Map) {
    this.map = $event;

    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.getPetsService.getNearByPets(this.userLocation).subscribe((res) => {
        res.forEach((cord: any) => {
          this.initialMarkers.push({
            position: { lat: cord.coordinates[0], lng: cord.coordinates[1] },
            draggable: false,
          });
        });
        this.initMarkers();
      });
    });
  }

  initMarkers() {
    for (let index = 0; index < this.initialMarkers.length; index++) {
      const data = this.initialMarkers[index];
      const marker = this.generateMarker(data, index);
      if (index == 0) marker.setIcon(this.user);
      else marker.setIcon(this.icon);
      marker
        .addTo(this.map)
        .bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log('a', $event);
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}
