export interface Social {
  comment: string;
  likes: string;
  author: string;
  PetID: string;
}

export interface SocialList {
  comment: string;
  likes: string;
  author: {
    email: string;
    name: string;
    password: string;
    userId: string;
  };
  PetID: string;
  _id: string;
}
