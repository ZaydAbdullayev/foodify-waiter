import React, { useState, useMemo } from "react";
import "./products.css";
import "./cart.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CalculateTotalPrice } from "../../service/calc.service";
import { useGetProductQuery } from "../../service/order.service";
import io from "socket.io-client";
import { NumericFormat } from "react-number-format";

import { LuShoppingBasket } from "react-icons/lu";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://lncxlmks-80.inc1.devtunnels.ms");

export const Products = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { data = [] } = useGetProductQuery();
  const position = location.pathname.split("/");
  const uniqueCategories = [
    ...new Set(data?.innerData?.map((food) => food.category)),
  ];
  const category =
    location.search.split("=")[1]?.split("%20")?.join("") ||
    uniqueCategories[0];
  const cart = useMemo(
    () => JSON.parse(localStorage.getItem("cart")) || [],
    [update]
  );
  const total = CalculateTotalPrice(cart);

  const handleTarget = (item) => {
    navigate(`?category=${item.name}`);
  };

  const addToCart = (item) => {
    setUpdate(!update);
    const cartItem = cart?.find((x) => x?.id === item?.id);
    if (cartItem) {
      cartItem.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const updateCart = (item) => {
    setUpdate(!update);
    const cartItem = cart.find((x) => x.id === item.id);
    if (cartItem && item.quantity > 0) {
      cartItem.quantity = item.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else if (cartItem && item.quantity === 0) {
      const index = cart.indexOf(cartItem);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const resieveOrderS = async () => {
    const paymentData = {
      restaurant_id: user?.user?.id,
      user_id: `${position[3]}-stoll`,
      product_data: JSON.stringify(cart),
      price: total,
      payment: "token",
      longitude: position[2],
      latitude: position[3],
      description: user?.user?.user_id,
    };
    if (!cart.length) {
      alert("Savatcha bo'sh");
      return;
    }
    socket.emit("/order", paymentData);
    navigate("/");
  };

  const filteredData = data?.innerData?.filter(
    (item) => item?.category?.split(" ")?.join("") === category
  );

  return (
    <div className="res_products">
      <div className="res_category">
        <p>Kategoriyalar</p>
        <div className="res_category_box">
          {uniqueCategories?.map((item, index) => {
            return (
              <span
                key={index}
                onClick={() => handleTarget({ id: index + 1, name: item })}
                className={category === item ? "active" : ""}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="res_menu">
        <p>Mahsulotlar</p>
        <div className="res_menu_box">
          {filteredData?.map((item) => {
            return (
              <div
                className="res_menu_item"
                key={item?.id}
                onClick={() => addToCart(item)}
              >
                <p style={{ textTransform: "capitalize" }}>{item.name}</p>
                <span>{item.description}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="book_order">
        <span onClick={() => setOpen(!open)}>
          <LuShoppingBasket /> {cart?.length ? <span></span> : <></>}
        </span>
        <button onClick={() => resieveOrderS()}>Rasmiylashtirish</button>
      </div>
      <div className={open ? "cart_box open" : "cart_box"}>
        <p>
          <span>Mahsulotlar</span>
        </p>
        <div className="cart_body">
          {cart?.map((item) => {
            return (
              <div className="cart_body__item">
                <p>{item?.name}</p>
                <p>{item?.description}</p>
                <NumericFormat
                  value={item?.price * item?.quantity}
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" so'm"
                />{" "}
                <div className="update_item">
                  <button
                    onClick={() =>
                      updateCart({ id: item.id, quantity: item.quantity - 1 })
                    }
                  >
                    –
                  </button>
                  <input
                    type="number"
                    defaultValue={item?.quantity}
                    onChange={(e) =>
                      updateCart({
                        id: item.id,
                        quantity: e.target.value,
                      })
                    }
                  />
                  <button
                    onClick={() =>
                      updateCart({ id: item.id, quantity: item.quantity + 1 })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <p>
            <span>Jami:</span>{" "}
            <NumericFormat
              value={total || 0}
              thousandSeparator=" "
              displayType="text"
              suffix=" so'm"
            />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
