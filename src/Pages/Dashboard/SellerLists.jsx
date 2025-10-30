import { useState } from "react";
import { ConfigProvider, Input, Modal, Table } from "antd";
import { FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../Components/Dashboard/UserDetailsModal";
import { CiLock, CiUnlock } from "react-icons/ci";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useGetSellersQuery,
  useLockUserMutation,
} from "../../redux/features/usersApi";
import toast from "react-hot-toast";
import { IoInformationCircleOutline } from "react-icons/io5";
import moment from "moment";

const SellerLists = () => {
  const [page, setPage] = useState(1);
  const [lock, setLock] = useState(null);
  const [value, setValue] = useState(null);
  const [searchText, setSearchText] = useState("");

  const {
    data: userData,
    refetch,
    isLoading,
  } = useGetSellersQuery({ searchText, page });

  const [lockUser] = useLockUserMutation();

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
      title: "Student Name",
      dataIndex: "user",
      key: "user",
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              src={
                record?.image && record?.image.startsWith("http")
                  ? record?.image
                  : record?.image
                  ? `${imageUrl}${record?.image}`
                  : "/default-avatar.jpg"
              }
              className="w-10 h-10 object-cover rounded-full"
            />

            <p
              style={{
                letterSpacing: 0.4,
                fontWeight: "400",
                color: "#757575",
              }}
            >
              {record?.firstName} {record?.lastName}
            </p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Contact No.",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Registration No.",
      dataIndex: "registrationNo",
      key: "registrationNo",
      render: (text) => <span style={{ color: "#757575" }}>{text}</span>,
    },
    {
      title: "Start Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <span style={{ color: "#757575" }}>
          {moment(record?.createdAt).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",

            paddingRight: 10,
          }}
        >
          <button
            className="flex justify-center items-center rounded-md"
            onClick={() => setValue(record)}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              width: "40px",
              height: "32px",
            }}
          >
            <IoInformationCircleOutline size={26} className="text-secondary" />
          </button>

          <div>
            <button
              className="flex justify-center items-center rounded-md"
              onClick={() => setLock(record)}
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                width: "40px",
                height: "32px",
              }}
            >
              {record?.status === "active" ? (
                <CiUnlock size={26} className="text-secondary" />
              ) : (
                <CiLock size={26} className="text-[#FF0000]" />
              )}
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleDelete = async () => {
    let payload = {};
    if (lock?.status === "active") {
      payload = {
        status: "blocked",
      };
    } else {
      payload = {
        status: "active",
      };
    }
    try {
      const res = await lockUser({ id: lock?._id, payload });
      if (res?.data?.success) {
        refetch();
        setLock(null);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
              Seller Lists
            </h3>
          </div>
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
                colorPrimary: "#09B782",
              },
            }}
          >
            <Table
              size="small"
              columns={columns}
              dataSource={userData?.data}
              rowKey="_id"
              loading={isLoading}
              pagination={{
                total: userData?.pagination?.total,
                current: page,
                pageSize: userData?.pagination?.limit,
                onChange: (page) => setPage(page),
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      <UserDetailsModal value={value} setValue={setValue} />

      <Modal
        centered
        open={lock}
        onCancel={() => setLock(null)}
        width={400}
        footer={false}
      >
        <div className="p-6 text-center">
          <p className="text-[#D93D04] text-center font-semibold">
            Are you sure!
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content?
          </p>
          <button
            onClick={handleDelete}
            className="bg-[#09B782] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SellerLists;
