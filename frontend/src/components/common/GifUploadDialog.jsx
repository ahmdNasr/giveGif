import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { useEffect } from "react";

const GifUploadDialog = ({
  title,
  open,
  handleClose,
  submitBtnText,
  onSubmit,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [gifFile, setGifFile] = React.useState();
  const [imgPreview, setImgPreview] = React.useState("");

  useEffect(() => {
    if (gifFile) {
      const objectUrl = URL.createObjectURL(gifFile);
      console.log(objectUrl);
      setImgPreview(objectUrl);
    }
  }, [gifFile]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {title} <AddAPhotoOutlinedIcon />
      </DialogTitle>
      <DialogContent>
        <img
          src={
            imgPreview ||
            "https://c.tenor.com/40RSTQMiDIYAAAAC/uploading-downloading.gif"
          }
          width="100%"
          alt="Upload preview"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" component="label" color="secondary" autoFocus>
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
            variant="text"
            onClick={() => onSubmit(gifFile)}
          >
            {submitBtnText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GifUploadDialog;
