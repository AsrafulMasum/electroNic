import { ConfigProvider, Select } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Option } = Select;

const data = [
  {
    name: "5",
    uv: 590,
    pv: 800,
    amt: 1400,
  },
  {
    name: "4.5",
    uv: 868,
    pv: 967,
    amt: 1506,
  },
  {
    name: "4",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "3.5",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "3",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "2.5",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
  {
    name: "2",
    uv: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    name: "1.5",
    uv: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    name: "1",
    uv: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    name: "N/A",
    uv: 1400,
    pv: 680,
    amt: 1700,
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomerRatingsChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("September");

  const onChange = (month) => {
    console.log("Selected Month:", month);
    setSelectedMonth(month);
  };

  return (
    <div className="pl-4 pt-4 rounded-xl w-full bg-[#FFFFFF]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium text-[#757575]">
          Ratings Statistics
        </h1>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                colorText: "#d2d2d5",
              },
            },
            token: {
              colorPrimary: "#09B782",
            },
          }}
        >
          <Select
            defaultValue={selectedMonth}
            onChange={onChange}
            style={{
              width: 180,
              height: 56,
              padding: "12px",
              borderRadius: "9999px",
              color: "#757575",
              fontSize: "0.875rem",
            }}
            suffixIcon={
              <FaChevronDown
                className="text-gray-500 text-sm"
                style={{ marginRight: "12px" }}
              />
            }
          >
            {months.map((month) => (
              <Option key={month} value={month} style={{ color: "#757575" }}>
                {month}
              </Option>
            ))}
          </Select>
        </ConfigProvider>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <ComposedChart
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
          layout="vertical"
          width={500}
          height={290}
          data={data}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Bar dataKey="pv" name="Ratings" barSize={15} fill="#FFC603" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerRatingsChart;
