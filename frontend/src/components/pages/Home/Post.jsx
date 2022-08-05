import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { apiBaseUrl } from "../../../api/api";
import ReplyIcon from "@mui/icons-material/Reply";

const Post = ({
  _id,
  filepath,
  postedBy,
  postedAt,
  likes = [17, 9, 4],
  replies,
}) => {
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

        <IconButton variant="" color="primary">
          <ReplyIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Post;
