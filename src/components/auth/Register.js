import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER_REGISTER } from "../hooks/LoginAndRegister";
import { useMutation } from "@apollo/client";
import { authActions } from "../../store/auth";
import setAuthToken from "../../utils/setAuthToken";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [usernameLength, setUsernameLength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userRegister] = useMutation(USER_REGISTER, {
    fetchPolicy: "no-cache",
    variables: {
      name,
      lastName,
      username,
      password,
      userRole: "Admin",
    },
    onCompleted: (data) => {
      return data;
    },
  });
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    if (usernameLength < 0) {
      return;
    }
    setPasswordMatch(true);


    userRegister()
      .then((res) => {
        const data = res.data;

        if (data) {
          dispatch(
            authActions.authenticate({
              _id: data.createUser._id,
              name: data.createUser.name,
              lastName: data.createUser.lastName,
              username: data.createUser.username,
              token: data.createUser.token,
              insurancePlan: data.createUser.insurancePlan,
              roleName: data.createUser.userRole.name,
              authState: true,
            })
          );

          localStorage.setItem(
            "User",
            JSON.stringify({
              _id: data.createUser._id,
              name: data.createUser.name,
              lastName: data.createUser.lastName,
              username: data.createUser.username,
              token: data.createUser.token,
              insurancePlan: data.createUser.insurancePlan,
              roleName: data.createUser.userRole.name,
              authState: true,
            })
          );
          setAuthToken(data.createUser.token);
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <span>Register</span>
              </div>
              <form onSubmit={onSubmitForm}>
                <input type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                 <input type="text" value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value); setUsernameLength(e.target.value.length)}}
                  placeholder="Username"
                  onFocus={(e) => setUsernameFocused(true)}
                />
                {usernameFocused && username.length <= 6 && (
                  <p style={{ color: "red", fontSize: "12px", textAlign: "left" }}>
                    Username must be more the 6 characters
                  </p>
                )}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                {!passwordMatch && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "left",
                    }}
                  >
                    Password and Confirm password doesn't match
                  </p>
                )}
                <button type="submit" className="btn">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
