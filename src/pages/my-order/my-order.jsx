import React from "react";
import "./my-order.css";
import { useNavigate } from "react-router-dom";
import { useGetwOrderQuery } from "../../service/order.service";

import { GiHotMeal } from "react-icons/gi";
import { IoMdDoneAll } from "react-icons/io";
import { NumericFormat } from "react-number-format";
import noResult from "../../assets/20231109_144621.png";
import { LoadingBtn } from "../../components/loading/loading";

export const MyOrder = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useGetwOrderQuery();
  const reversedData = data?.innerData?.slice().reverse();
  const totalPrice = data?.innerData?.reduce((acc, current) => {
    return acc + current.price;
  }, 0);

  // address: "&1-stoll";
  // description: "";
  // id: "c06ae643";
  // latitude: "";
  // longitude: "";
  // order_type: "Restoran";
  // padyezd: "";
  // payment: "token";
  // price: 27000;
  // product_data: '[{"id":"32a55b6d","name":"Test Bar","price":12000,"img":"https://localhost:8081/add/product/img_f01245ee.jpg","description":"test suv","restaurant":"2899b5","category":"ichimlik","status":1,"department":"bar","quantity":1},{"id":"04a421e6","name":"test bar 1","price":15000,"img":"https://localhost:8081/add/product/img_3be92846.jpg","description":"test suv 1","restaurant":"2899b5","category":"ichimlik","status":1,"department":"bar","quantity":1}]';
  // qavat: "";
  // receivedAt: "2023-11-09T14:59:50.000Z";
  // restaurant_id: "2899b5";
  // status: 0;
  // t_location: "ichkari";
  // table_name: "1";
  // user_id: "ed2201";
  // worker_id: "25df2d";
  // worker_name: "Ismoil";

  return (
    <div className="my_order_main">
      <div className="my_order__body">
        <div className="my_order__item">
          <p>№</p>
          <p>Stoll</p>
          <p>Vaqti</p>
          <span>To'lov</span>
          <span>Usluga (10%)</span>
          <p>Status</p>
        </div>
        {isLoading ? (
          <span className="loader_box">
            <LoadingBtn />
          </span>
        ) : reversedData?.length ? (
          reversedData?.map((item, index) => {
            const reverseIndex = data?.innerData?.length - index;
            const time = new Date(item?.receivedAt)?.toLocaleString("uz-UZ", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            });
            return (
              <div
                className="my_order__item"
                key={item?.id}
                onClick={
                  item.status !== 3
                    ? () =>
                        navigate(
                          `/${item?.t_location}/${item?.table_name}/${item?.id}`
                        )
                    : null
                }
              >
                <p>{reverseIndex}</p>
                <p>{item?.table_name} - stoll</p>
                <p>{time}</p>
                <NumericFormat
                  displayType="text"
                  value={item?.price}
                  thousandSeparator=" "
                  suffix=" so'm"
                />
                <NumericFormat
                  displayType="text"
                  value={item?.price * 0.1}
                  thousandSeparator=" "
                  suffix=" so'm"
                />
                <p>
                  <i
                    style={{
                      background: item?.status === 3 ? "#6a994a" : "#fc0",
                    }}
                  >
                    {item?.status === 3 ? <IoMdDoneAll /> : <GiHotMeal />}
                  </i>
                </p>
              </div>
            );
          })
        ) : (
          <figure className="no_result">
            <img src={noResult} alt="" />
          </figure>
        )}
        <div className="total_price">
          <p>Bugungi sof foyda:</p>
          <NumericFormat
            displayType="text"
            value={totalPrice * 0.1}
            thousandSeparator=" "
            suffix=" so'm"
          />
        </div>
      </div>
    </div>
  );
};

// const Odata = [
//   {
//     id: 932847,
//     stoll: 12,
//     resieveAt: "12/12/2023",
//     type: "tashqari",
//     price: 120000,
//     status: 2,
//     time: "12:30",
//   },
//   {
//     id: 922147,
//     stoll: 11,
//     resieveAt: "12/12/2023",
//     type: "tashqari",
//     price: 100000,
//     status: 1,
//     time: "13:30",
//   },
//   {
//     id: 123347,
//     stoll: 15,
//     resieveAt: "12/12/2023",
//     type: "tashqari",
//     price: 200000,
//     status: 2,
//     time: "13:36",
//   },
//   {
//     id: 678732,
//     stoll: 7,
//     resieveAt: "12/12/2023",
//     type: "tashqari",
//     price: 310000,
//     status: 1,
//     time: "14:00",
//   },
//   {
//     id: 234553,
//     stoll: 1,
//     resieveAt: "12/12/2023",
//     type: "tashqari",
//     price: 90000,
//     status: 1,
//     time: "14:13",
//   },
// ];
