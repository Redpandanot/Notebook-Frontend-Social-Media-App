import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import PostDiscussion from "./pages/PostDiscussion";
import EditProfile from "./pages/EditProfile";
import Search from "./components/Search";

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
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
