import React, { useState, useMemo } from "react";
import "./products.css";
import "./cart.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CalculateTotalPrice } from "../../service/calc.service";
import { useGetProductQuery } from "../../service/order.service";
import io from "socket.io-client";
import { NumericFormat } from "react-number-format";
import { LoadingBtn } from "../../components/loading/loading";
import { enqueueSnackbar as es } from "notistack";

import { LuShoppingBasket } from "react-icons/lu";
import { BiCircle, BiCheck } from "react-icons/bi";
import { FiCheckCircle } from "react-icons/fi";
import { TbMessage2Plus } from "react-icons/tb";

// const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
const socket = io("https://799twrl4-80.euw.devtunnels.ms");

export const Products = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [takeaway, setTakeaway] = useState(false);
  const [desc, setDesc] = useState(false);
  const [extra, setExtra] = useState("");
  const location = useLocation();
  const { data = [], isLoading } = useGetProductQuery();
  const position = location.pathname.split("/");
  const uniqueCategories = [
    ...new Set(data?.innerData?.map((food) => food?.category)),
  ];
  const category =
    location.search.split("=")[1]?.split("%20")?.join("") ||
    uniqueCategories[0];
  const cart = useMemo(() => {
    return JSON?.parse(localStorage?.getItem("cart")) || [];
  }, []);
  const total = CalculateTotalPrice(cart);

  const paymentData = {
    address: `&${position[3]}-stoll`,
    restaurant_id: user?.user?.id,
    user_id: position[4],
    product_data: JSON.stringify(cart),
    price: total,
    payment: "token",
    table_name: position[3],
    worker_name: user?.user?.name,
    worker_id: user?.user?.user_id,
    order_type: takeaway ? "Olib ketish" : "Restoran",
    t_location: position[2],
  };

  const handleTarget = (item) => {
    navigate(`?category=${item.name}`);
  };

  const addToCart = (item) => {
    setUpdate(!update);
    const cartItem = cart?.find((x) => x?.id === item?.id);
    if (cartItem) {
      cartItem.quantity++;
      localStorage?.setItem("cart", JSON?.stringify(cart));
    } else {
      cart?.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const updateCart = (item) => {
    setUpdate(!update);
    const cartItem = cart.find((x) => x.id === item.id);
    if (cartItem && item?.quantity > 0) {
      cartItem.quantity = item?.quantity;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else if (cartItem && item.quantity === 0) {
      const index = cart.indexOf(cartItem);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const resieveOrderS = async () => {
    const uData = {
      id: position[4],
      status: 2,
    };
    if (!cart.length) {
      alert("Savatcha bo'sh");
      return;
    }
    socket.emit("/order", paymentData);
    socket.emit("/update/table", uData);
    localStorage.removeItem("cart");
    navigate("/");
    es("Buyurtma yuborildi!", { variant: "warning" });
  };

  const addExtr = (value) => {
    setDesc(false);
    const updatedCart = cart?.map((item) => {
      if (item.id === value.id) {
        item.comment = value.comment;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const filteredData = data?.innerData?.filter(
    (item) => item?.category?.split(" ")?.join("") === category
  );

  return (
    <div className="res_products">
      <div className="res_category">
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
        <div className="res_menu_box">
          {isLoading ? (
            <span className="loader_box">
              <LoadingBtn />
            </span>
          ) : (
            filteredData?.map((item) => {
              const count = cart.filter((x) => x.id === item.id);
              return (
                <div
                  className="res_menu_item"
                  key={item?.id}
                  onClick={() => addToCart(item)}
                >
                  <p style={{ textTransform: "capitalize" }}>{item?.name}</p>
                  <span>{item?.description}</span>
                  {count[0]?.quantity && <i>{count[0]?.quantity}</i>}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="book_order">
        <span onClick={() => setOpen(!open)}>
          <LuShoppingBasket />
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
              <div className="cart_body__item" key={item?.id}>
                {desc === item.id ? (
                  <input
                    type="text"
                    name="comment"
                    autoFocus
                    autoComplete="off"
                    className="description"
                    onChange={(e) => setExtra(e.target.value)}
                  />
                ) : (
                  <p>
                    {item?.name}
                    <b>{item?.description}</b>
                    <NumericFormat
                      value={item?.price * item?.quantity}
                      thousandSeparator=" "
                      displayType="text"
                      suffix=" so'm"
                    />
                  </p>
                )}
                <p>{item?.description}</p>
                <NumericFormat
                  value={item?.price * item?.quantity}
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" so'm"
                />
                <div className="update_item">
                  <button>
                    {desc === item.id ? (
                      <BiCheck
                        onClick={() => addExtr({ id: item.id, comment: extra })}
                      />
                    ) : (
                      <TbMessage2Plus onClick={() => setDesc(item.id)} />
                    )}
                  </button>
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
        <label
          className={takeaway ? "takeaway active" : "takeaway"}
          onClick={() => setTakeaway(!takeaway)}
        >
          {takeaway ? <FiCheckCircle /> : <BiCircle />}
          Olib ketish
        </label>
      </div>
    </div>
  );
};
