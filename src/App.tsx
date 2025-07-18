import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import PostDiscussion from "./pages/PostDiscussion";
import EditProfile from "./pages/EditProfile";
import Search from "./components/Search";
import FollowersList from "./components/FollowerAndFollowee/FollowersList";
import FollowingList from "./components/FollowerAndFollowee/FollowingList";
import FriendsList from "./components/FriendAndRequest/FriendsList";
import RequestList from "./components/FriendAndRequest/RequestList";
import Whisper from "./pages/Whisper";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Feed />}>
            <Route path="/search/:query" element={<Search />} />
          </Route>
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/postDiscussion/:postId" element={<PostDiscussion />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/friends" element={<FriendsList />} />
          <Route path="/followers" element={<FollowersList />} />
          <Route path="/following" element={<FollowingList />} />
          <Route path="/friend-requests" element={<RequestList />} />
          <Route path="/chat" element={<Whisper />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
