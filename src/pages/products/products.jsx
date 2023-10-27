import React from "react";
import "./products.css";
import { useNavigate, useLocation } from "react-router-dom";

import { LuShoppingBasket } from "react-icons/lu";

export const Products = () => {
  const navigate = useNavigate();
  const location = useLocation().search.split("=").pop() || category.name;
  console.log(location);
  const data = Array(20).fill(category);
  const Pdata = Array(50).fill(category);

  const handleTarget = (item) => {
    navigate(`?category=${item.name}`);
  };

  return (
    <div className="res_products">
      <div className="res_category">
        <p>Kategoriyalar</p>
        <div className="res_category_box">
          {data.map((item) => {
            return (
              <span
                key={item.id}
                onClick={() => handleTarget({ id: item.id, name: item.name })}
                className={location === item.name ? "active" : ""}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="res_menu">
        <p>Mahsulot</p>
        <div className="res_menu_box">
          {Pdata.map((item) => {
            return (
              <span className="res_menu_item" key={item.id}>
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="book_order">
        .<button>Rasmiylashtirish</button>
      </div>
    </div>
  );
};

const category = {
  id: 234,
  name: "salatlar",
};

export const ProductsList = () => {
  const data = Array(50).fill(category);
  return (
    <div className="order_container">
      <div className="universal_box order_list_box">
        <p>Mahsulot</p>
        {data.map((item) => {
          return (
            <span className="res_category_item order_list_item" key={item.id}>
              {item.name}
            </span>
          );
        })}
      </div>
      <div className="book_order">
        <span>
          <LuShoppingBasket />
          {data.length}
        </span>
        <button>Rasmiylashtirish</button>
      </div>
    </div>
  );
};
