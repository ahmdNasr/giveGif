import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../api/api";
import AddPostDialog from "../../common/AddPostDialog";
import DefaultPage from "../../common/DefaultPage";
import Post from "../../common/Post";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const HomePage = (props) => {
  const [feed, setFeed] = useState([]);
  const [replyCounter, setReplyCounter] = useState(0); // used to repload feed

  console.log({ feed });
  // FIXME: use a result param from api to update part of the feed (instead of load entire feed from backend over and over again)
  const onPostReply = () => setReplyCounter((prev) => prev + 1);

  useEffect(() => {
    fetch(apiBaseUrl + "/posts", {
      headers: { token: `JWT ${props.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.feed) {
          props.setErrorMessage(data.message || "Error loading feed.");
          return;
        }
        setFeed(data.feed);
      });
  }, [props, replyCounter]);

  const [addPostDialogOpen, setAddPostDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setAddPostDialogOpen(false);
  };

  const openReplyDialog = () => {
    setAddPostDialogOpen(true);
  };

  return (
    <DefaultPage
      title="Home"
      offTheLine={props.errorMessage}
      setToken={props.setToken}
    >
      <>
        <IconButton onClick={openReplyDialog}>
          <AddAPhotoOutlinedIcon />
        </IconButton>
        <AddPostDialog
          handleClose={handleCloseDialog}
          open={addPostDialogOpen}
          token={props.token}
          onPost={onPostReply}
        />
      </>

      {props.errorMessage && <p>{props.errorMessage}</p>}
      {feed &&
        feed.map((post) => (
          <Post
            key={post._id}
            {...post}
            token={props.token}
            onReply={onPostReply}
          />
        ))}
    </DefaultPage>
  );
};

export default HomePage;
