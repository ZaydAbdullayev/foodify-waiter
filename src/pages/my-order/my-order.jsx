import React from "react";
import "./my-order.css";
import { useNavigate } from "react-router-dom";

import { GiHotMeal } from "react-icons/gi";
import { IoMdDoneAll } from "react-icons/io";
import { NumericFormat } from "react-number-format";

export const MyOrder = () => {
  const navigate = useNavigate();
  const reversedData = data.slice().reverse();
  const totalPrice = data.reduce((acc, current) => {
    return acc + current.price;
  }, 0);

  return (
    <div className="my_order_main">
      <div className="my_order__body">
        <div className="my_order__item">
          <p>ID</p>
          <p>Stoll</p>
          <p>Vaqti</p>
          <span>To'lov</span>
          <span>Usluga (10%)</span>
          <p>Status</p>
        </div>
        {reversedData.map((item, index) => {
          const reverseIndex = data.length - index;
          return (
            <div
              className="my_order__item"
              key={item.id}
              onClick={() => navigate(`/${item.type}/${item.stoll}`)}
            >
              <p>{reverseIndex}</p>
              <p>{item.stoll} - stoll</p>
              <p>
                {item.resieveAt} | {item.time}
              </p>
              <NumericFormat
                displayType="text"
                value={item.price}
                thousandSeparator=" "
                suffix=" so'm"
              />
              <NumericFormat
                displayType="text"
                value={item.price * 0.1}
                thousandSeparator=" "
                suffix=" so'm"
              />
              <p>
                <i
                  style={{ background: item.status === 1 ? "#fc0" : "#6a994a" }}
                >
                  {item.status === 1 ? <GiHotMeal /> : <IoMdDoneAll />}
                </i>
              </p>
            </div>
          );
        })}
        <div className="my_order__item">
          <p></p>
          <p></p>
          <p></p>
          <span></span>
          <NumericFormat
            displayType="text"
            value={totalPrice * 0.1}
            thousandSeparator=" "
            suffix=" so'm"
          />
          <p></p>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    id: 932847,
    stoll: 12,
    resieveAt: "12/12/2023",
    type: "tashqari",
    price: 120000,
    status: 2,
    time: "12:30",
  },
  {
    id: 922147,
    stoll: 11,
    resieveAt: "12/12/2023",
    type: "tashqari",
    price: 100000,
    status: 1,
    time: "13:30",
  },
  {
    id: 123347,
    stoll: 15,
    resieveAt: "12/12/2023",
    type: "tashqari",
    price: 200000,
    status: 2,
    time: "13:36",
  },
  {
    id: 678732,
    stoll: 7,
    resieveAt: "12/12/2023",
    type: "tashqari",
    price: 310000,
    status: 1,
    time: "14:00",
  },
  {
    id: 234553,
    stoll: 1,
    resieveAt: "12/12/2023",
    type: "tashqari",
    price: 90000,
    status: 1,
    time: "14:13",
  },
];
