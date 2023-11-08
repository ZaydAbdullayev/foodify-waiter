import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { ClearForm } from "../service/form.service";
import { useLoginWaiterMutation } from "../service/user.service";
import { useCheckDepMutation } from "../service/user.service";
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

export const CheackDepartment = () => {
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [checkDep] = useCheckDepMutation();

  const loginD = async () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    try {
      const { error, data } = await checkDep(pass);
      if (error) return alert("Pin xato!");
      if (data) {
        const dep = data?.innerData?.user?.user?.department;
        const mergedUser = {
          ...user,
          user: { ...user?.user, ...data?.innerData?.user?.user },
        };
        localStorage.setItem("department", JSON.stringify(dep));
        localStorage.setItem("user", JSON.stringify(mergedUser));
        window.location.href = "/";
      }
    } catch (error) {
      setErr(true);
      setPass("");
    }
  };

  const removeLastDigit = () => {
    if (pass.length > 0) {
      setPass(pass.slice(0, -1));
    }
  };

  return (
    <div className="login">
      <label className="cheack_d">
        <p>Bo'limingiz parolini kiriting</p>
        <label>
          <span
            style={
              pass.length <= 6 && !err
                ? {}
                : { border: "1px solid tomato", color: "tomato" }
            }
          >
            {pass}
          </span>
          <button onClick={() => setPass(`${pass}1`)}>1</button>
          <button onClick={() => setPass(`${pass}2`)}>2</button>
          <button onClick={() => setPass(`${pass}3`)}>3</button>
          <button onClick={() => setPass(`${pass}4`)}>4</button>
          <button onClick={() => setPass(`${pass}5`)}>5</button>
          <button onClick={() => setPass(`${pass}6`)}>6</button>
          <button onClick={() => setPass(`${pass}7`)}>7</button>
          <button onClick={() => setPass(`${pass}8`)}>8</button>
          <button onClick={() => setPass(`${pass}9`)}>9</button>
          <button onClick={() => setPass(`${pass}0`)}>0</button>
          <button onClick={() => setPass("")}>AC</button>
          <button onClick={removeLastDigit}>⨉</button>
        </label>
        <button onClick={loginD}>Kirish</button>
      </label>
    </div>
  );
};
