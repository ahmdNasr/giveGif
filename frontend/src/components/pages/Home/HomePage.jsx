import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../api/api";
import DefaultPage from "../../common/DefaultPage";
import Post from "./Post";

const HomePage = (props) => {
  const [feed, setFeed] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(apiBaseUrl + "/posts", {
      headers: { token: `JWT ${props.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.feed) {
          setErrorMessage(data.message || "Error loading feed.");
          return;
        }
        setFeed(data.feed);
      });
  }, [props.token]);

  return (
    <DefaultPage title="Home">
      {errorMessage && <p>{errorMessage}</p>}
      {feed && feed.map((post) => <Post key={post._id} {...post} />)}
    </DefaultPage>
  );
};

export default HomePage;
