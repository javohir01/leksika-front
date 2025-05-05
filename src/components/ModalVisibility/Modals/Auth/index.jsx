import "./style.css";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModal } from "../../../../redux/modalSlice";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthModal = () => {
  const [active, setActive] = useState("login");
  const dispatch = useDispatch();
  const { authModal } = useSelector((state) => state.modal);

  return (
    <Modal
      centered
      onCancel={() => dispatch(setAuthModal())}
      closable={false}
      footer={false}
      open={authModal}
    >
      <div className={`auth-modal-header`}>
        <h3
          className={`${active === "login" && "active"}`}
          onClick={() => setActive("login")}
          tabIndex={0}
        >
          Login
        </h3>
        <div className="seperator"></div>
        <h3
          className={`${active === "signup" && "active"}`}
          onClick={() => setActive("signup")}
          tabIndex={0}
        >
          Sign Up
        </h3>
      </div>
      <div className="auth-modal-body">
        {active === "login" ? <Login /> : <Register />}
      </div>
    </Modal>
  );
};

export default AuthModal;
