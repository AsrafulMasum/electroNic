import { ConfigProvider, Input, Table } from "antd";
import { useState } from "react";
import { imageUrl } from "../../redux/api/baseApi";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useGetProductsQuery } from "../../redux/features/productApi";

const Products = () => {
  const limit = 10;
  // ----------------- Hooks ------------------------
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const { data: productData, isLoading } = useGetProductsQuery({
    searchTerm,
    page,
    limit,
  });
  
  // ----------------------- Action ------------------------
  // Handle search input change
  const handleSearchChange = (e) => {
    const newValue = e.target.value;

    const newParams = new URLSearchParams(searchParams);
    if (newValue) {
      newParams.set("searchTerm", newValue);
    } else {
      newParams.delete("searchTerm");
    }
    setSearchParams(newParams);
  };

  const columns = [
    {
      title: "Serial No.",
      key: "serial",
      render: (_, __, index) => (
        <span className="text-[#757575]">{index + 1}</span>
      ),
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (title) => <span className="text-[#757575]">{title}</span>,
    },
    {
      title: "Product Images",
      dataIndex: "productImage",
      key: "productImage",
      render: (_, record) => {
        return (
          <img
            key={record?._id}
            src={
              record?.images && record?.images[0]?.startsWith("http")
                ? record?.images[0]
                : record?.images[0]
                ? `${imageUrl}${record?.images[0]}`
                : "/default-avatar.jpg"
            }
            alt={`Product ${record?._id}`}
            className="w-11 h-11 object-cover rounded border border-[#3F857B]"
          />
        );
      },
    },
    {
      title: "Seller Name",
      dataIndex: "sellerName",
      key: "sellerName",
      render: (_, record) => (
        <span className="text-[#757575]">
          {record?.sellerId?.firstName} {record?.sellerId?.lastName}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => (
        <span style={{ color: "#757575" }}>{record?.category}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <span style={{ color: "#757575" }}>$ {record?.sizeType[0]?.price}</span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "totalStock",
      key: "totalStock",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        let status = "";
        let statusClass = "";

        if (record.quantity === 0) {
          status = "Stock Out";
          statusClass = "bg-[#FC605726] text-[#FC6057]";
        } else if (record.quantity < 10) {
          status = "Short Stock";
          statusClass = "bg-yellow-100 text-yellow-700";
        } else {
          status = "In Stock";
          statusClass = "bg-[#09B782] text-[#EBEBEB]";
        }

        return (
          <div className="pr-4">
            <p
              className={`w-24 rounded-md text-sm text-center py-[2px] capitalize ${statusClass}`}
            >
              {status}
            </p>
          </div>
        );
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (_, record) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         gap: "10px",

    //         paddingRight: 10,
    //       }}
    //     >
    //       <button
    //         className="flex justify-center items-center rounded-md"
    //         onClick={() => {
    //           setValue(record);
    //           setOpenEditModel(true);
    //         }}
    //         style={{
    //           cursor: "pointer",
    //           border: "none",
    //           outline: "none",
    //           width: "40px",
    //           height: "32px",
    //         }}
    //       >
    //         <FiEdit size={16} className="text-secondary" />
    //       </button>
    //       <button
    //         onClick={() => {
    //           setShowDelete(true);
    //           setDeleteId(record?._id);
    //         }}
    //         className="w-10 h-8 flex justify-center items-center rounded-md"
    //       >
    //         <RiDeleteBin6Line size={20} className="text-secondary" />
    //       </button>
    //     </div>
    //   ),
    // },
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
          <div>
            <h3
              style={{
                color: "#757575",
                fontSize: 18,
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              Products
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "350px",
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
        </div>

        <div className="relative h-full">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#FFC107",
                  borderRadius: "100%",
                  colorText: "black",
                  colorTextDisabled: "#6C6C6C",
                },
                Table: {
                  rowHoverBg: "#FFFFFF",
                },
              },
              token: {
                colorPrimary: "#09B782",
              },
            }}
          >
            <Table
              size="small"
              columns={columns}
              rowKey="_id"
              dataSource={productData?.data}
              loading={isLoading}
              pagination={{
                total: productData?.meta?.total,
                current: page,
                pageSize: productData?.meta?.limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default Products;
