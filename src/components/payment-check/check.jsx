import { memo } from "react";
import { NumericFormat } from "react-number-format";
import { CalculateTotalPrice } from "../../service/calc.service";

const checkData = {
  id: 382838,
  res_name: "Bulvar KFC",
  orderBy: "sarvar",
  order_id: "39bf843",
  resieveAt: "31/10/2023",
  order_data: [
    {
      id: 1,
      status: 2,
      name: "Plov",
      category: "Main Dishes",
      price: 3600,
      quantity: 1,
    },
    {
      id: 2,
      status: 1,
      name: "Manti",
      category: "Main Dishes",
      price: 3600,
      quantity: 3,
    },
    {
      id: 3,
      status: 1,
      name: "Lagman",
      category: "Main Dishes",
      price: 3600,
      quantity: 2,
    },
    {
      id: 4,
      status: 5,
      name: "Shashlik",
      category: "Kebabs",
      price: 3600,
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
        </div>
        <div className="check_body_box">
          <p>
            Affitsant: <span>{checkData.orderBy}</span>
          </p>
          <p>
            Buyurtma ID: <span>{checkData.order_id}</span>
          </p>
          <p>
            Buyurtma vaqti: <span>{checkData.resieveAt}</span>
          </p>
          <span>-------------------------------</span>
          <div className="check_body_data">
            {checkData?.order_data?.map((item) => {
              return (
                <p className="check_product" key={item.id}>
                  {item.name}:{" "}
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
          <span>-------------------------------</span>
          <p>
            Jami:{" "}
            <NumericFormat
              displayType="text"
              value={total || 0}
              thousandSeparator=" "
              suffix=" so'm"
            />
          </p>
        </div>
      </div>
    </div>
  );
});
