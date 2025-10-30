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
import { useGetRatingsQuery } from "../../../redux/features/dashboardApi";

const { Option } = Select;

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
  const [selectedMonth, setSelectedMonth] = useState("October");
  const { data } = useGetRatingsQuery({ month: selectedMonth });
  const ratings = data?.data?.ratingBreakdown;

  const onChange = (month) => {
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
          data={ratings}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="rating" type="category" scale="band" />
          <Tooltip />
          <Bar dataKey="count" name="Ratings" barSize={15} fill="#FFC603" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerRatingsChart;
