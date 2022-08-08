import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { apiBaseUrl } from "../../../api/api";
import ReplyIcon from "@mui/icons-material/Reply";
import React from "react";
import ReplyToPostDialog from "../../common/ReplyToPostDialog";

const Post = ({
  _id,
  filepath,
  postedBy,
  postedAt,
  likes = [17, 9, 4],
  replies,
  token,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openReplyDialog = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        width: "fit-content",
        mb: 3,
      }}
    >
      <img src={apiBaseUrl + "/" + filepath} alt={`Post of user ${postedBy}`} />

      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex" }}>
          <Button sx={{ fontSize: "large" }}>😍 ({likes[0]})</Button>
          <Button sx={{ fontSize: "large" }}>😎 ({likes[1]})</Button>
          <Button sx={{ fontSize: "large" }}>🤮 ({likes[2]})</Button>
        </Box>

        <IconButton variant="" color="primary" onClick={openReplyDialog}>
          <ReplyIcon />
        </IconButton>
      </Box>

      <ReplyToPostDialog
        open={open}
        handleClose={handleClose}
        token={token}
        postId={_id}
      />
    </Box>
  );
};

export default Post;
