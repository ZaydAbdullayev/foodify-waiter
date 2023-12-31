import React, { memo, useState } from "react";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetLocationQuery } from "../../service/table.service";
import { useAddTableMutation } from "../../service/table.service";
import { LoadingBtn } from "../loading/loading";
import { enqueueSnackbar as es } from "notistack";
import { PatternFormat } from "react-number-format";

import { RiMenu3Fill } from "react-icons/ri";
import { BiArrowBack, BiSolidFoodMenu } from "react-icons/bi";
import { MdTableBar } from "react-icons/md";

export const Navbar = memo(() => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { data: category = [] } = useGetLocationQuery();
  const [newType, setNewType] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("4");
  const [addTable] = useAddTableMutation();
  const stoll = location
    .split("/")
    .join(" ")
    .split("category")
    .pop()
    .split(" ");

  const addNewTable = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    try {
      setLoading(true);
      const { data } = await addTable(values);
      if (data) {
        setOpen(false);
        es("Joylashuv qo'shildi!", { variant: "success" });
        e.target.reset();
      }
    } catch (err) {
      alert("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const backWord = () => {
    navigate(-1);
  };

  return (
    <div className="box" style={{ background: "#222" }}>
      <div className="header">
        <div className="menu">
          {location !== "/" ? (
            <BiArrowBack onClick={() => backWord()} />
          ) : (
            <BiSolidFoodMenu onClick={() => navigate("/my/orders")} />
          )}
        </div>
        <p style={{ textTransform: "capitalize" }}>
          {location === "/"
            ? "Tables"
            : location === "/my/orders" || location.startsWith("/payment/check")
            ? `${stoll[1]} ${stoll[2]}`
            : `${stoll[1]} ${stoll[2]} - stoll`}
        </p>
        <div className="menu">
          {location === "/" && (
            <span className="add_table_btn" onClick={() => setOpen(true)}>
              <b>+</b>
              <MdTableBar />{" "}
            </span>
          )}{" "}
          <RiMenu3Fill />
        </div>
      </div>
      <div
        className={open ? "add_table_container open" : "add_table_container"}
      >
        <div className="add_table__box">
          <form className="add_table" onSubmit={addNewTable}>
            <p>Yangi xona/stoll qo'shish</p>
            <select
              name="location"
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value="">Joylashuv tanlang</option>
              {category?.data?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value="new">Yangi joylashuv oshish</option>
            </select>
            {newType === "new" && (
              <input
                type="text"
                name="location"
                required
                autoComplete="off"
                placeholder="Joylashuv nomi qo'shing *"
              />
            )}
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              placeholder={`Xona/Stoll raqamini kiriting *`}
            />
            <select name="people" onChange={(e) => setType(e.target.value)}>
              <option value="4">Xona/Stoll sig'imi</option>
              <option value="4">4 kishilik</option>
              <option value="6">6ta kishilik</option>
              <option value="8">8ta kishilik</option>
              <option value="10">10ta kishilik</option>
              <option value="manual">Qo'lda kiritish</option>
            </select>
            {type === "manual" && (
              <input
                type="number"
                name="people"
                required
                autoComplete="off"
                placeholder="Xona/Stoll sig'imi *"
              />
            )}
            <PatternFormat
              name="percentage"
              placeholder="Stoll uchun foizni kiritish"
              format="##%"
              mask="_"
              autoComplete="off"
            />
            <input
              type="text"
              name="minutelyCost"
              autoComplete="off"
              placeholder="Minutlik narx *"
            />
            <input type="hidden" name="res_id" value={user?.user?.id} />
            <button className="relative">
              {loading ? <LoadingBtn /> : "Qo'shish"}
            </button>
          </form>
          <i onClick={() => setOpen(false)}></i>
        </div>
      </div>
    </div>
  );
});
