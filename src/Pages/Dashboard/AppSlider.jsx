import { Button, Calendar, ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { CiEdit, CiImageOn } from "react-icons/ci";
import { imageUrl } from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import moment from "moment";
import {
  useCreateOfferMutation,
  useDeleteOfferMutation,
  useGetOffersQuery,
  useUpdateOfferMutation,
} from "../../redux/features/offersApi";
import dayjs from "dayjs";
import { RiDeleteBin6Line } from "react-icons/ri";

const AppSlider = () => {
  const { data: offersData, refetch } = useGetOffersQuery();
  const offers = offersData?.data;
  const [value, setValue] = useState(null);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [form, setForm] = useState({
    offerName: "",
    image: "",
    startDate: "",
    endDate: "",
    discount: "",
  });

  const [imgURL, setImgURL] = useState();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [imgEditURL, setImgEditURL] = useState("");
  const [showCalendarFor, setShowCalendarFor] = useState(null);

  const [createOffer] = useCreateOfferMutation();
  const [updateOffer] = useUpdateOfferMutation();
  const [deleteOffer] = useDeleteOfferMutation();

  // Handle image upload
  const handleAdd = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      const file = files[0];
      const imgUrl = URL.createObjectURL(file);
      setImgURL(imgUrl);
      setImageFile(file);
      setForm((prev) => ({ ...prev, [name]: imgUrl }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new offers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.offerName);
      formData.append("discount", form.discount);
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      const res = await createOffer(formData).unwrap();
      if (res?.success) {
        setOpenAddModel(false);
        setForm({
          offerName: "",
          imageUrl: "",
          discount: "",
          startDate: "",
          endDate: "",
        });
        setImgURL("");
        setImageFile(null);
        refetch();
        toast.success("Offer added successfully");
      }
    } catch (err) {
      console.error("Add offer failed", err);
      toast.error("Add offer failed");
    }
  };

  // // Edit service
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.offerName);
      formData.append("discount", form.discount);
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      await updateOffer({
        id: value._id,
        body: formData,
      }).unwrap();
      setValue(null);
      setForm({
        offerName: "",
        imgEditURL: "",
        discount: "",
        startDate: "",
        endDate: "",
      });
      setImgEditURL("");
      setEditImageFile(null);
      refetch();
      toast.success("Offer updated successfully");
    } catch (err) {
      console.error("Edit offer failed", err);
    }
  };

  // Open edit modal and set form values
  const openEditModal = (record) => {
    setValue(record);
    setForm({
      offerName: record?.name,
      image: record?.image,
      discount: record?.discount,
      startDate: record?.startDate
        ? moment(record?.startDate).format("YYYY-MM-DD")
        : "",
      endDate: record?.endDate
        ? moment(record?.endDate).format("YYYY-MM-DD")
        : "",
    });
    setImgEditURL(
      record?.image
        ? record?.image.startsWith("http")
          ? record?.image
          : `${imageUrl}${record?.image}`
        : ""
    );
    setEditImageFile(null);
    setOpenEditModel(true);
  };

  const onEditImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const imgUrl = URL.createObjectURL(file);
      setImgEditURL(imgUrl);
      setEditImageFile(file);
    }
  };

  const onEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "image") {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (value) => {
    const formattedDate = dayjs(value).format("YYYY-MM-DD");

    if (showCalendarFor === "start") {
      setForm((prev) => ({ ...prev, startDate: formattedDate }));
    } else if (showCalendarFor === "end") {
      setForm((prev) => ({ ...prev, endDate: formattedDate }));
    }

    setShowCalendarFor(null);
  };

  // Delete service
  const handleDelete = async () => {
    try {
      await deleteOffer(deleteId).unwrap();
      setShowDelete(false);
      setDeleteId("");
      refetch();
      toast.success("Banner deleted successfully");
    } catch (err) {
      console.error("Delete banner failed.", err);
      toast.error("Deletion banner failed.");
    }
  };

  const columns = [
    {
      title: "Serial ID",
      dataIndex: "name",
      key: "name",
      render: (_, __, index) => <p>{index + 1}</p>,
    },
    {
      title: "Slider Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <div>
          <img
            className="h-8 w-16 object-cover"
            src={
              record?.image && record?.image.startsWith("https")
                ? record?.image
                : record?.image
                ? `${imageUrl}${record?.image}`
                : "/default-avatar.png"
            }
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Slider Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Categories",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Brands",
      dataIndex: "brands",
      key: "brands",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (_, record) => <p>{moment(record?.startDate).format("L")}</p>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (_, record) => <p>{moment(record?.endDate).format("L")}</p>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-8">
          <CiEdit
            className="cursor-pointer text-2xl text-[#F78F08]"
            onClick={() => openEditModal(record)}
          />
          <RiDeleteBin6Line size={20} className="text-secondary" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full bg-white">
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            color: "#0F665A",
            fontSize: 24,
            fontWeight: "500",
            lineHeight: "24px",
          }}
        >
          Offers
        </h3>
        <div>
          <Button
            onClick={() => {
              setOpenAddModel(true);
            }}
            style={{
              width: "177px",
              height: "40px",
              boxShadow: "0px 2px 4px 0px #0000001A",
              backgroundColor: "#0F665A",
              border: "none",
              transition: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            <span style={{ margin: 0 }}>Add Offer</span>
          </Button>
        </div>
      </div> */}

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
            App Slider
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {/* <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
          </div> */}
          <Button
            onClick={() => {
              setOpenAddModel(true);
            }}
            style={{
              width: "177px",
              height: "40px",
              boxShadow: "0px 2px 4px 0px #0000001A",
              backgroundColor: "#09B782",
              border: "none",
              transition: "none",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <PlusOutlined />
            <span style={{ margin: 0 }}>Add Slider</span>
          </Button>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "#0F665A",
              borderRadius: "100%",
            },
          },
          token: {
            colorPrimary: "white",
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={offers}
          rowKey="_id"
          pagination={false}
          className="custom-table"
        />
      </ConfigProvider>

      {/* Add Modal */}
      <Modal
        centered
        open={openAddModel}
        onCancel={() => setOpenAddModel(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Add Offer</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-center gap-10 mb-10">
              <div className="h-32 w-32 flex items-center justify-center bg-gray-300 rounded-full relative">
                {imgURL ? (
                  <img
                    className="w-full h-full z-10 rounded-full object-cover"
                    src={imgURL}
                    alt="preview img"
                  />
                ) : (
                  <CiImageOn className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
                <input
                  onChange={handleAdd}
                  type="file"
                  id="img"
                  name="image"
                  className="display-none absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Offer Name
              </label>
              <input
                value={form.offerName}
                onChange={handleAdd}
                type="text"
                name="offerName"
                placeholder="Enter Offer Name"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Discount
              </label>
              <input
                value={form.discount}
                onChange={handleAdd}
                type="number"
                name="discount"
                placeholder="Discount"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
              />
            </div>

            <div className="flex justify-between w-full mb-4 gap-4">
              <div style={{ width: "100%" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Start Date
                </label>
                <div
                  onClick={() => setShowCalendarFor("start")}
                  style={{
                    border: "1px solid #E0E4EC",
                    padding: "10px",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <span className="text-gray-400">
                    {form.startDate || "Start Date"}
                  </span>
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  End Date
                </label>
                <div
                  onClick={() => setShowCalendarFor("end")}
                  style={{
                    border: "1px solid #E0E4EC",
                    padding: "10px",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <span className="text-gray-400">
                    {form.endDate || "End Date"}
                  </span>
                </div>
              </div>
            </div>

            <input
              className="cursor-pointer"
              style={{
                border: "none",
                width: "100%",
                height: "44px",
                marginTop: "10px",
                background: "#0F665A",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        centered
        open={!!value}
        onCancel={() => {
          setValue(null);
          setImgEditURL("");
          setEditImageFile(null);
        }}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Edit Offer</h1>
          <form onSubmit={handleEdit}>
            <div className="flex justify-center items-center gap-10 mb-10">
              <div className="h-32 w-32 flex items-center justify-center bg-gray-300 rounded-full relative">
                {imgEditURL ? (
                  <img
                    className="w-full h-full z-10 rounded-full object-cover"
                    src={imgEditURL}
                    alt="preview img"
                  />
                ) : (
                  <CiImageOn className="text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
                <input
                  onChange={onEditImageChange}
                  type="file"
                  id="img"
                  name="image"
                  className="display-none absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 z-50"
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Offer Name
              </label>
              <input
                value={form.offerName}
                onChange={onEditInputChange}
                type="text"
                placeholder="Enter Offer Name"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="offerName"
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Discount
              </label>
              <input
                value={form.discount}
                onChange={onEditInputChange}
                type="number"
                placeholder="Discount"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                name="discount"
              />
            </div>

            <div className="flex justify-between w-full mb-4 gap-4">
              <div style={{ width: "100%" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Start Date
                </label>
                <div
                  onClick={() => setShowCalendarFor("start")}
                  style={{
                    border: "1px solid #E0E4EC",
                    padding: "10px",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <span className="text-gray-400">
                    {form.startDate || "Start Date"}
                  </span>
                </div>
              </div>

              <div style={{ width: "100%" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  End Date
                </label>
                <div
                  onClick={() => setShowCalendarFor("end")}
                  style={{
                    border: "1px solid #E0E4EC",
                    padding: "10px",
                    height: "52px",
                    background: "white",
                    borderRadius: "8px",
                    outline: "none",
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <span className="text-gray-400">
                    {form.endDate || "End Date"}
                  </span>
                </div>
              </div>
            </div>

            <input
              className="cursor-pointer"
              style={{
                border: "none",
                width: "100%",
                height: "44px",
                marginTop: "10px",
                background: "#0F665A",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Submit"
              type="submit"
            />
          </form>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        centered
        open={showDelete}
        onCancel={() => setShowDelete(false)}
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
            className="bg-[#0F665A] py-2 px-5 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </Modal>

      {showCalendarFor && (
        <div
          className="fixed left-0 top-0 w-full h-full flex items-center justify-center z-[9999] bg-black bg-opacity-30"
          style={{ pointerEvents: "auto" }}
        >
          <div
            className="bg-white shadow-lg rounded-md p-2 max-w-96"
            style={{ minWidth: 320 }}
          >
            <Calendar fullscreen={false} onSelect={handleDateChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSlider;
