import React, { useState, useMemo } from "react";
import "./products.css";
import "./cart.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CalculateTotalPrice } from "../../service/calc.service";
import io from "socket.io-client";

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
  const category = location.search.split("%20").join("") || "MainDishes";
  const position = location.pathname.split("/");
  const uniqueCategories = [...new Set(foodData.map((food) => food.category))];
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
    const cartItem = cart.find((x) => x.id === item.id);
    if (cartItem) {
      cartItem.qty++;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart.push({ ...item, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const updateCart = (item) => {
    setUpdate(!update);
    const cartItem = cart.find((x) => x.id === item.id);
    if (cartItem && item.qty > 0) {
      cartItem.qty = item.qty;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else if (cartItem && item.qty === 0) {
      const index = cart.indexOf(cartItem);
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const resieveOrderS = async () => {
    const paymentData = {
      restaurant_id: user?.user?.id,
      user_id: user?.user?.user_id,
      product_data: JSON.stringify(cart),
      price: total,
      payment: "token",
      longitude: position[2],
      latitude: position[3],
    };
    if (!cart.length) {
      alert("Savatcha bo'sh");
      return;
    }
    socket.emit("/order", paymentData);
    navigate("/");
  };

  const filteredData = foodData.filter(
    (item) => item.category.split("%20").join("") === category
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
                className={category === item.name ? "active" : ""}
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
          {filteredData.map((item) => {
            return (
              <span
                className="res_menu_item"
                key={item.id}
                onClick={() => addToCart(item)}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
      <div className="book_order">
        <span onClick={() => setOpen(!open)}>
          <LuShoppingBasket /> {cart.length ? <span></span> : <></>}
        </span>
        <button onClick={() => resieveOrderS()}>Rasmiylashtirish</button>
      </div>
      <div className={open ? "cart_box open" : "cart_box"}>
        <p>
          <span>Mahsulotlar</span>
        </p>
        <div className="cart_body">
          {cart.map((item) => {
            return (
              <div className="cart_body__item">
                <p>{item.name}</p>
                <span>{item.price || 5600 * item.qty} so'm</span>
                <div className="update_item">
                  <button
                    onClick={() =>
                      updateCart({ id: item.id, qty: item.qty - 1 })
                    }
                  >
                    –
                  </button>
                  <input
                    type="number"
                    defaultValue={item.qty}
                    onChange={(e) =>
                      updateCart({ id: item.id, qty: e.target.value })
                    }
                  />
                  <button
                    onClick={() =>
                      updateCart({ id: item.id, qty: item.qty + 1 })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
          <p>
            <span>Jami:</span> <span>{total}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const foodData = [
  {
    id: 1,
    name: "Plov",
    category: "Main Dishes",
  },
  {
    id: 2,
    name: "Manti",
    category: "Main Dishes",
  },
  {
    id: 3,
    name: "Lagman",
    category: "Main Dishes",
  },
  {
    id: 4,
    name: "Shashlik",
    category: "Kebabs",
  },
  {
    id: 5,
    name: "Somsa",
    category: "Appetizers",
  },
  {
    id: 6,
    name: "Shurpa",
    category: "Soups",
  },
  {
    id: 7,
    name: "Naryn",
    category: "Main Dishes",
  },
  {
    id: 8,
    name: "Chuchvara",
    category: "Appetizers",
  },
  {
    id: 9,
    name: "Samsa",
    category: "Appetizers",
  },
  {
    id: 10,
    name: "Dimlama",
    category: "Main Dishes",
  },
  {
    id: 11,
    name: "Chorba",
    category: "Soups",
  },
  {
    id: 12,
    name: "Kazan Kebab",
    category: "Kebabs",
  },
  {
    id: 13,
    name: "Non",
    category: "Breads",
  },
  {
    id: 14,
    name: "Shalgam",
    category: "Beverages",
  },
  {
    id: 15,
    name: "Tandir Bread",
    category: "Breads",
  },
  {
    id: 16,
    name: "Kefir",
    category: "Beverages",
  },
  {
    id: 17,
    name: "Pishloq",
    category: "Main Dishes",
  },
  {
    id: 18,
    name: "Shakarop",
    category: "Desserts",
  },
  {
    id: 19,
    name: "Achichuk",
    category: "Salads",
  },
  {
    id: 20,
    name: "Halva",
    category: "Desserts",
  },
  {
    id: 21,
    name: "Sach",
    category: "Main Dishes",
  },
  {
    id: 22,
    name: "Nishalda",
    category: "Main Dishes",
  },
  {
    id: 23,
    name: "Gazpacho",
    category: "Soups",
  },
  {
    id: 24,
    name: "Kabuli Palaw",
    category: "Main Dishes",
  },
  {
    id: 25,
    name: "Kumis",
    category: "Beverages",
  },
  {
    id: 26,
    name: "Beshbarmak",
    category: "Main Dishes",
  },
  {
    id: 27,
    name: "Erishte",
    category: "Main Dishes",
  },
  {
    id: 28,
    name: "Tandoori Bread",
    category: "Breads",
  },
  {
    id: 29,
    name: "Tushbera",
    category: "Appetizers",
  },
  {
    id: 30,
    name: "Shorva",
    category: "Soups",
  },
  {
    id: 31,
    name: "Syrniki",
    category: "Desserts",
  },
  {
    id: 32,
    name: "Smetana",
    category: "Dairy Products",
  },
  {
    id: 33,
    name: "Zharkop",
    category: "Desserts",
  },
  {
    id: 34,
    name: "Kompot",
    category: "Beverages",
  },
  {
    id: 35,
    name: "Mastava",
    category: "Soups",
  },
  {
    id: 36,
    name: "Tukhum Barak",
    category: "Appetizers",
  },
  {
    id: 37,
    name: "Sousi",
    category: "Main Dishes",
  },
  {
    id: 38,
    name: "Khvorost",
    category: "Desserts",
  },
  {
    id: 39,
    name: "Makhsus",
    category: "Main Dishes",
  },
  {
    id: 40,
    name: "Syr Posh",
    category: "Desserts",
  },
];
