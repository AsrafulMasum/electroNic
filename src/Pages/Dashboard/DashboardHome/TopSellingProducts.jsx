import { ConfigProvider, Select } from "antd";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { FiInfo } from "react-icons/fi";

export default function TopSellingProducts() {
  const [selectedMonth, setSelectedMonth] = useState("September");
  const data = [
    { id: 1, name: "Theresa Webb", userId: "2341651561" },
    { id: 2, name: "Theresa Webb", userId: "5614564154" },
    { id: 3, name: "Theresa Webb", userId: "5724525544" },
    { id: 4, name: "Theresa Webb", userId: "1256988452" },
    { id: 5, name: "Theresa Webb", userId: "1236598632" },
    { id: 6, name: "Theresa Webb", userId: "5724525544" },
    { id: 7, name: "Theresa Webb", userId: "5724525544" },
    { id: 8, name: "Theresa Webb", userId: "5724525544" },
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

  const onChange = (month) => {
    console.log("Selected Month:", month);
    setSelectedMonth(month);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-medium text-[#757575]">
          Top Selling products
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
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="flex justify-between text-sm text-green">
              <th className="p-2 font-medium">Product Name</th>
              <th className="p-2 font-medium">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b text-sm text-gray-700 flex justify-between"
              >
                {/* Product Name */}
                <td className="p-2 flex items-center gap-2">
                  {item.name && (
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  {item.name}
                </td>

                {/* User ID */}
                <td className="p-2">{item.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
