import React from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const data = Array(20).fill(category);

  const handleTarget = (item) => {
    navigate(`/order/${item.id}/${item.name}`);
  };

  return (
    <div className="universal_box  res_products">
      <p>Kategoriyalar</p>
      {data.map((item) => {
        return (
          <span
            className="res_category_item"
            key={item.id}
            onClick={() => handleTarget({ id: item.id, name: item.name })}
          >
            {item.name}
          </span>
        );
      })}
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
        <button>Rasmiylashtirish</button>
      </div>
    </div>
  );
};
