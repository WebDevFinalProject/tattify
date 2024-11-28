import React from "react";
import { Outlet } from "react-router-dom";
import SkinCare from "../components/article/SkinCare";
import TattooHistory from "../components/article/TattooHistory";

const Articles = () => {
  return (
    <>
      <Outlet />
      <SkinCare />
      <TattooHistory />
    </>
  );
};

export default Articles;
