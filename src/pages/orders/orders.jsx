import React from "react";
import "./orders.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetOrderQuery } from "../../service/order.service";
import socket from "../../socket.config";

import { GiHotMeal } from "react-icons/gi";
import { BiSolidTimer } from "react-icons/bi";
import { IoMdDoneAll } from "react-icons/io";
import { LoadingBtn } from "../../components/loading/loading";

export const OrderById = () => {
  const location = useLocation().pathname;
  const id = location.split("/").pop();
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetOrderQuery(id);

  const finish = () => {
    const uData = {
      id: id,
      status: 0,
    };
    socket.emit("/update/table", uData);
    navigate("/");
  };

  return (
    <div className="order_box">
      {isLoading ? (
        <span className="loader_box">
          <LoadingBtn />
        </span>
      ) : (
        data?.innerData?.map((item) => {
          const product_data = JSON.parse(item?.product_data || "[]");
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
        })
      )}
      <div className="order_footer">
        <button onClick={() => navigate(`/payment/check/${id}`)}>
          Check chiqarish
        </button>
        <button onClick={() => navigate(`/category${location}`)}>
          Buyutma qo'shish
        </button>
        <button onClick={() => finish()}>Hisobni yakunlash</button>
      </div>
    </div>
  );
};
