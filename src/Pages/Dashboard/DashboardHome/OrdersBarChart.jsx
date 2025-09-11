import { ConfigProvider, DatePicker, Dropdown } from "antd";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaChevronDown } from "react-icons/fa";

const salesChartData = [
  {
    name: "Jan",
    students: 70,
    profit: "45",
  },
  {
    name: "Feb",
    students: 40,
    profit: "26",
  },
  {
    name: "Mar",
    students: 55,
    profit: "30",
  },
  {
    name: "Apr",
    students: 35,
    profit: "20",
  },
  {
    name: "May",
    students: 52,
    profit: "46",
  },
  {
    name: "Jun",
    students: 42,
    profit: "38",
  },
  {
    name: "Jul",
    students: 39,
    profit: "68",
  },
  {
    name: "Aug",
    students: 46,
    profit: "45",
  },
  {
    name: "Aug",
    students: 68,
    profit: "35",
  },
  {
    name: "Sep",
    students: 60,
    profit: "5",
  },
  {
    name: "Oct",
    students: 70,
    profit: "5",
  },
  {
    name: "Nov",
    students: 70,
    profit: "5",
  },
  {
    name: "Dec",
    students: 70,
    profit: "5",
  },
];

const OrdersBarChart = ({ setStudentYear, studentStats }) => {
  const CustomLegend = () => {
    return (
      <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575]">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#09B782] rounded-full" />
          Sold
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#FFC107] rounded-full" />
          Pending
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#D32B20] rounded-full" />
          Cancel
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#FF0000] rounded-full" />
          Return
        </div>
      </div>
    );
  };

  return (
    <div className=" py-6 rounded-xl w-full  bg-[#FFFFFF]">
      <div className="flex items-center justify-between px-4 mb-4">
        <h1 className="text-xl font-medium text-[#757575]">
          Order Statistics
        </h1>
        <div className="flex items-center gap-2 2xl:gap-6">
          <CustomLegend />
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#09B782",
              },
            }}
          >
            <DatePicker
              className="!cursor-pointer"
              picker="year"
              suffixIcon={<FaChevronDown className="text-gray-500 text-sm" />}
              onChange={(_, dateString) => {
                setStudentYear(dateString);
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={studentStats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* <Bar barSize={10} radius={50} dataKey="saleTotal" fill="#EAF2F3" /> */}
          {/* <Bar barSize={40} radius={[50, 50, 0, 0]} dataKey="count" name="Students" fill="#FFC107" /> */}
          <Bar
            barSize={40}
            dataKey="count"
            stackId="a"
            name="Sold"
            fill="#09B782"
          />
          <Bar
            barSize={40}
            dataKey="count"
            stackId="a"
            name="Pending"
            fill="#FFC107"
          />
          <Bar
            barSize={40}
            dataKey="count"
            stackId="a"
            name="Cancel"
            fill="#D32B20"
          />
          <Bar
            barSize={40}
            dataKey="count"
            stackId="a"
            name="Return"
            fill="#FF0000"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersBarChart;
