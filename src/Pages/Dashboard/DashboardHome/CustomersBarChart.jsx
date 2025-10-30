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
import { useGetCustomersStatisticQuery } from "../../../redux/features/dashboardApi";

const CustomersBarChart = () => {
  const [year, setYear] = useState("");
  const { data } = useGetCustomersStatisticQuery({ year: year });
  const customerData = data?.data;

  const CustomLegend = () => {
    return (
      <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575]">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#09B782] rounded-full" />
          Customers
        </div>
        <div className="flex items-center gap-1 whitespace-nowrap">
          <div className="w-3 h-3 bg-[#FFC107] rounded-full" />
          Returning Customers
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 rounded-xl w-full bg-[#FFFFFF]">
      <div className="flex items-center justify-between px-4 mb-4">
        <h1 className="text-xl font-medium text-[#757575]">
          Customers Statistics
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
                setYear(dateString);
              }}
            />
          </ConfigProvider>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={customerData?.monthlyBreakdown}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickFormatter={(month) => month.substring(0, 3)}
          />
          <YAxis />
          <Tooltip />
          <Bar
            barSize={15}
            radius={[50, 50, 0, 0]}
            dataKey="totalCustomers"
            name="Customers"
            fill="#09B782"
          />
          <Bar
            barSize={15}
            radius={[50, 50, 0, 0]}
            dataKey="returningCustomers"
            name="Returning Customers"
            fill="#FFC107"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomersBarChart;
