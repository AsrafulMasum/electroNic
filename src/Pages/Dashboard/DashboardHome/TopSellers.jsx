import { ConfigProvider, Select, Table } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const { Option } = Select;

export default function TopSellers() {
  const [selectedMonth, setSelectedMonth] = useState("September");

  // Data now includes totalOrders and amount
  const data = [
    { id: 1, name: "Theresa Webb", userId: "2341651561", totalOrders: 50, amount: "$200" },
    { id: 2, name: "Theresa Webb", userId: "5614564154", totalOrders: 40, amount: "$300" },
    { id: 3, name: "Theresa Webb", userId: "5724525544", totalOrders: 35, amount: "$250" },
    { id: 4, name: "Theresa Webb", userId: "1256988452", totalOrders: 60, amount: "$400" },
    { id: 5, name: "Theresa Webb", userId: "1236598632", totalOrders: 20, amount: "$150" },
    { id: 6, name: "Theresa Webb", userId: "5724525544", totalOrders: 55, amount: "$280" },
    { id: 7, name: "Theresa Webb", userId: "5724525544", totalOrders: 65, amount: "$320" },
    { id: 8, name: "Theresa Webb", userId: "5724525544", totalOrders: 30, amount: "$180" },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
  ];

  const onChange = (month) => {
    console.log("Selected Month:", month);
    setSelectedMonth(month);
  };

  // Table columns including Total Orders
  const columns = [
    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          {record.name && (
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
              {record.name.charAt(0)}
            </div>
          )}
          {text}
        </div>
      ),
    },
    {
      title: "Seller ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Total Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
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
          dataSource={data}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
}
