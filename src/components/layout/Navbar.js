import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useWindowSize } from "../hooks/useWindowSize";

import menu from "../../img/menu.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const [toggle, setToggle] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("User");
  };

  const toggleMenu = () => {
    setToggle((prevState) => !prevState);
  };
  let checkAuthenticate = (
    <div className="container">
      <div className="navbar">
        <nav>
          <ul
            style={{
              display: width > 800 ? "block" : toggle ? "block" : "none",
            }}
          >
            <li>
              <NavLink
                className={(linkData) => (linkData.isActive ? "active" : "")}
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(linkData) => (linkData.isActive ? "active" : "")}
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(linkData) => (linkData.isActive ? "active" : "")}
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(linkData) => (linkData.isActive ? "active" : "")}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            {isAuthenticated === true ? (
              <>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to='/dashboard'
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    onClick={logout}
                    to="/"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/Login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={(linkData) =>
                      linkData.isActive ? "active" : ""
                    }
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <img src={menu} className="menu-icon" alt="" onClick={toggleMenu} />
      </div>
    </div>
  );
  return <>{checkAuthenticate}</>;
};

export default Navbar;
