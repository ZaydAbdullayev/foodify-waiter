import React, { memo } from "react";
import "./check.css";
import { NumericFormat } from "react-number-format";
import { CalculateTotalPrice } from "../../service/calc.service";

const checkData = {
  id: 382838,
  res_name: "Bulvar KFC",
  orderBy: "sarvar",
  order_id: "39bf843",
  resieveAt: "31/10/2023",
  cashier: "AZ 017",
  order_data: [
    {
      id: 1,
      status: 2,
      name: "Plov",
      category: "Main Dishes",
      price: 30000,
      quantity: 1,
    },
    {
      id: 2,
      status: 1,
      name: "Manti",
      category: "Main Dishes",
      price: 4000,
      quantity: 3,
    },
    {
      id: 3,
      status: 1,
      name: "Lagman",
      category: "Main Dishes",
      price: 25000,
      quantity: 2,
    },
    {
      id: 4,
      status: 5,
      name: "Shashlik",
      category: "Kebabs",
      price: 13000,
      quantity: 2,
    },
  ],
};

export const PaymentCheck = memo(() => {
  const total = CalculateTotalPrice(checkData.order_data);

  return (
    <div className="check_main_box">
      <div className="check_body">
        <div className="check_body_header">
          <p>{checkData.res_name}</p>
          <p>Namangan shahar A. Navoiy ko'chasi 103 uy</p>
        </div>
        <div className="check_body_box">
          <div>
            <p>Check № 98765456789</p>
            <b>
              <u>Buyurtma № 12</u>
            </b>
          </div>
          <p>
            Kassir: <span>{checkData.cashier}</span>
          </p>
          <p>
            Affitsant: <span>{checkData.orderBy}</span>
          </p>
          <p>
            Buyurtma ID: <span>{checkData.order_id}</span>
          </p>
          <p className="line">
            Buyurtma vaqti: <span>{checkData.resieveAt}</span>
          </p>
          <span>-------------------------------------------</span>
          <div className="check_body_data">
            {checkData?.order_data?.map((item) => {
              return (
                <p className="check_product" key={item.id}>
                  <span>
                    {item.quantity}x {item.name}:
                  </span>
                  <NumericFormat
                    displayType="text"
                    value={item.price * item.quantity}
                    thousandSeparator=" "
                    suffix=" so'm"
                  />
                </p>
              );
            })}
          </div>
          <span>-------------------------------------------</span>
          <p>
            Service:(10%){" "}
            <NumericFormat
              displayType="text"
              value={total * 0.1}
              thousandSeparator=" "
              suffix=" so'm"
            />
          </p>
          <p>
            Jami:{" "}
            <NumericFormat
              displayType="text"
              value={total + total * 0.1}
              thousandSeparator=" "
              suffix=" so'm"
            />
          </p>
          <span>-------------------------------------------</span>
          <span>
            Siz bu xaridingiz orqali 1% lik keshbek olish imkoniyatiga ego
            bo'ldingiz. Kod javobi 000
          </span>
          <span>• • • • • • • • • • • • • • • • • • • • • • • • •</span>
          <p>Chop etilgan sana: 1 11 2023 12:22</p>
          <span>• • • • • • • • • • • • • • • • • • • • • • • • •</span>
          <span>
            Savollar uchun mijozlarga yordam xizmat ko'rsatish sifatini
            ayxshilash uchun tel: +998 99 999 99 99
          </span>
        </div>
      </div>
    </div>
  );
});
