import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  useCreateFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
  useUpdateFAQMutation,
} from "../../redux/features/faqApi";
import toast from "react-hot-toast";

const FAQ = () => {
  const { data, refetch } = useGetFAQQuery();
  const [createFAQ] = useCreateFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();

  const [faqData, setFaqData] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [form, setForm] = useState({ question: "", ans: "" });

  useEffect(() => {
    setFaqData(data?.data);
  }, [data]);

  // Add FAQ
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.question || !form.ans) return;
    const payload = {
      question: form.question,
      answer: form.ans,
    };
    
    try {
      await createFAQ(payload).unwrap();
      refetch();
      setForm({ question: "", ans: "" });
      setOpenAddModal(false);
      toast.success("FAQ Created Successfully.");
    } catch (error) {
      console.error("Create FAQ failed:", error);
    }
  };

  // Edit FAQ
  const handleEdit = async (e) => {
    e.preventDefault();
    if (!form.question || !form.ans) return;
    const payload = {
      question: form.question,
      answer: form.ans,
    };

    try {
      await updateFAQ({ id: currentId, faq: payload }).unwrap();
      refetch();
      setForm({ question: "", ans: "" });
      setCurrentId("");
      setOpenEditModal(false);
      toast.success("FAQ updated successfully.");
    } catch (err) {
      console.error("Update FAQ failed:", err);
    }
  };

  // Delete FAQ
  const handleDelete = async () => {
    try {
      await deleteFAQ(currentId).unwrap();
      refetch();
      toast.success("FAQ deleted successfully.");
    } catch (err) {
      console.error("Delete FAQ failed:", err);
    }
    setShowDelete(false);
    setCurrentId("");
  };

  // Open Edit Modal
  const openEdit = (item) => {
    setForm({ question: item.question, ans: item.answer });
    setCurrentId(item._id);
    setOpenEditModal(true);
  };

  // Open Delete Modal
  const openDelete = (id) => {
    setCurrentId(id);
    setShowDelete(true);
  };

  return (
    <div className="bg-white h-full px-3 py-2 rounded-lg">
      <div style={{ margin: "24px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
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
            FAQ
          </h3>
          <div>
            <Button
              onClick={() => setOpenAddModal(true)}
              style={{
                width: "177px",
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
              <span style={{ margin: 0 }}>Add FAQ</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white pb-6 px-4 rounded-md">
        {faqData?.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4 ">
            <div className="mt-3">
              <GoQuestion color="#09B782" size={25} />
            </div>
            <div className="w-full ">
              <p className="text-base font-medium border-b rounded-lg py-2 px-4 flex items-center gap-8 bg-base">
                <span className=" flex-1 text-[#757575]">
                  {" "}
                  {item?.question} ?
                </span>
              </p>
              <div className="flex justify-start items-start gap-2 border-b  py-2 px-4  rounded-lg my-4 bg-base shadow-none">
                <p className="text-[#757575] leading-[24px] mb-6 ">
                  {item?.answer}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start items-center gap-2">
              <CiEdit
                onClick={() => openEdit(item)}
                className="text-3xl font-semibold cursor-pointer text-[#FFC107]"
              />

              <RiDeleteBin6Line
                onClick={() => openDelete(item._id)}
                className="text-2xl cursor-pointer text-[#D93D04]"
              />
            </div>
          </div>
        ))}
      </div>

      <Modal
        centered
        open={openAddModal}
        onCancel={() => setOpenAddModal(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Add FAQ</h1>
          <form onSubmit={handleAdd}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                type="text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                value={form.question}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) =>
                  setForm((f) => ({ ...f, ans: e.target.value }))
                }
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                value={form.ans}
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                width: "100%",
                border: "none",
                height: "44px",
                background: "#09B782",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Save & change"
              type="submit"
            />
          </form>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        centered
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 className="text-[20px] font-medium mb-3">Update FAQ</h1>
          <form onSubmit={handleEdit}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <input
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                type="text"
                placeholder="Enter Question"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                }}
                value={form.question}
                name="question"
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <textarea
                onChange={(e) =>
                  setForm((f) => ({ ...f, ans: e.target.value }))
                }
                placeholder="Enter answer"
                style={{
                  border: "1px solid #E0E4EC",
                  padding: "10px",
                  height: "152px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  width: "100%",
                  resize: "none",
                }}
                value={form.ans}
                name="ans"
              />
            </div>
            <input
              className="cursor-pointer"
              style={{
                width: "100%",
                border: "none",
                height: "44px",
                background: "#09B782",
                color: "white",
                borderRadius: "8px",
                outline: "none",
                padding: "10px 20px",
              }}
              value="Save & change"
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
            Are you sure !
          </p>
          <p className="pt-4 pb-12 text-center">
            Do you want to delete this content ?
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

export default FAQ;
