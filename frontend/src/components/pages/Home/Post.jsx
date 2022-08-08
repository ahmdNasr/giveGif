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
  replyPath = "replies", // replies.3.replies
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
        // placeItems: "center",
        width: "fit-content",
        mb: 3,
      }}
    >
      <Box sx={{ width: 480 }}>
        <img
          width="100%"
          src={apiBaseUrl + "/" + filepath}
          alt={`Post of user ${postedBy}`}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
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
      </Box>

      <Box sx={{ ml: 8 }}>
        {replies &&
          replies.map(
            (
              { filepath, postedAt, postedBy, replies: replyReplies, likes },
              replyIndex
            ) => (
              <Post
                key={filepath}
                filepath={filepath}
                postedAt={postedAt}
                postedBy={postedBy}
                replies={replyReplies}
                likes={likes}
                // egal wie tief man jetzt posts rendert, _id (postId) und token bleiben gleich
                _id={_id}
                token={token}
                replyPath={`${replyPath}.${replyIndex}.replies`} // replies.3.replies.6.replies
              />
            )
          )}
      </Box>

      <ReplyToPostDialog
        open={open}
        handleClose={handleClose}
        token={token}
        postId={_id}
        replyPath={replyPath}
      />
    </Box>
  );
};

export default Post;
