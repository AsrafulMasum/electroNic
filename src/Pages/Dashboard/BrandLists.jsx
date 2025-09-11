import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Modal, Table } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

import { RiDeleteBin6Line } from "react-icons/ri";
import AddCategoryModal from "../../Components/Dashboard/AddCategoryModal";
import AddSubCategoryModal from "../../Components/Dashboard/AddSubcategoryModal";
import SubCategoryView from "../../Components/Dashboard/SubCategoryView";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../redux/features/categoriesApi";
import { useSearchParams } from "react-router-dom";

const brandData = [
  {
    key: "1",
    brandName: "Apple",
    image: "https://images.unsplash.com/photo-1580910051074-3d2c9cdb9759?w=200",
  },
  {
    key: "2",
    brandName: "Samsung",
    image: "https://images.unsplash.com/photo-1606813909021-5b1dbaec3e4b?w=200",
  },
  {
    key: "3",
    brandName: "Sony",
    image: "https://images.unsplash.com/photo-1606813908982-74a53ce38afc?w=200",
  },
  {
    key: "4",
    brandName: "Microsoft",
    image: "https://images.unsplash.com/photo-1591892568994-9c604d6b2f13?w=200",
  },
  {
    key: "5",
    brandName: "Lenovo",
    image: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=200",
  },
  {
    key: "6",
    brandName: "HP",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200",
  },
  {
    key: "7",
    brandName: "Dell",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200",
  },
  {
    key: "8",
    brandName: "Asus",
    image: "https://images.unsplash.com/photo-1610465299996-87a8d2f22c97?w=200",
  },
  {
    key: "9",
    brandName: "Acer",
    image: "https://images.unsplash.com/photo-1587202372775-9895df0e4b3e?w=200",
  },
  {
    key: "10",
    brandName: "Xiaomi",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200",
  },
  {
    key: "11",
    brandName: "Oppo",
    image: "https://images.unsplash.com/photo-1592894646997-5e0d8f67a9a2?w=200",
  },
  {
    key: "12",
    brandName: "Vivo",
    image: "https://images.unsplash.com/photo-1580894732444-8c7e3a5014a6?w=200",
  },
  {
    key: "13",
    brandName: "OnePlus",
    image: "https://images.unsplash.com/photo-1573736300338-4f9c8c27334a?w=200",
  },
  {
    key: "14",
    brandName: "Google",
    image: "https://images.unsplash.com/photo-1590487989356-dfe9172939f8?w=200",
  },
  {
    key: "15",
    brandName: "Realme",
    image: "https://images.unsplash.com/photo-1624000020420-c1d6a9ef3b87?w=200",
  },
  {
    key: "16",
    brandName: "Huawei",
    image: "https://images.unsplash.com/photo-1611074268330-1ee06b9d3170?w=200",
  },
  {
    key: "17",
    brandName: "Nokia",
    image: "https://images.unsplash.com/photo-1592853625601-6f92d2189ff1?w=200",
  },
  {
    key: "18",
    brandName: "Motorola",
    image: "https://images.unsplash.com/photo-1612817159949-99f0a9a0a46c?w=200",
  },
  {
    key: "19",
    brandName: "Canon",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=200",
  },
  {
    key: "20",
    brandName: "Nikon",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200",
  },
];


const BrandLists = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [deleteId, setDeleteId] = useState("");
  const [editData, setEditData] = useState(null);

  const [showSubModal, setShowSubModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [openSubCategory, setOpenSubCategory] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";

  const {
    data: categoryData,
    isLoading,
    refetch,
  } = useGetCategoriesQuery({ searchTerm, page });
  const [deleteCategory] = useDeleteCategoryMutation();

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
      const res = await deleteCategory(deleteId);

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
      dataIndex: "brandName",
      key: "brandName",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Brand Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div className="h-10 w-10">
          <img
            // src={`${imageUrl}${record?.image}`}
            src={`${record?.image}`}
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
              dataSource={brandData}
              // loading={isLoading}
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

      <AddCategoryModal
        openAddModel={openAddModel}
        setOpenAddModel={setOpenAddModel}
        editData={editData}
        setEditData={setEditData}
        refetch={refetch}
      />

      <AddSubCategoryModal
        openSubCategory={openSubCategory}
        setOpenSubCategory={setOpenSubCategory}
        category={editData?._id}
        setEditData={setEditData}
        refetch={refetch}
      />

      {/* <Modal
        centered
        open={openEditModal}
        onCancel={() => {
          setOpenEditModal(false);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-black text-xl"
            style={{ marginBottom: "12px" }}
          >
            {`Edit Category`}
          </h1>

          <Form form={form}>
            <div>
              <p className="text-[#6D6D6D] py-1">Category Name</p>
              <Form.Item
                name="categoryName"
                rules={[
                  {
                    required: true,
                    message: "Please input Package Name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleUpdate}
                className="bg-[#BB6D42] px-6 py-3 w-full text-[#FEFEFE] rounded-md"
              >
                Edit Category
              </button>
            </div>
          </Form>
        </div>
      </Modal> */}

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
            Do you want to delete this content ?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#2E7A8A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {/* ------------------------ Sub Category View Modal ------------- */}
      <SubCategoryView
        selectedCategory={selectedCategory}
        showSubModal={showSubModal}
        setShowSubModal={setShowSubModal}
        refetch={refetch}
      />
    </div>
  );
};

export default BrandLists;
