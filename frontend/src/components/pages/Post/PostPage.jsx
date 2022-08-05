import DefaultPage from "../../common/DefaultPage";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { apiBaseUrl } from "../../../api/api";

const PostPage = (props) => {
  const [gifFile, setGifFile] = useState();

  const [imgPreview, setImgPreview] = useState("");

  useEffect(() => {
    if (gifFile) {
      const objectUrl = URL.createObjectURL(gifFile);
      console.log(objectUrl);
      setImgPreview(objectUrl);
    }
  }, [gifFile]);

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("gif", gifFile, gifFile.name);

    fetch(apiBaseUrl + "/posts/giveGif", {
      headers: {
        token: `JWT ${props.token}`,
      },
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <DefaultPage title="Give GIF" icon={<AddAPhotoOutlinedIcon />}>
      <Box sx={{ display: "grid", placeItems: "center", gap: 2 }}>
        <img
          src={
            imgPreview ||
            "https://c.tenor.com/40RSTQMiDIYAAAAC/uploading-downloading.gif"
          }
          alt="Upload preview"
        />

        <Button variant="outlined" component="label" color="secondary">
          {gifFile ? "Change File" : "Choose File"}
          <input
            hidden
            accept="image/gif"
            type="file"
            onChange={(e) => setGifFile(e.target.files[0])}
          />
        </Button>

        {gifFile && (
          <Button
            endIcon={<AddAPhotoOutlinedIcon />}
            variant="contained"
            onClick={uploadFile}
          >
            Give GIF
          </Button>
        )}
      </Box>
    </DefaultPage>
  );
};

export default PostPage;
