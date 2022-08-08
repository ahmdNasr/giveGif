import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../../api/api";
import AddPostDialog from "../../common/AddPostDialog";
import DefaultPage from "../../common/DefaultPage";
import Post from "./Post";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

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

  const [addPostDialogOpen, setAddPostDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setAddPostDialogOpen(false);
  };

  const openReplyDialog = () => {
    setAddPostDialogOpen(true);
  };

  return (
    <DefaultPage title="Home">
      <>
        <IconButton onClick={openReplyDialog}>
          <AddAPhotoOutlinedIcon />
        </IconButton>
        <AddPostDialog
          handleClose={handleCloseDialog}
          open={addPostDialogOpen}
          token={props.token}
        />
      </>

      {errorMessage && <p>{errorMessage}</p>}
      {feed &&
        feed.map((post) => (
          <Post key={post._id} {...post} token={props.token} />
        ))}
    </DefaultPage>
  );
};

export default HomePage;
