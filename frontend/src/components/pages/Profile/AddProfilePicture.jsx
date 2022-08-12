import { Box, Button } from "@mui/material";
import * as gifshot from "gifshot";
import { useState } from "react";
import { apiBaseUrl } from "../../../api/api";

const AddProfilePicture = (props) => {
  const [gifImg, setGifImg] = useState();

  const makeGif = () => {
    gifshot.createGIF((obj) => {
      console.log(obj);
      setGifImg(obj.image);
    });
  };

  const saveAsProfile = () => {
    fetch(gifImg)
      .then((res) => res.blob())
      .then((gifImgBlob) => {
        const formData = new FormData();
        formData.append("profilePicture", gifImgBlob, "profilePicture.gif");

        fetch(apiBaseUrl + "/users/profilepic", {
          method: "PUT",

          headers: { token: "JWT " + props.token },
          body: formData,
        });
      })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Box>
      <Button onClick={makeGif}>Make Gif</Button>
      {gifImg && (
        <Box>
          Gif:
          <img src={gifImg} alt="gif preview" />{" "}
        </Box>
      )}
      <Button onClick={saveAsProfile}>Save as Profile Gif</Button>
    </Box>
  );
};

export default AddProfilePicture;
