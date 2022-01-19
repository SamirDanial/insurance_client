import React, { useEffect } from "react";
import { authActions } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, createHttpLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import "./App.css";

import { Home, Navbar, About, Products, Login, Register, Contact, InsurancePlans, Profile, EditProfile } from './components';

import ProtectedRoutes from "./protectedRoutes";
// import AdminRoutes from "./adminRoutes";

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = JSON.parse(localStorage.getItem('User')) || '';
  const token = authToken !== '' ? authToken.token : '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-auth-token': token
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  const isAuth = useSelector((state) => state.auth.authenticated);
  // const isAdminRole = useSelector((state) => state.auth.roleName) === "Admin" ? true : false;
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      dispatch(
        authActions.authenticate({
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          username: user.username,
          token: user.token,
          roleName: user.roleName,
          insurancePlan: user.insurancePlan,
          authState: user.authState,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route element={<ProtectedRoutes isAuthen={isAuth} />}>
                  <Route path="/dashboard" element={<InsurancePlans />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/editProfile" element={<EditProfile />}/>
            </Route>
          </Routes>
        </Router>
      </ApolloProvider>
    </>
  );
}


export default App;
