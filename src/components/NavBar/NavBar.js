import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { TbArrowsExchange } from "react-icons/tb";
import Footer from "../Footer/Footer";
import DonationBanner from '../NavBar/DonationBanner';
import "./NavBar.css";
import "./background.css";
import { useDispatch } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { setAuthModal } from "../../redux/modalSlice";
import { useAuthUser, useSignOut } from "react-auth-kit";
import { Avatar, Dropdown, Modal } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// import { Contact } from '../../Pages/RuUz/RuUz';

function NavBar() {
  const history = useHistory();
  const logout = useSignOut();
  const auth = useAuthUser()();
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const ref = useRef();
  const handleClick = () => setClick(!click);

  if (click) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/en-uz" className="nav-logo">
            <svg
              width="300"
              height="60"
              viewBox="0 0 370.25 93.48988802424832"
              className="css-1j8o68f"
            >
              <defs id="SvgjsDefs4163"></defs>
              <g
                id="SvgjsG4164"
                featurekey="mugSzh-0"
                transform="matrix(1.072119398922122,0,0,1.072119398922122,-17.08387339286789,-6.861562721667752)"
                fill="#39e991"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M26.79,33.79v15.72c0,1.15-0.93,2.09-2.08,2.09h-0.3c-1.15,0-2.09-0.939-2.09-2.09V33.79c0-1.17,0.92-2.09,2.09-2.09h0.3  C25.88,31.7,26.79,32.62,26.79,33.79z"
                ></path>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M35.3,33.01v24.44c0,1.13-0.96,2.08-2.09,2.08h-0.33c-1.15,0-2.08-0.931-2.08-2.08V33.01c0-1.17,0.91-2.09,2.08-2.09h0.33  C34.36,30.92,35.3,31.86,35.3,33.01z"
                ></path>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M43.77,32.23v31.15c0,1.15-0.94,2.08-2.08,2.08h-0.33c-1.15,0-2.09-0.93-2.09-2.08V32.23c0-1.15,0.94-2.09,2.09-2.09h0.33  C42.83,30.14,43.77,31.08,43.77,32.23z"
                ></path>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M80.06,69.39v0.931c0,2.85-2.319,5.16-5.17,5.16c-12.81,0-15.75,0-16.58,0.109v-0.03c-7.3,1.28-12.77,7.521-13.359,15.21  c-0.13,0.261-0.14,0.57-0.02,0.841c0,0.01,0,0.01,0,0.02v0.3c-0.71,0.601-4.95,1.67-12.32,1.67c-7.3,0-11.53-1.05-12.29-1.649  c-0.02-1.24-0.19-3.8-0.57-4.99c-0.13-0.37-0.27-0.69-0.41-1.01c-0.39-0.931-0.93-1.851-1.58-2.66c-0.04-0.05-0.08-0.09-0.12-0.13  s-0.07-0.08-0.1-0.11c-0.43-0.49-0.82-0.89-1.17-1.21c-0.49-0.97-0.46-1.72-0.41-3.439c0.02-0.62,0.04-1.33,0.04-2.19V48.42  c0-3.54,1.27-6.39,3.54-8.05v9.1c0,2.69,2.18,4.87,4.86,4.87h0.33c1.27,0,2.42-0.49,3.29-1.28v4.351c0,2.68,2.18,4.859,4.86,4.859  h0.33c1.27,0,2.44-0.489,3.31-1.31v2.38c0,2.68,2.18,4.86,4.86,4.86h0.33c2.68,0,4.86-2.181,4.86-4.86V37.92h-0.04  c0.12-1.12,0.11-4.29,0.09-14.39c-0.02-7.16-0.05-14.3-0.05-14.3c0-1.56,1.27-2.83,2.84-2.83h0.75c1.6,0,2.859,1.25,2.859,2.83  c-0.09,48.31-0.01,48.73,0.021,48.87c0.54,2.53,2.31,4.641,4.75,5.67c0.42,0.15,0.88,0.33,1.38,0.41  c0.05,0.011,0.1,0.011,0.15,0.011L74.89,64.22C77.74,64.22,80.06,66.54,80.06,69.39z"
                ></path>
              </g>
              <g
                id="SvgjsG4165"
                featurekey="PPkF4s-0"
                transform="matrix(1.730151713992555,0,0,1.730151713992555,86.1123757069456,22.139755173606062)"
                fill="#ffffff"
              >
                <path d="M4.017 17.619 l13.59 0 l0 2.3477 l-15.938 0 l0 -11.407 l2.3477 0 l0 9.0597 z M36.907 10.9512 l-13.59 0.000019531 l0 2.1863 l9.0642 0.03375 l-0.0086328 2.3478 l-9.0556 -0.03375 l0 2.1782 l13.59 0 l0 2.3477 l-15.938 0 l0 -11.407 l15.938 0 l0 2.3476 z M55.995999999999995 17.619 l0.034746 2.3244 l-1.1621 0.017402 c-0.18049 0.002754 -0.38464 0.0058984 -0.60738 0.0058984 c-1.6091 0 -4.1898 -0.15982 -5.8222 -1.768 c-0.77534 -0.7638 -1.2442 -1.7492 -1.4014 -2.9364 c-0.85432 0.12438 -1.7942 0.19199 -2.8226 0.19199 l-1.641 0 l0 4.4852 l-2.3246 0 l0 -11.295 l2.3246 0 l0 4.4853 l1.641 0 c4.7582 0 7.2478 -1.6252 7.2478 -3.2308 l0 -1.1623 l2.3246 0 l0 1.1622 c0 1.9109 -1.4137 3.8334 -4.469 4.8392 c0.06213 0.77546 0.30946 1.3688 0.75204 1.8049 c1.1652 1.1478 3.5954 1.1114 4.7634 1.0939 z M62.178 11.0046 c-0.21816 0.12059 -0.44118 0.32306 -0.44118 0.90966 c0 0.45724 0.14779 0.70718 0.52734 0.89108 c0.38386 0.18598 0.81196 0.19957 0.83354 0.2001 l8.5334 0.03336 c1.4828 0 3.6956 0.9158 3.6956 3.4388 s-2.0564 3.4388 -3.4388 3.4388 l-12.499 0 l0 -2.3477 l12.488 0 c0.1024 -0.0035352 0.40818 -0.04211 0.66022 -0.18152 c0.21828 -0.12072 0.44128 -0.32318 0.44128 -0.90964 c0 -0.45724 -0.14779 -0.70718 -0.52734 -0.89108 c-0.3827 -0.18547 -0.81038 -0.19947 -0.8343 -0.20012 l-8.5278 -0.03793 l0 0.0045703 c-1.4875 0 -3.7004 -0.9158 -3.7004 -3.4388 s2.0564 -3.4388 3.4388 -3.4388 l12.499 0 l0 2.3477 l-12.488 0 c-0.10229 0.0035352 -0.40834 0.04211 -0.6605 0.18152 z M80.9938 20.02461 l-2.3246 0 l0 -11.295 l2.3246 0 l0 11.295 z M100.096 17.619 l0.034746 2.3244 l-1.1621 0.017402 c-0.18049 0.002754 -0.38464 0.0058984 -0.60738 0.0058984 c-1.6091 0 -4.1898 -0.15982 -5.8222 -1.768 c-0.77534 -0.7638 -1.2442 -1.7492 -1.4014 -2.9364 c-0.85432 0.12438 -1.7942 0.19199 -2.8226 0.19199 l-1.641 0 l0 4.4852 l-2.3246 0 l0 -11.295 l2.3246 0 l0 4.4853 l1.641 0 c4.7582 0 7.2478 -1.6252 7.2478 -3.2308 l0 -1.1623 l2.3246 0 l0 1.1622 c0 1.9109 -1.4137 3.8334 -4.469 4.8392 c0.06213 0.77546 0.30946 1.3688 0.75204 1.8049 c1.1652 1.1478 3.5954 1.1114 4.7634 1.0939 z M111.65540000000001 8.011 l9.1766 12.19 l-2.9508 0 l-2.566 -3.3974 l-7.3197 0 l-2.5286 3.3974 l-2.9177 0 z M109.7562 14.4556 l3.7983 0 l-1.8992 -2.5322 z M125.59700000000001 19.59116 l-2.3478 0.000019531 l0 -2.375 l2.3477 0 l0 2.375 z M144.887 8.487 l0.041758 5.7 c0.017129 1.2612 -0.49178 2.4856 -1.4332 3.448 c-0.9982 1.0203 -2.9408 2.242 -6.5268 2.2684 c-0.034786 0.0002539 -0.069706 0.00039062 -0.10424 0.00039062 c-2.7146 0 -4.9816 -0.77976 -6.3926 -2.201 c-0.96994 -0.97702 -1.4953 -2.2218 -1.4805 -3.5064 l-0.041992 -5.6918 l2.3476 -0.017402 l0.042246 5.7166 l-0.00013672 0.012813 c-0.0096876 0.66232 0.26668 1.2957 0.799 1.832 c0.98014 0.98734 2.6886 1.5215 4.8136 1.507 c2.1676 -0.015957 3.8956 -0.57078 4.866 -1.5626 c0.50916 -0.5204 0.77336 -1.1346 0.76394 -1.7765 l0 -0.0083789 l-0.04211 -5.7036 z M164.227 8.491 l0 2.3943 l-11.374 6.6654 l11.374 0 l0 2.3477 l-15.938 0 l0 -2.3943 l11.374 -6.6656 l-11.374 0 l0 -2.3476 l15.938 0 z"></path>
              </g>
            </svg>
          </NavLink>
          <ul ref={ref} className={click ? "nav-menu active" : "nav-menu"}>
            <div className="nav-menu-div">
              <li
                className="nav-item"
                onClick={() => {
                  if (ref.current.classList.contains("active")) {
                    handleClick();
                  }
                }}
              >
                <a href="/en-uz" className="nav-links">
                  ENG
                  <TbArrowsExchange />
                  UZB
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  if (ref.current.classList.contains("active")) {
                    handleClick();
                  }
                }}
              >
                <a href="/ru-uz" className="nav-links">
                  RUS
                  <TbArrowsExchange />
                  UZB
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  if (ref.current.classList.contains("active")) {
                    handleClick();
                  }
                }}
              >
                <a href="/articles" className="nav-links">
                  Articles
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  if (ref.current.classList.contains("active")) {
                    handleClick();
                  }
                }}
              >
                <a href="/grammar" className="nav-links">
                  Grammar
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  if (ref.current.classList.contains("active")) {
                    handleClick();
                  }
                }}
              >
                <a href="/about" className="nav-links">
                  About
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => !auth && dispatch(setAuthModal())}
              >
                {auth ? (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: (
                            <a href="/profile" className="nav-links">
                              Profile
                            </a>
                          ),
                          key: "0",
                        },
                        {
                          label: (
                            <p
                              style={{ verticalAlign: "middle", display: "inline-block", transform: "translate(-50 %, -50 %)" }}
                              onClick={() =>
                                Modal.confirm({
                                  content:
                                    "Are you sure that you want to log out?",
                                  onOk: () => {
                                    logout();
                                    history.push("/");
                                  },
                                  okText: "Log Out",
                                })
                              }
                              // style={{ color: "red" }}
                            >
                              Log out
                            </p>
                          ),
                          key: "1",
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Avatar
                      // style={{
                      //   backgroundColor: "#fde3cf",
                      //   color: "#f56a00",
                      // }}
                      icon={<UserOutlined />}
                    >
                      {auth?.username?.[0].toUpperCase()}
                    </Avatar>
                  </Dropdown>
                ) : (
                  <p className="nav-links" style={{ cursor: "pointer" }}>
                    Login
                  </p>
                )}
              </li>
            </div>
            {click && <Footer />}
          </ul>
          <DonationBanner />
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
