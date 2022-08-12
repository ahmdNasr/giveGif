import { useEffect, useState } from "react";
import DefaultPage from "../../common/DefaultPage";
import { apiBaseUrl } from "../../../api/api";
import Avatar from "@mui/material/Avatar";
import MuiSwitch from "./../../common/MuiSwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Post from "../../common/Post";
import AddProfilePicture from "./AddProfilePicture";

const UserProfilePage = (props) => {
  const [profileData, setProfileData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(apiBaseUrl + "/users/profile", {
      headers: { token: `JWT ${props.token}` },
    })
      .then((res) => res.json())
      .then((profileData) => {
        if (!profileData._id) {
          setErrorMessage(profileData.message || "Error loading user data.");
          return;
        }
        setProfileData(profileData);
      });
  }, [props.token]);

  const changeUserStatus = async (e) => {
    const status = e.target.checked ? "on the line" : "off the line";
    fetch(apiBaseUrl + "/users/changestatus", {
      method: "PUT",
      headers: {
        token: `JWT ${props.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((profileData) => {
        if (!profileData._id) {
          setErrorMessage(profileData.message || "Error loading user data.");
          return;
        }
        setProfileData((prev) => ({ ...prev, ...profileData }));
      });
  };

  return (
    <DefaultPage
      title="UserProfile"
      token={props.token}
      setToken={props.setToken}
    >
      <Avatar
        sx={{ width: 200, height: 200 }}
        alt={profileData.username}
        src={apiBaseUrl + "/profilePictures/" + profileData.profilePicture}
      />
      <p>{profileData.username}</p>
      <FormControlLabel
        control={
          <MuiSwitch sx={{ m: 1 }} defaultChecked onChange={changeUserStatus} />
        }
        label={profileData.status}
      />
      {profileData.posts &&
        profileData.posts.map((post) => (
          <Post key={post._id} {...post} token={props.token} />
        ))}

      <AddProfilePicture token={props.token} />
    </DefaultPage>
  );
};

export default UserProfilePage;
