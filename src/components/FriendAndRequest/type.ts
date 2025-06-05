export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  photo: PhotoObject;
}

export interface FriendRequest {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: "requested" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface FriendsDetails {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
}

export interface CardDetail {
  _id: string;
  firstName: string;
  lastName?: string;
}

export interface Post {
  _id: string;
  userId: User;
  title: string;
  description: string;
  photos: PhotoObject[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PhotoObject {
  url: string;
}

export interface Comments {
  _id: string;
  postId: string;
  userId: User;
  comment: string;
  likeCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt: string;
  replies: Comments[];
}

export interface ProfileDetail {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
  age: string;
  gender: string;
  college: string;
  photo: PhotoObject;
  about: string;
  skills: [];
  createdAt: string;
  updatedAt: string;
}
