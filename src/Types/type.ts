export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  photo: PhotoObject;
}

export interface FriendRequest {
  _id: string;
  fromUserId: User | string;
  toUserId: string;
  status: "requested" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
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
  skills: string[];
  isFollowing: boolean;
  connectionStatus?: FriendRequest;
  createdAt: string;
  updatedAt: string;
}

export interface Followers {
  _id: string;
  followee: User;
  follower: User;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  _id: string;
  chatId: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatList {
  _id: string;
  participants: ProfileDetail[];
  lastMessage: LastMessage;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface LastMessage {
  text: string;
  sender: string;
}

export interface OutletType {
  mainScrollRef: React.RefObject<HTMLDivElement | null> | null;
}

export interface LoginPayload {
  emailId: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
}
