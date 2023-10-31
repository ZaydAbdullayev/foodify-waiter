import React from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";

export const Table = ({ data }) => {
  const navigate = useNavigate();

  const handleTarget = (item) => {
    if (item?.status === 0) {
      navigate(`category/${item?.type}/${item?.id}`);
      return;
    }
    navigate(`${item?.type}/${item?.id}`);
  };

  return data?.map((item) => {
    return (
      <div
        className="table_box"
        key={item?.id}
        onClick={() =>
          handleTarget({
            type: item?.location,
            id: item?.id,
            status: item?.status,
          })
        }
      >
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item?.status === 0
              ? "table"
              : item?.status === 1
              ? "table busy_table"
              : "table served_table"
          }
        >
          {item?.name}
        </div>
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item?.status === 0
              ? "chair"
              : item?.status === 1
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
      </div>
    );
  });
};
