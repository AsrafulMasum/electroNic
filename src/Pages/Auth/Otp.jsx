import { Button } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import {
  useOtpVerifyMutation,
  useResendOTPMutation,
} from "../../redux/features/authApi";
import toast from "react-hot-toast";
const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");
  const [otpVerify] = useOtpVerifyMutation();
  const [resendOTP] = useResendOTPMutation();

  const onFinish = async () => {
    const data = {
      email: email,
      oneTimeCode: Number(otp),
    };

    try {
      const res = await otpVerify(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        navigate(`/update-password?token=${res?.data?.verifyToken}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendEmail = async () => {
    try {
      const res = await resendOTP({ email }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-white"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="login-form bg-base rounded-2xl px-[40px] py-[100px] w-[700px] shadow-soft">
        <div
          style={{
            width: "620px",
            borderRadius: "12px",
            padding: "90px 57px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              color: "#000000",
              textAlign: "center",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Verify Email
          </h1>
          <p
            style={{
              color: "#757575",
              textAlign: "center",
              lineHeight: "24px",
              marginTop: "24px",
            }}
          >
            Enter the 5-digit code sent to your email.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "47px",
              marginBottom: "47px",
            }}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              inputStyle={{
                height: "50px",
                width: "55px",
                borderRadius: "12px",
                marginRight: "20px",
                fontSize: "20px",
                border: "0.8px solid #818181",
                color: "#333333",
                outline: "none",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className="flex justify-center">
            <Button
              onClick={onFinish}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              style={{
                height: "44px",
                width: "93px",
                fontWeight: "500",
                fontSize: "14px",
                background: "#09B782",
                borderRadius: "8px",
                marginBottom: "47px",
              }}
            >
              Verify
            </Button>
          </div>

          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#757575",
            }}
          >
            Didn’t receive code?
            <p
              onClick={handleResendEmail}
              style={{
                color: "#FFC603",
                cursor: "pointer",
              }}
            >
              Send Again.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
