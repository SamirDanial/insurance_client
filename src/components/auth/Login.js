import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { authActions } from "../../store/auth";
import { USER_LOGIN } from "../hooks/LoginAndRegister";
import { useLazyQuery } from "@apollo/client";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginUser /*, { loading, data, error, called }*/] = useLazyQuery(
    USER_LOGIN,
    {
      fetchPolicy: "no-cache",
      variables: {
        username,
        password,
      },
      onCompleted: (data) => {
        return data;
      },
    }
  );

  const onSubmitForm = (e) => {
    e.preventDefault();
    loginUser().then((res) => {
      const data = res.data;
      const error = res.error;
      if (error) {
        alert("Username or password is incorrect");
      }
      if (data) {
        dispatch(
          authActions.authenticate({
            _id: data.loginUser._id,
            name: data.loginUser.name,
            lastName: data.loginUser.lastName,
            username: data.loginUser.username,
            token: data.loginUser.token,
            insurancePlan: data.loginUser.insurancePlan,
            roleName: data.loginUser.userRole.name,
            authState: true,
          })
        );

        localStorage.setItem(
          "User",
          JSON.stringify({
            _id: data.loginUser._id,
            name: data.loginUser.name,
            lastName: data.loginUser.lastName,
            username: data.loginUser.username,
            token: data.loginUser.token,
            insurancePlan: data.loginUser.insurancePlan,
            roleName: data.loginUser.userRole.name,
            authState: true,
          })
        );
        setAuthToken(data.loginUser.token);
        navigate("/dashboard", { replace: true });
      }
    });
  };

  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <span>Login</span>
              </div>
              <form onSubmit={onSubmitForm}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
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

export default Login;
