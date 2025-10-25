import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.svg";
import { useLoginMutation } from "../../redux/features/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const [login] = useLoginMutation();

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const onFinish = async (values) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (res?.success) {
        localStorage.setItem("token", JSON.stringify(res?.data?.accessToken));
        toast.success("Login successful!");
        if (values?.remember) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: values?.email,
              password: values?.password,
            })
          );
        } else {
          localStorage.removeItem("user");
        }
        navigate("/");
      } else {
        toast.error("Login failed.", res?.message || "Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Check your credentials.");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div>
        <Form
          name="normal_login"
          className="login-form bg-base rounded-2xl px-[150px] py-20 w-[686px] shadow-soft"
          initialValues={{
            email: savedUser?.email || "",
            password: savedUser?.password || "",
            remember: !!savedUser,
          }}
          onFinish={onFinish}
        >
          <div className="flex justify-center">
            <img className="w-60 h-60" src={logo} alt="logo of the website" />
          </div>
          <h3 className="text-2xl text-dark font-semibold leading-8 text-center pb-6">
            Log in to your account
          </h3>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="email"
              className="text-base font-medium leading-6 text-[#636363]"
              style={{ display: "block", marginBottom: "6px" }}
            >
              {" "}
              Email{" "}
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Asadujjaman@gmail.com"
                type="email"
                style={{
                  border: "1px solid #E0E0E0",
                  height: "50px",
                  background: "#FEFEFE",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </Form.Item>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{ display: "block", marginBottom: "6px" }}
              htmlFor="password"
              className="text-base font-medium leading-6 text-[#636363]"
            >
              Password
            </label>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                placeholder="********"
                style={{
                  border: "1px solid #E0E0E0",
                  height: "50px",
                  background: "#FEFEFE",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </Form.Item>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ color: "#757575", fontSize: "16px" }}>
                Remember me
              </Checkbox>
            </Form.Item>
            <a
              className="login-form-forgot"
              style={{
                color: "#FFC107",
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
              }}
              href="/forgot-password"
            >
              Forgot password
            </a>
          </div>

          <div className="flex justify-center">
            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                style={{
                  height: "44px",
                  width: "99px",
                  fontWeight: "500",
                  fontSize: "14px",
                  background: "#09B782",
                  marginTop: "40px",
                  borderRadius: "8px",
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
