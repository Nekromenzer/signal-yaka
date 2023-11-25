import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col } from "antd";
import { FaLink, FaRankingStar } from "react-icons/fa6";

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

  const items = [
    getItem("Dashboard", "dashboard", <FaRankingStar />),
    getItem("Referral", "referral", <FaLink />),
  ];

  const handleNavigation = (menuData) => {
    const { key } = menuData;
    if (key === "dashboard") {
      return navigate("/dashboard", { replace: true });
    }
    if (key === "referral") {
      return navigate("/referral", { replace: true });
    }
  };

  const setActiveKey = () => {
    const path = window.location.pathname;
    if (path === "/dashboard") {
      return "dashboard";
    }
    if (path === "/referral") {
      return "referral";
    }
  };

  return (
    <Row>
      <Col span={3} className="bg-red-400">
        <div className="h-[100px] border-r-[1px] flex items-center justify-center cursor-pointer">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="logo"
            className="h-[50px]"
          />
        </div>
        <Menu
          defaultSelectedKeys={[setActiveKey()]}
          mode="inline"
          theme="light"
          items={items}
          className="h-[calc(100vh-100px)]"
          onClick={(menuData) => {
            handleNavigation(menuData);
          }}
        />
      </Col>
      <Col span={21} className="p-4 lg:p-5 2xl:p-6">
        <Outlet />
      </Col>
    </Row>
  );
};

export default Layout;
