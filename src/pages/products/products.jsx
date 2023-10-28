import React from "react";
import "./products.css";
import { useNavigate, useLocation } from "react-router-dom";

import { LuShoppingBasket } from "react-icons/lu";

export const Products = () => {
  const navigate = useNavigate();
  const location =
    useLocation().search.split("=").pop().split("%20").join("") ||
    foodData[0].category;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const uniqueCategories = [...new Set(foodData.map((food) => food.category))];

  const handleTarget = (item) => {
    navigate(`?category=${item.name}`);
  };

  const addToCart = (item) => {
    const cartItem = cart.find((x) => x.id === item.id);
    if (cartItem) {
      cartItem.qty++;
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart.push({ ...item, qty: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const filteredData = foodData.filter(
    (item) => item.category.split("%20").join("") === location
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
                className={location === item.name ? "active" : ""}
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
        <span>
          <LuShoppingBasket /> {cart.length ? <span></span> : <></>}
        </span>
        <button>Rasmiylashtirish</button>
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



