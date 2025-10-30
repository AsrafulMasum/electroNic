import { useState } from "react";
import { Button, ConfigProvider, Input, Select, Table, Tag } from "antd";
import { FiSearch } from "react-icons/fi";
import { useChangeOrderStatusMutation } from "../../redux/features/paymentApi";
import { imageUrl } from "../../redux/api/baseApi";
import moment from "moment";
import toast from "react-hot-toast";
import { useGetOrdersListQuery } from "../../redux/features/bookingsApi";

const limit = 10;

const SellingsDetails = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [changeOrderStatus] = useChangeOrderStatusMutation();
  const {
    data: sellingList,
    refetch,
    isLoading,
  } = useGetOrdersListQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const statusColorMap = {
    pending: { color: "#D48806", bg: "#F7F1CC" },
    processing: { color: "#1890FF", bg: "#D9EEFF" },
    shipped: { color: "#13C2C2", bg: "#CCFAF9" },
    cancelled: { color: "#FF4D4F", bg: "#FFD8D7" },
    delivered: { color: "#52C41A", bg: "#D9F2CD" },
    returned: { color: "#FF0000", bg: "#FFCCCC" },
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "key",
      key: "key",
      render: (_, __, index) => (
        <span className="text-[#757575]">{index + 1}</span>
      ),
    },
    {
      title: "Order Id",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text) => <span className="text-[#757575]">{text}</span>,
    },
    {
      title: "Product Images",
      dataIndex: "productImage",
      key: "productImage",
      render: (_, record) => {
        return (
          <div className="flex gap-1">
            {record?.products[0]?.productId?.images?.map((item) => {
              return (
                <img
                  key={item}
                  src={
                    item && item.startsWith("http")
                      ? item
                      : item
                      ? `${imageUrl}${item}`
                      : "/default-avatar.jpg"
                  }
                  alt={`Product ${item}`}
                  className="w-10 h-10 object-cover rounded border border-[#3F857B]"
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Contact No.",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <span style={{ color: "#757575" }}>
          {moment(record?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (status, record) => {
        const currentStyle = statusColorMap[status] || {
          color: "#595959",
          bg: "#FAFAFA",
        };

        return (
          <p
            className="capitalize px-1 py-0.5 text-center rounded-lg"
            style={{
              color: currentStyle.color,
              backgroundColor: currentStyle.bg,
            }}
          >
            {record?.deliveryStatus}
          </p>
        );
      },
    },
  ];

  return (
    <div className="w-full h-full bg-white">
      <div
        style={{
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0px 16px",
            padding: "16px 0px",
          }}
        >
          <h3
            style={{
              color: "#757575",
              fontSize: 18,
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            Order Details
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "353px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#09B782",
                  },
                }}
              >
                <Input
                  placeholder="Search..."
                  onChange={handleSearchChange}
                  prefix={<FiSearch size={14} color="#868FA0" />}
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "14px",
                    backgroundColor: "#FAFAFA",
                  }}
                  size="middle"
                />
              </ConfigProvider>
            </div>
          </div>
        </div>

        <div className="relative h-full">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#FFC107",
                  borderRadius: "100%",
                  colorText: "white",
                  colorTextDisabled: "#6C6C6C",
                },
                Table: {
                  rowHoverBg: "#FFFFFF",
                },
              },
              token: {
                colorPrimary: "#13333A",
              },
            }}
          >
            <Table
              size="small"
              rowKey="_id"
              columns={columns}
              dataSource={sellingList?.data?.orders}
              loading={isLoading}
              pagination={{
                total: sellingList?.meta?.total,
                current: page,
                pageSize: limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default SellingsDetails;
