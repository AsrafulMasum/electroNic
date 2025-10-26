import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Modal, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

import { RiDeleteBin6Line } from "react-icons/ri";
import { imageUrl } from "../../redux/api/baseApi";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "../../redux/features/brandsApi";
import AddBrandModal from "../../Components/Dashboard/AddBrandModal";

const BrandLists = () => {
  const [page, setPage] = useState(1);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const { data, isLoading, refetch } = useGetBrandsQuery({ searchTerm, page });
  const [deleteBrand] = useDeleteBrandMutation();
  const brandsData = data?.data;
  // ------------------- Action -----------------------

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

  const handleDelete = async () => {
    try {
      const res = await deleteBrand(deleteId);
      if (res?.data) {
        toast.success(res?.data?.message);
        refetch();
        setShowDelete(false);
      }
    } catch (error) {
      setShowDelete(false);
    }
  };

  // ------------------------- Table Column  --------------------
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
      title: "Brand Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className="capitalize" style={{ color: "#757575" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Brand Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div className="h-10 w-10">
          <img
            src={`${imageUrl}${record?.image}`}
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "right",
      className: "action-column",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
            paddingRight: "46px",
          }}
        >
          <button
            onClick={() => {
              setOpenAddModel(true);
              setEditData(record);
            }}
            className="w-10 h-8 flex justify-center items-center rounded-md"
          >
            <FiEdit size={20} className="text-secondary" />
          </button>

          <button
            onClick={() => {
              setShowDelete(true);
              setDeleteId(record?._id);
            }}
            className="w-10 h-8 flex justify-center items-center rounded-md"
          >
            <RiDeleteBin6Line size={20} className="text-secondary" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full">
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "12px",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 16px",
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
            Brands
          </h3>

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
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                width: "151px",
                height: "40px",
                boxShadow: "0px 2px 4px 0px #0000001A",
                backgroundColor: "#09B782",
                border: "none",
                transition: "none",
                color: "#FDFDFD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <PlusOutlined />
              <span style={{ margin: 0 }}>Add Brand</span>
            </Button>
          </div>
        </div>

        <div className="relative">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "#FFC107",
                  borderRadius: "100%",
                  colorText: "#757575",
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
              dataSource={brandsData}
              loading={isLoading}
              pagination={{
                total: 20,
                current: page,
                pageSize: 10,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <AddBrandModal
        openAddModel={openAddModel}
        setOpenAddModel={setOpenAddModel}
        editData={editData}
        setEditData={setEditData}
        refetch={refetch}
      />

      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this Brand ?
          </p>
          <button
            onClick={handleDelete}
            className="bg-green py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BrandLists;
