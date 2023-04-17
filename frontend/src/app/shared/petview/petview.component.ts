import { Component } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { ActivatedRoute } from '@angular/router';
import {
  faHeart,
  faMessage,
  faStickyNote,
  faMedkit,
  faInfoCircle,
  faCommentSlash,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { PetsService } from 'src/app/services/api/pets.service';
import { User } from 'src/app/interfaces/user';
import { SocialService } from 'src/app/services/api/social.service';
import { SocialList } from 'src/app/interfaces/social';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-petview',
  templateUrl: './petview.component.html',
  styleUrls: ['./petview.component.css'],
})
export class PetviewComponent {
  icons = {
    faHeart,
    faMessage,
    faStickyNote,
    faMedkit,
    faInfoCircle,
    faCommentSlash,
    faComments,
  };
  user!: User;
  PetID: string | null;
  likeColor: string = 'red';
  element!: Pet;
  likes = 0;
  imgS = '';
  fakeArray!: Array<Number>;
  comment: string = '';
  socials: SocialList[] = [];

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private getPetService: PetsService,
    private getSocialService: SocialService
  ) {
    this.PetID = '';
  }

  ngOnInit() {
    this.PetID = this.route.snapshot.paramMap.get('PetID');
    this.imgS = `https://paws-adoption.s3.ap-south-1.amazonaws.com/pets/${this.PetID}-1.jpg`;

    this.storageService.getUserState().subscribe((res) => (this.user = res));

    this.getPetService.getPetByPetID(this.PetID).subscribe({
      next: (data) => {
        this.element = data.response;

        this.fakeArray = new Array(this.element.PhotoAmt);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });

    this.getSocialService.getSocialList(this.PetID).subscribe({
      next: (data) => {
        this.socials = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  sendPetRequest = () => {
    this.getPetService.sendPetRequest(this.PetID, this.user.userId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };
  petLike = () => {};
  addComment = () => {};
  deleteSocial = (docId: string) => {};

  handleOnClick = (event: any) => {
    this.imgS = event.target.src;
  };
}
