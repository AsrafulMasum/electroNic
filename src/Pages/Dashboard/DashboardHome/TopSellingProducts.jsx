import { ConfigProvider, Select, Table } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useGetTopSellingProductsQuery } from "../../../redux/features/dashboardApi";
import { imageUrl } from "../../../redux/api/baseApi";

export default function TopSellingProducts() {
  const [selectedMonth, setSelectedMonth] = useState("October");
  const { data: topSellingProductsRes } = useGetTopSellingProductsQuery({
    month: selectedMonth,
  });
  const topSellingProducts = topSellingProductsRes?.data?.products;

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

  // Table Columns
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src={`${imageUrl}${record?.productDetails?.images[0]}`}
            alt=""
          />
          {text}
        </div>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (_, record) => <p>{record?.productDetails?.brand}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => <p>{record?.productDetails?.category}</p>,
    },
    {
      title: "Total Sold",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
    {
      title: "Amount",
      dataIndex: "totalQuantitySold",
      key: "totalQuantitySold",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium text-[#757575]">
          Top Selling Products
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

      {/* Table */}
      <div className="overflow-y-auto h-60 pr-10">
        <Table
          columns={columns}
          dataSource={topSellingProducts}
          rowKey="productId"
          pagination={false}
        />
      </div>
    </div>
  );
}
