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
import { SocialList, Social } from 'src/app/interfaces/social';
import { StorageService } from 'src/app/services/storage.service';
import { from, map } from 'rxjs';
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
  likeColor!: string;
  totalLikes: number = 0;
  element!: Pet;
  likes: { count: number; status: boolean } = { count: 0, status: false };
  imgS = '';
  fakeArray!: Array<number>;
  comment: string = '';
  socials: SocialList[] = [];
  alert: { message: string; bool: Boolean } = {
    message: '',
    bool: false,
  };

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

    // this.storageService
    //   .getUserState()
    //   .subscribe((res) =>
    //     this.getSocialService
    //       .getlikes(this.PetID, res.userId)
    //       .subscribe((data) => console.log(data))
    //   );
  }

  sendPetRequest = () => {
    this.getPetService.sendPetRequest(this.PetID, this.user.userId).subscribe({
      next: (data) => {
        this.alert = {
          message: data,
          bool: true,
        };
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  };
  petLike = () => {
    if (this.likeColor == null) {
      this.likeColor = 'red';
      this.likes.count = this.likes.count + 1;
    } else {
      this.likeColor = '';
      this.likes.count = this.likes.count + 1;
    }
  };
  addComment = () => {
    const SocialData: Social = {
      comment: this.comment,
      likes: this.likeColor == 'red' ? this.user.userId : null,
      author: this.user.userId,
      PetID: this.element.PetID,
    };

    this.getSocialService.addComment(SocialData).subscribe((res) => {
      this.socials = res;
    });
  };

  clearCommentText = () => {
    this.comment = '';
  };
  deleteSocial = (SocialId: string) => {
    this.getSocialService
      .deleteSocial(this.PetID, SocialId)
      .subscribe((res) => {
        this.socials = res;
      });
  };

  handleOnClick = (event: any) => {
    this.imgS = event.target.src;
  };
}
