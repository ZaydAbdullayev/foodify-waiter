import React, { memo, useState } from "react";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetLocationQuery } from "../../service/table.service";
import { useAddTableMutation } from "../../service/table.service";

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
  const [addTable] = useAddTableMutation();

  const addNewTable = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const { data } = await addTable(values);
    if (data) {
      setOpen(false);
    }
  };

  // <span className="add_table_btn" onClick={() => setOpen(true)}>
  //   <b>+</b>
  //   <MdTableBar />
  // </span>

  return (
    <div className="box" style={{ background: "#222" }}>
      <div className="header">
        <div className="menu">
          {location !== "/" ? (
            <BiArrowBack onClick={() => navigate(-1)} />
          ) : (
            <BiSolidFoodMenu onClick={() => navigate("/my/orders")} />
          )}
        </div>
        <p style={{ textTransform: "capitalize" }}>
          {location === "/" ? "Tables" : location.split("/").join(" ")}
        </p>
        <div className="menu">
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
              <option value="">Bo'lim tanlang</option>
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
                placeholder="Joylashuv nomi qo'shing*"
              />
            )}
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              placeholder="Xona yoki Stoll raqamini kiriting*"
            />
            <input type="hidden" name="res_id" value={user?.user?.id} />
            <button>Qo'shish</button>
          </form>
          <i onClick={() => setOpen(false)}></i>
        </div>
      </div>
    </div>
  );
});
