import { useEffect, useState } from "react";
import DefaultPage from "../../common/DefaultPage";
import { apiBaseUrl } from "../../../api/api";
import Avatar from "@mui/material/Avatar";
import MuiSwitch from "./../../common/MuiSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Post from "../../common/Post";

const UserProfilePage = (props) => {
    const [profileData, setProfileData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch(apiBaseUrl + "/users/profile", {
            headers: { token: `JWT ${props.token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (!data._id) {
                    setErrorMessage(data.message || "Error loading user data.");
                    return;
                }
                setProfileData(data);
            });
    }, [props.token]);

    return (
        <DefaultPage title="UserProfile" token={props.token}>
            <Avatar
                sx={{ width: 200, height: 200 }}
                alt={profileData.username}
                src={
                    apiBaseUrl +
                    "/profilePictures/" +
                    profileData.profilePicture
                }
            />
            <p>{profileData.username}</p>
            <FormControlLabel
                control={<MuiSwitch sx={{ m: 1 }} defaultChecked />}
                label={profileData.status}
            />
            {profileData.posts &&
                profileData.posts.map((post) => (
                    <Post key={post._id} {...post} token={props.token} />
                ))}
        </DefaultPage>
    );
};

export default UserProfilePage;
