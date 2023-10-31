import React from "react";
import "./orders.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOrderQuery } from "../../service/order.service";

import { GiHotMeal } from "react-icons/gi";
import { BiSolidTimer } from "react-icons/bi";
import { IoMdDoneAll } from "react-icons/io";

export const OrderById = () => {
  const location = useLocation().pathname;
  const id = location.split("/").pop();
  const navigate = useNavigate();
  const { data = [] } = useGetOrderQuery(`${id}-stoll`);
  console.log(data);
  return (
    <div className="order_box">
      <p>{location.split("/").pop()} - stoll</p>
      {data?.innerData?.map((item) => {
        const product_data = JSON.parse(item?.product_data || "[]");
        console.log(product_data);
        return product_data?.map((item) => {
          return (
            <div className="order_box__item" key={item.id}>
              <p>{item.name}</p>
              <p>{item?.quantity} ta</p>
              <span>{item?.price} so'm</span>
              <i className="item_status">
                {item.status === 1 ? (
                  <span>
                    <BiSolidTimer
                      style={{ fontSize: "var(--fs3)", marginTop: "20px" }}
                    />
                    <GiHotMeal />
                  </span>
                ) : (
                  <span>
                    <IoMdDoneAll />
                  </span>
                )}
              </i>
            </div>
          );
        });
      })}
      <div className="order_footer">
        <button onClick={() => navigate(-1)}>Orqaga</button>
        <button onClick={() => navigate(`/category${location}`)}>
          Buyutma qo'shish
        </button>
        <button>Hisobni yakunlash</button>
      </div>
    </div>
  );
};