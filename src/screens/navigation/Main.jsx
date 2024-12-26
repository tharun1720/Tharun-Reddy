import React from "react";
import Orders from "../main/order";
import { main_route } from "../../constants/routes";
import { Route, Routes } from "react-router-dom";
import Page404 from "../Page404";

function Main() {
  return (
    <Routes>
      <Route path={main_route.order} element={<Orders />} />
      <Route path={"*"} element={<Page404 />} />
    </Routes>
  );
}

export default Main;
