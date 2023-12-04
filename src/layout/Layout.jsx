import React, { useState } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col, Grid, FloatButton, Modal } from "antd";
import { FaRankingStar, FaRegUser } from "react-icons/fa6";
import { FaSignOutAlt,FaWallet } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  function getItem(label, key, icon, children) {
    if (screens.xl) {
      return {
        key,
        icon,
        children,
        label,
      };
    }
    return {
      key,
      icon,
      children,
    };
  }

  const path = window.location.pathname;

  const items = [
    getItem("Dashboard", "dashboard", <FaRankingStar />),
    getItem("Wallet", "wallet", <FaWallet  />),
    getItem("Profile", "profile", <FaRegUser />),
    getItem("Logout", "logout", <FaSignOutAlt />),
  ];

  const handleNavigation = (menuData) => {
    const { key } = menuData;
    if (key === "dashboard") {
      return navigate("/dashboard", { replace: true });
    }
    if (key === "wallet") {
      return navigate("/wallet", { replace: true });
    }
    if (key === "profile") {
      return navigate("/profile", { replace: true });
    }
    if (key === "logout") {
      return showModal();
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row>
      <Col span={screens.xs ? 0 : 3}>
        <div className="h-[100px] drop-shadow-md flex items-center justify-center cursor-pointer bg-white  border-r-[1px]">
          <div className="h-[50px] w-full lg:px-8 bg-logo bg-no-repeat bg-center bg-contain" />
        </div>
        <Menu
          defaultSelectedKeys={[path.replace("/", "")]}
          mode="inline"
          theme="light"
          items={items}
          className="h-[calc(100vh-100px)] drop-shadow-md "
          onClick={(menuData) => {
            handleNavigation(menuData);
          }}
        />
      </Col>
      <Col span={screens.xs ? 24 : 21}>
        <Outlet />
        <FloatButton.Group
          trigger="click"
          type="primary"
          shape="square"
          style={{ right: 24 }}
          icon={<MdOutlineMenu />}
        >
          <FloatButton
            icon={<FaRankingStar />}
            onClick={() => {
              navigate("/dashboard", { replace: true });
            }}
          />
          <FloatButton
            icon={<FaRegUser />}
            onClick={() => {
              navigate("/profile", { replace: true });
            }}
          />
          <FloatButton
            icon={<FaSignOutAlt />}
            onClick={() => {
              showModal();
            }}
          />
        </FloatButton.Group>

        <Modal
          title="Logout"
          open={isModalOpen}
          onOk={() => {
            localStorage.clear();
            navigate("/login", { replace: true });
          }}
          onCancel={handleCancel}
          cancelButtonProps={{
            className: "bg-white text-navy border-none px-4",
          }}
          okButtonProps={{
            className:
              "bg-red-400 text-white border-none px-4 hover:!bg-red-600",
          }}
        >
          <p>Are you sure to logout?</p>
        </Modal>
      </Col>
    </Row>
  );
};

export default Layout;
