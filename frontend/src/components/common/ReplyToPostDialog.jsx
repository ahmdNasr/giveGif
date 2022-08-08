import * as React from "react";
import { apiBaseUrl } from "../../api/api";
import GifUploadDialog from "./GifUploadDialog";

const ReplyToPostDialog = ({
  token,
  open,
  handleClose,
  postId,
  replyPath = "replies",
  onReply,
}) => {
  const replyWithGifFile = (gifFile) => {
    const formData = new FormData();
    formData.append("gif", gifFile, gifFile.name);
    formData.append("postId", postId);
    formData.append("replyPath", replyPath); // FIXME: change hard coded "replies" to acutal reply path...

    fetch(apiBaseUrl + "/posts/replyToPost", {
      headers: {
        token: `JWT ${token}`,
      },
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose(false); // dialog schließen nach upload
        onReply(); // wird aufgerufen um den feed neu zu rendern...
      });
  };

  return (
    <GifUploadDialog
      title={"Reply"}
      open={open}
      handleClose={handleClose}
      onSubmit={(gifFile) => replyWithGifFile(gifFile)}
      submitBtnText="Gif Reply"
    />
  );
};

export default ReplyToPostDialog;
