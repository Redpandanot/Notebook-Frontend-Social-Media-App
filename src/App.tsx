import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { useAppSelector } from "./store/hooks";
import PostDiscussion from "./pages/PostDiscussion";

function App() {
  const profile = useAppSelector((state) => state.profile);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile profile={profile} />} />
          <Route path="/postDiscussion/:postId" element={<PostDiscussion />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
