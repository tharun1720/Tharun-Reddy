import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import Auth from "./Auth";
import Header from "../../components/Header";

function Navigator() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated ? <Main /> : <Auth />}
      </Router>
    </>
  );
}

export default Navigator;
