import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col } from "antd";
import { FaLink, FaRankingStar, FaRegUser } from "react-icons/fa6";

const Layout = () => {
  const navigate = useNavigate();
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const path = window.location.pathname;

  const items = [
    getItem("Dashboard", "dashboard", <FaRankingStar />),
    getItem("Referral", "referral", <FaLink />),
    getItem("Profile", "profile", <FaRegUser />),
  ];

  const handleNavigation = (menuData) => {
    const { key } = menuData;
    if (key === "dashboard") {
      return navigate("/dashboard", { replace: true });
    }
    if (key === "referral") {
      return navigate("/referral", { replace: true });
    }
    if (key === "profile") {
      return navigate("/profile", { replace: true });
    }
  };

  return (
    <Row>
      <Col span={3}>
        <div className="h-[100px] drop-shadow-md border-none flex items-center justify-center cursor-pointer bg-white">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="logo"
            className="h-[50px]"
          />
        </div>
        <Menu
          defaultSelectedKeys={[path.replace("/", "")]}
          mode="inline"
          theme="light"
          items={items}
          className="h-[calc(100vh-100px)] drop-shadow-md !border-none"
          onClick={(menuData) => {
            handleNavigation(menuData);
          }}
        />
      </Col>
      <Col span={21}>
        <Outlet />
      </Col>
    </Row>
  );
};

export default Layout;
