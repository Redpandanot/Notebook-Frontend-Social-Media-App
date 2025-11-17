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
