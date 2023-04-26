import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ChatService } from 'src/app/services/api/chat.service';
@Component({
  selector: 'app-petview',
  templateUrl: './petview.component.html',
  styleUrls: ['./petview.component.css'],
})
export class PetviewComponent implements OnInit {
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
  likes!: { count: number; status: boolean };
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
    private getSocialService: SocialService,
    private getChatService: ChatService,
    private router: Router
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

    this.getSocialService.getlikes(this.PetID).subscribe((res) => {
      this.likes = res;
      if (this.likes.status === true) {
        this.likeColor = 'red';
      } else this.likeColor = '';
    });
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

  addChatList = () => {
    this.getChatService
      .addChat(this.user.userId, this.element.RescuerID, this.element.PetID)
      .subscribe((res) => {
        this.router.navigate([`${this.user.userId}/chat`]).then(
          (chat) => {
            console.log('router navigation', chat);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  };
}
