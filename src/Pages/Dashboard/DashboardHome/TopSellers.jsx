import { ConfigProvider, Select, Table } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useGetTopSellersQuery } from "../../../redux/features/dashboardApi";
import { imageUrl } from "../../../redux/api/baseApi";

const { Option } = Select;

export default function TopSellers() {
  const [selectedMonth, setSelectedMonth] = useState("October");
  const { data: topSellersRes } = useGetTopSellersQuery({
    month: selectedMonth,
  });
  const topSellers = topSellersRes?.data?.sellers;

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

  const onChange = (month) => {
    setSelectedMonth(month);
  };

  // Table columns including Total Orders
  const columns = [
    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {record?.sellerImage ? (
            <img
              src={`${imageUrl}${record?.sellerImage}`}
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
          ) : (
            <img
              src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              alt=""
              className="w-8 h-8 object-cover rounded-full"
            />
          )}
          <p className="capitalize pl-2">
            {record?.sellerName} {record?.sellerLastName}
          </p>
        </div>
      ),
    },
    {
      title: "Seller ID",
      dataIndex: "sellerId",
      key: "sellerId",
    },
    {
      title: "Total Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: "Amount",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (text) => <span className="text-[#757575]">${text}</span>,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium text-[#757575]">Top Sellers</h1>
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

      {/* Table */}
      <div className="overflow-y-auto h-60 pr-10">
        <Table
          columns={columns}
          dataSource={topSellers}
          rowKey="sellerId"
          pagination={false}
        />
      </div>
    </div>
  );
}
