import React from "react";
import "./table.css";
import { useNavigate } from "react-router-dom";

export const Table = ({ data }) => {
  const navigate = useNavigate();

  const handleTarget = (item) => {
    navigate(`category/${item.type}/${item.id}`);
  };

  return data?.map((item) => {
    return (
      <div
        className="table_box"
        key={item.id}
        onClick={
          item.status === "free"
            ? () => handleTarget({ type: item.type, id: item.id })
            : null
        }
      >
        <div
          className={
            item.status === "free"
              ? "chair"
              : item.status === "busy"
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item.status === "free"
              ? "chair"
              : item.status === "busy"
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item.status === "free"
              ? "table"
              : item.status === "busy"
              ? "table busy_table"
              : "table served_table"
          }
        >
          {item.number}
        </div>
        <div
          className={
            item.status === "free"
              ? "chair"
              : item.status === "busy"
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
        <div
          className={
            item.status === "free"
              ? "chair"
              : item.status === "busy"
              ? "chair busy_chair"
              : "chair served_chair"
          }
        ></div>
      </div>
    );
  });
};
