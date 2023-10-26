import React, { memo } from "react";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { RiMenu3Fill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";

export const Navbar = memo(() => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <div className="box" style={{ background: "#222" }}>
      <div className="header">
        <div className="menu" onClick={() => navigate(-1)}>
          {location !== "/" && <BiArrowBack />}
        </div>
        <p>Tables</p>
        <div className="menu">
          <RiMenu3Fill />
        </div>
      </div>
    </div>
  );
});
