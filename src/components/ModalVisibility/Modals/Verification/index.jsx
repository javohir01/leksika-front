import axios from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useDispatch, useSelector } from "react-redux";
import { setVerificationModal } from "../../../../redux/modalSlice";

const { Modal, Form, Input, Button, notification } = require("antd");

const Verification = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const signIn = useSignIn();
  const { verificationModal } = useSelector((state) => state.modal);

  const onFinish = async (e) => {
    setLoading(true);
    try {
      const res = await axios({
        url: "https://back.leksika.uz/user/sign-up/verify",
        method: "POST",
        data: e
      });
      const user = res.data.user;
      console.log(user);
      signIn({
        token: user.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: user.user
      });
      dispatch(setVerificationModal());
      notification.success({ message: "Success" });
    } catch (error) {
      console.log(error);
      notification.error({ message: error.response.data.extraMessage });
    }
    setLoading(false);
  };

  return (
    <Modal
      footer={false}
      title="Verification"
      open={verificationModal.open}
      centered
      closable={false}
    >
      <Form
        onFinish={onFinish}
        initialValues={{
          email: verificationModal?.data?.email
        }}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email!"
            }
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Verification code"
          name="verification_code"
          required
          rules={[
            {
              required: true,
              message: "Please enter verification code!"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ margin: "auto" }}
            loading={loading}
            htmlType="submit"
          >
            Verify
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Verification;
