import React, { useState, useEffect } from "react";
import "./home.css";
import { Table } from "../../components/tables/table";
import { useGetLocationQuery } from "../../service/table.service";
import io from "socket.io-client";

const socket = io("https://backup.foodify.uz");
// const socket = io("http://localhost:80");
// const socket = io("https://799twrl4-80.euw.devtunnels.ms");

export const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const { data: category = [] } = useGetLocationQuery();
  const [active, setActive] = useState(category?.data?.[0]);
  const [tablesData, setTablesData] = useState([]);
  // isLoading: loading, isError: error, data: tables = []

  const filterData = (type) => {
    setActive(type);
    const data = {
      res_id: user?.user?.id,
      location: type,
    };
    socket.emit("/get/tables", data);
    socket.on(`/get/table/${data.res_id}/${data.location}`, (data) => {
      setTablesData(data);
    });
  };

  useEffect(() => {
    filterData(category?.data?.[0]);
  }, []);

  return (
    <div className="box" style={{ background: "#333" }}>
      <div className="home">
        <div className="universal_box home_filter">
          {category?.data?.map((item) => {
            return (
              <span
                className={
                  active === item
                    ? "home_filter__item active"
                    : "home_filter__item"
                }
                key={item}
                onClick={() => filterData(item)}
              >
                {item}
              </span>
            );
          })}
        </div>

        <div className="home_table_box">
          <Table data={tablesData} />
        </div>
      </div>
    </div>
  );
};

// const tables = [
//   {
//     id: 1,
//     type: "tashqari",
//     number: 1,
//     status: "free",
//   },
//   {
//     id: 2,
//     type: "tashqari",
//     number: 2,
//     status: "busy",
//   },
//   {
//     id: 3,
//     type: "tashqari",
//     number: 3,
//     status: "served",
//   },
//   {
//     id: 4,
//     type: "tashqari",
//     number: 4,
//     status: "free",
//   },
//   {
//     id: 7,
//     type: "ichkari",
//     number: 3,
//     status: "served",
//   },
//   {
//     id: 5,
//     type: "ichkari",
//     number: 1,
//     status: "free",
//   },
//   {
//     id: 6,
//     type: "ichkari",
//     number: 2,
//     status: "busy",
//   },
//   {
//     id: 8,
//     type: "ichkari",
//     number: 4,
//     status: "free",
//   },
//   {
//     id: 9,
//     type: "padval",
//     number: 1,
//     status: "free",
//   },
//   {
//     id: 11,
//     type: "padval",
//     number: 3,
//     status: "served",
//   },
//   {
//     id: 10,
//     type: "padval",
//     number: 2,
//     status: "busy",
//   },
//   {
//     id: 12,
//     type: "padval",
//     number: 4,
//     status: "free",
//   },
//   {
//     id: 13,
//     type: "padval",
//     number: 1,
//     status: "free",
//   },
//   {
//     id: 14,
//     type: "padval",
//     number: 2,
//     status: "busy",
//   },
//   {
//     id: 15,
//     type: "padval",
//     number: 3,
//     status: "served",
//   },
//   {
//     id: 16,
//     type: "padval",
//     number: 4,
//     status: "free",
//   },
// ];

// const category = [
//   {
//     id: 1,
//     name: "tashqari",
//   },
//   {
//     id: 2,
//     name: "ichkari",
//   },
//   {
//     id: 3,
//     name: "2-qavat",
//   },
//   {
//     id: 4,
//     name: "padval",
//   },
// ];
