import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { apiBaseUrl } from "../../../api/api";
import ReplyIcon from "@mui/icons-material/Reply";
import React from "react";
import ReplyToPostDialog from "../../common/ReplyToPostDialog";
import moment from "moment";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Post = ({
    _id,
    filepath,
    postedBy,
    postedAt,
    likes = [17, 9, 4],
    replies,
    token,
    replyPath = "replies", // replies.3.replies,
    onReply,
}) => {
    const [open, setOpen] = React.useState(false);
    const [toggleReplies, setToggleReplies] = React.useState(false);

    const handleToggleReplies = () => {
        setToggleReplies(!toggleReplies);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const openReplyDialog = () => {
        setOpen(true);
    };

    return (
        <Card
            sx={{
                // placeItems: "center",
                width: "min(100%, 600px)",
                mb: 3,
                color: "primary.dark",
                bgcolor: "primary.light",
            }}
        >
            <CardHeader
                title={"By " + postedBy}
                subheader={moment(postedAt).fromNow()}
                avatar={
                    <Avatar
                        sx={{ bgcolor: "primary.dark" }}
                        aria-label="recipe"
                    >
                        R
                    </Avatar>
                }
            />
            <CardMedia
                component="img"
                width="100%"
                image={apiBaseUrl + "/" + filepath}
                alt={`Post of user ${postedBy}`}
            />

            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <Button sx={{ fontSize: "large" }}>
                        <FavoriteOutlinedIcon /> ({likes[0]})
                    </Button>
                    <Button sx={{ fontSize: "large" }}>
                        <ThumbUpIcon /> ({likes[1]})
                    </Button>
                    <Button sx={{ fontSize: "large" }}>
                        <ThumbDownIcon /> ({likes[2]})
                    </Button>
                    <Button
                        sx={{ fontSize: "large" }}
                        onClick={handleToggleReplies}
                    >
                        <ChatBubbleOutlinedIcon /> ({replies.length})
                    </Button>
                </Box>

                <IconButton
                    variant=""
                    color="primary"
                    onClick={openReplyDialog}
                >
                    <ReplyIcon />
                </IconButton>
            </CardActions>
            {toggleReplies && (
                <CardContent
                    sx={{
                        bgcolor: "white",
                        border: "1px solid hsl(42, 33%, 94%)",
                        borderTop: "none",
                    }}
                >
                    <Box sx={{}}>
                        {replies &&
                            replies.map(
                                (
                                    {
                                        filepath,
                                        postedAt,
                                        postedBy,
                                        replies: replyReplies,
                                        likes,
                                    },
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
                                        onReply={onReply}
                                    />
                                )
                            )}
                    </Box>
                </CardContent>
            )}

            <ReplyToPostDialog
                open={open}
                handleClose={handleClose}
                token={token}
                postId={_id}
                replyPath={replyPath}
                onReply={onReply}
            />
        </Card>
    );
};

export default Post;
