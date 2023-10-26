import React, { useState, useEffect } from "react";
import "./home.css";
import { Table } from "../../components/tables/table";

export const Home = () => {
  const [active, setActive] = useState("");
  const [tablesData, setTablesData] = useState([]);

  const filterData = (type) => {
    setActive(type);
    const value = type ? type : category[0].name;
    const filteredData = tables.filter((item) => item.type === value);
    setTablesData(filteredData);
  };

  useEffect(() => {
    filterData(category[0].name);
  }, []);

  return (
    <div className="box" style={{ background: "#333" }}>
      <div className="home">
        <div className="universal_box home_filter">
          {category.map((item) => {
            return (
              <span
                className={
                  active === item.name
                    ? "home_filter__item active"
                    : "home_filter__item"
                }
                key={item.id}
                onClick={() => filterData(item.name)}
              >
                {item.name}
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

const tables = [
  {
    id: 1,
    type: "tashqari",
    number: 1,
    status: "free",
  },
  {
    id: 2,
    type: "tashqari",
    number: 2,
    status: "busy",
  },
  {
    id: 3,
    type: "tashqari",
    number: 3,
    status: "served",
  },
  {
    id: 4,
    type: "tashqari",
    number: 4,
    status: "free",
  },
  {
    id: 7,
    type: "ichkari",
    number: 3,
    status: "served",
  },
  {
    id: 5,
    type: "ichkari",
    number: 1,
    status: "free",
  },
  {
    id: 6,
    type: "ichkari",
    number: 2,
    status: "busy",
  },
  {
    id: 8,
    type: "ichkari",
    number: 4,
    status: "free",
  },
  {
    id: 9,
    type: "padval",
    number: 1,
    status: "free",
  },
  {
    id: 11,
    type: "padval",
    number: 3,
    status: "served",
  },
  {
    id: 10,
    type: "padval",
    number: 2,
    status: "busy",
  },
  {
    id: 12,
    type: "padval",
    number: 4,
    status: "free",
  },
  {
    id: 13,
    type: "padval",
    number: 1,
    status: "free",
  },
  {
    id: 14,
    type: "padval",
    number: 2,
    status: "busy",
  },
  {
    id: 15,
    type: "padval",
    number: 3,
    status: "served",
  },
  {
    id: 16,
    type: "padval",
    number: 4,
    status: "free",
  },
];

const category = [
  {
    id: 1,
    name: "tashqari",
  },
  {
    id: 2,
    name: "ichkari",
  },
  {
    id: 3,
    name: "2-qavat",
  },
  {
    id: 4,
    name: "padval",
  },
];
