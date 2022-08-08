import * as React from "react";
import { apiBaseUrl } from "../../api/api";
import GifUploadDialog from "./GifUploadDialog";

const AddPostDialog = ({ token, open, handleClose }) => {
  const uploadFile = (gifFile) => {
    const formData = new FormData();
    formData.append("gif", gifFile, gifFile.name);

    fetch(apiBaseUrl + "/posts/giveGif", {
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
      });
  };

  return (
    <GifUploadDialog
      title="GiveGif"
      open={open}
      handleClose={handleClose}
      onSubmit={uploadFile}
      submitBtnText="GiveGif"
    />
  );
};

export default AddPostDialog;
