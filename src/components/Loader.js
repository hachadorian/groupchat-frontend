import React from "react";
import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-full dark flex items-center justify-center">
      <FadeLoader color="#686B6A" />
    </div>
  );
};

export default Loader;
