import { Form, Input, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  setAuthModal,
  setVerificationModal
} from "../../../../../redux/modalSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (e) => {
    setLoading(true);
    try {
      await axios({
        url: "https://back.leksika.uz/user/sign-up",
        method: "POST",
        data: e
      });

      notification.success({ message: "Success" });
      dispatch(setAuthModal());
      dispatch(setVerificationModal(e));
    } catch (error) {
      console.log(error);
      notification.error({ message: error.response.data.extraMessage });
    }
    setLoading(false);
  };

  return (
    <div>
      <p
        style={{
          marginBottom: "15px"
        }}
      >
        Enter your email, username and password to sign up.
      </p>
      <Form onFinish={onFinish}>
        <Form.Item
          name="nickname"
          rules={[
            {
              required: true,
              message: "Please enter nickname!"
            }
          ]}
        >
          <Input
            className="h-[40px] mt-[14px] border border-[#46A358]"
            placeholder="Nickname"
          />
        </Form.Item>
        {/* <Form.Item
          name="surname"
          rules={[
            {
              required: true,
              message: "Please enter surname!",
            },
          ]}
        >
          <Input
            className="h-[40px] mt-[14px] border border-[#46A358]"
            placeholder="Surname"
          />
        </Form.Item> */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email!"
            }
          ]}
        >
          <Input
            className="h-[40px] mt-[14px] border border-[#46A358]"
            placeholder="Email"
            type="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter password!"
            }
          ]}
        >
          <Input.Password
            className="h-[40px] mt-[17px] border border-[#46A358]"
            placeholder="*********"
            type="password"
          />
        </Form.Item>
        <button type="submit" className="auth-button">
          {loading ? <LoadingOutlined /> : "Sign Up"}
        </button>
      </Form>{" "}
      {/* <button className="google-button cursor-pointer flex items-center gap-2 border border-[#EAEAEA] h-[40px] w-full rounded-md">
        <GoogleOutlined className="pl-[15px]" />
        Sign up with Google
      </button> */}
    </div>
  );
};

export default Register;
