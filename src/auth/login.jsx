import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { ClearForm } from "../service/form.service";
import { useLoginWaiterMutation } from "../service/user.service";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [loginDep] = useLoginWaiterMutation();
  const [show, setShow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = Object.fromEntries(formData.entries());
    loginData.username = loginData?.username?.split(" ").join("_");

    const { error, data } = await loginDep(loginData);
    if (error) {
      handleLoginError();
      return;
    }
    localStorage.setItem("user", JSON.stringify(data.innerData.user));
    localStorage.setItem("check", JSON.stringify(true));
    navigate("/check");
    setErr(false);
  };

  const handleLoginError = () => {
    setErr(true);
    ClearForm("#form");
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} id="form">
        <h1>Hisobga kirish</h1>

        <input
          type="text"
          name="username"
          placeholder="Ism kiritng"
          required
          autoComplete="off"
          autoCapitalize="off"
          className="input"
          style={err ? { border: "1px solid tomato", padding: "4.5% 3%" } : {}}
        />
        <label>
          <input
            type={show ? "password" : "text"}
            name="password"
            placeholder="Parol kiriting"
            required
            autoComplete="off"
            className="input"
            style={err ? { border: "1px solid tomato" } : {}}
          />
          <span onClick={handleShow} style={show ? {} : { color: "orange" }}>
            {show ? <BsEyeSlash /> : <BsEye />}
          </span>
          <p style={err ? { display: "flex" } : {}} className="failed">
            Foydalanuvchi yoki parol xaroligi...!
          </p>
        </label>
        <input type="hidden" name="role" value={"worker"} />
        <button className="log_btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};
