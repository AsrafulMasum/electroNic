import { ConfigProvider, DatePicker } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useGetEarningsQuery } from "../../../redux/features/dashboardApi";

const CustomLegend = () => {
  return (
    <div className="flex gap-2 2xl:gap-4 text-sm text-[#757575]">
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-action rounded-full" />
        Sell
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-green rounded-full" />
        Profit
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        <div className="w-3 h-3 bg-[#1877F2] rounded-full" />
        Admin Profit
      </div>
    </div>
  );
};

const EarningAreaChart = () => {
  const [userYear, setUserYear] = useState("");
  const { data } = useGetEarningsQuery({ year: userYear });
  const earningData = data?.data;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <h3 className="text-xl font-medium text-[#757575]">
          Earning Statistics
        </h3>
        <div className="flex items-center gap-6">
          <CustomLegend />
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#09b782",
              },
            }}
          >
            <DatePicker
              className="!cursor-pointer"
              picker="year"
              suffixIcon={<FaChevronDown className="text-gray-500 text-sm" />}
              onChange={(_, dateString) => {
                setUserYear(dateString);
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <ResponsiveContainer width={"100%"} height={285}>
        <AreaChart data={earningData} barGap={100}>
          <defs>
            <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC107" stopOpacity={1} />
              <stop offset="100%" stopColor="#FFC107" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#09b782" stopOpacity={1} />
              <stop offset="100%" stopColor="#09b782" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAdminProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1877F2" stopOpacity={1} />
              <stop offset="100%" stopColor="#1877F2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal vertical={false} />
          <XAxis
            dataKey="month"
            padding="gap"
            minTickGap={2}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <YAxis
            tickCount={11}
            width={40}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Tooltip />
          <Area
            connectNulls
            type="monotone"
            dataKey="totalRevenue"
            stroke="#FFC107"
            fill="url(#colorSell)"
            name="Sell"
          />
          <Area
            connectNulls
            type="monotone"
            dataKey="totalProfit"
            stroke="#09b782"
            fill="url(#colorProfit)"
            name="Profit"
          />
          <Area
            connectNulls
            type="monotone"
            dataKey="adminRevenue"
            stroke="#1877F2"
            fill="url(#colorAdminProfit)"
            name="Admin Profit"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningAreaChart;
