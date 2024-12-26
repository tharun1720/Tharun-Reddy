import React from "react";
import { Route, Routes } from "react-router-dom";
import { auth_route } from "../../constants/routes";
import Login from "../auth/login";
import SignUp from "../auth/signup";
import Page404 from "../Page404";

function Auth() {
  return (
    <Routes>
      <Route path={auth_route.login} element={<Login />} />
      <Route path={auth_route.signUp} element={<SignUp />} />
      <Route path={"*"} element={<Page404 />} />
    </Routes>
  );
}

export default Auth;
