import { Button, Form, Input } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setAuthModal } from "../../../../../redux/modalSlice";
import { GoogleOutlined } from "@ant-design/icons";
import { signInWithGoogle } from "../../../../../lib/firebase.config";

const Login = () => {
  const [googleSign, setGoogleSign] = useState(false);
  const dispatch = useDispatch();
  const signIn = useSignIn();
  const [loading, setLoading] = useState(false);
  const onFinish = async (e) => {
    setLoading(true);
    try {
      const res = await axios({
        url: "https://back.leksika.uz/user/sign-in",
        method: "POST",
        data: e
      });
      const user = res.data.user;

      signIn({
        token: user.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: user.user
      });

      notification.success({ message: "Success" });
      dispatch(setAuthModal());
    } catch (error) {
      notification.error({
        message: error?.response?.data?.extraMessage || "Something went wrong!"
      });
    }
    setLoading(false);
  };
  const onSignWithGoogle = async () => {
    setGoogleSign(true);
    try {
      const googleResponse = await signInWithGoogle();

      const response = await axios({
        url: "https://back.leksika.uz/user/sign-in/google",
        method: "POST",
        data: {
          email: googleResponse.user.email
        }
      });

      const user = response.data.user;

      signIn({
        token: user.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: user.user
      });
      notification.success({ message: "Success" });
      dispatch(setAuthModal());
    } catch (error) {
      notification.error({ message: error.response.data.extraMessage });
    }
    setGoogleSign(false);
  };
  return (
    <div>
      <p
        style={{
          marginBottom: "15px"
        }}
      >
        Enter your username and password to login.
      </p>
      <Form onFinish={onFinish}>
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
          {loading ? <LoadingOutlined /> : "Login"}
        </button>
      </Form>
      <Button
        loading={googleSign}
        onClick={() => onSignWithGoogle()}
        className="auth-button"
      >
        <GoogleOutlined /> Sign in with Google
      </Button>
      {/* <button className="google-button cursor-pointer flex items-center gap-2 border border-[#EAEAEA] h-[40px] w-full rounded-md">
        <GoogleOutlined className="pl-[15px]" />
        Sign in with Google
      </button> */}
    </div>
  );
};

export default Login;
