export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:3000" : "/api";

export enum FriendRequestStatus {
  Requested = "requested",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum ConnectionAction {
  Connect = "connect",
  Follow = "follow",
}

export enum QueryKeys {
  Profile = "profile",
}

export const listLimit = 10;

export const friendSuggestionsLimit = 3;

export const feedLimit = 3;

export const staleTimeForList = 5 * 60 * 1000;
