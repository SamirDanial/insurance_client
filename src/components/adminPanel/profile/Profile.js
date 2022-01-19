import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.auth);

  return profile._id === "" ? (
    <div className="userProfilePage">
      <table className="userProfile">
        <tbody>
          <tr>
            <td>You haven't yet introduce your self to us</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={() => navigate("/createProfile")} className="btn">Complete Profile</button>
      </div>
    </div>
  ) : (
    <div className="userProfilePage">
      <table className="userProfile">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <td>Last Name:</td>
            <td>{profile.lastName}</td>
          </tr>
          <tr>
            <td>username:</td>
            <td>{profile.username}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={() => navigate("/editProfile")} className="btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
