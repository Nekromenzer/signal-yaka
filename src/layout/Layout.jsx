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
        <Menu
          defaultSelectedKeys={[setActiveKey()]}
          mode="inline"
          theme="light"
          items={items}
          className="h-screen"
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
