import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./FriendAndRequest/Card";
import Posts from "./Posts/Posts";
import { Comments, Post, ProfileDetail } from "../Types/type";
import { searchList } from "../api/search";

const Search = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [tabSelected, setTabSelected] = useState("");
  const [tabData, setTabData] = useState([]);

  const handleSearchQuery = async (searchQuery: string) => {
    if (searchQuery.length < 3) return;
    try {
      const result = await searchList(searchQuery);
      setResults(result);

      const entries = Object.entries(result);
      for (const entry of entries) {
        if (entry[1].length > 0) {
          setTabSelected(entry[0]);
          setTabData(entry[1]);
          break;
        }
      }
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    if (query) handleSearchQuery(query);
  }, [query]);

  if (Object.keys(results).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-2">
        {Object.entries(results).map((tab) => {
          return (
            <button
              key={tab[0]}
              className="btn btn-soft"
              onClick={() => {
                setTabData(tab[1]);
                setTabSelected(tab[0]);
              }}
            >
              {tab[0]}
            </button>
          );
        })}
      </div>
      <div>
        {tabData.length === 0 ? (
          <div>No data with this query. Try different keywords</div>
        ) : (
          tabData.map((item: ProfileDetail | Comments | Post) => {
            if (tabSelected === "userList" && "firstName" in item) {
              return (
                <div key={item._id} className="m-10">
                  <Card
                    _id={item._id}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    photo={item.photo}
                  />
                </div>
              );
            } else if (tabSelected === "commentList" && "comment" in item) {
              return (
                <div
                  key={item._id}
                  className="m-10 hover:cursor-pointer"
                  onClick={() => navigate("/postDiscussion/" + item.postId)}
                >
                  <div className="flex items-center">
                    <div className="pr-2">
                      <img
                        className="w-5 rounded-full"
                        src={item.userId.photo.url}
                        alt="Profile Avatar"
                      />
                    </div>
                    <h3 className="font-bold">
                      {item.userId.firstName} {item.userId.lastName}
                    </h3>
                  </div>
                  <h4>{item.comment}</h4>
                </div>
              );
            } else if (tabSelected === "postList" && "title" in item) {
              return (
                <div key={item._id}>
                  {tabData.map((post) => (
                    <Posts postObject={post} />
                  ))}
                </div>
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default Search;
