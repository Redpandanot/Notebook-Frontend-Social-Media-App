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
  photo: PhotoObject;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PhotoObject {
  url: string;
}
