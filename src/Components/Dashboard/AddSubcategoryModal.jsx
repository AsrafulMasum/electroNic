import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import {
  useAddSubCategoryMutation,
} from "../../redux/features/categoriesApi";
import { ImSpinner9 } from "react-icons/im";

const AddSubCategoryModal = ({
  openSubCategory,
  setOpenSubCategory,
  category,
  refetch,
}) => {
  const [addSubCategory, { isLoading }] = useAddSubCategoryMutation();

  const [form] = useForm();

  const handleAddSubCategory = async (values) => {
    const payload = {
      ...values,
      categoryId: category,
    };

    try {
      const res = await addSubCategory(payload).unwrap();
      if (res?.success) {
        refetch();
        form.resetFields();

        toast.success(res?.message);
        setOpenSubCategory(false);
      }
    } catch (error) {
      console.log("Validation Failed:", error);
      toast.error(error?.data?.message);
    }
  };

  return (
    <Modal
      centered
      open={openSubCategory}
      onCancel={() => {
        setOpenSubCategory(!openSubCategory);
        setImgURL(null);
        form.resetFields();
      }}
      width={500}
      footer={false}
    >
      <div className="p-6 ">
        <h1
          className="font-semibold text-black text-xl"
          style={{ marginBottom: "12px" }}
        >
          Add Sub-Category
        </h1>

        <Form form={form} onFinish={handleAddSubCategory}>
          <p className="text-[#6D6D6D] py-1">Sub Category Name</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Sub Category Name",
              },
            ]}
          >
            <Input
              className="w-[100%] border outline-none px-3 py-[10px]"
              type="text"
              placeholder="Enter Sub-Category Name"
            />
          </Form.Item>
          <div className="text-center mt-6">
            <button className="bg-green px-6 py-3 w-full text-[#FEFEFE] rounded-md flex items-center justify-center gap-2">
              {isLoading && <ImSpinner9 size={20} className="animate-spin" />}{" "}
              Add Sub-Category
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddSubCategoryModal;
