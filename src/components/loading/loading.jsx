import React, { memo } from "react";
import "./loading.css";
import { BiLoader } from "react-icons/bi";

export const LoadingBtn = memo(() => {
  return (
    <div className="loading_btn">
      <BiLoader />
    </div>
  );
});
