import React from "react";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const PageWrapper = ({ children, childClass }) => {
  const path = window.location.pathname;
  return (
    <div className="dashboard-bg">
      <div className="h-[50px] w-full px-4 lg:px-5 flex items-center gap-4 justify-end bg-transparent">
        <div className="mr-auto text-[0.8rem] capitalize font-mono text-slate-900/70">
          {path.replace("/", "")}
        </div>
        <span className="font-semibold tracking-wide text-base text-slate-950">
          {localStorage.getItem("name")}
        </span>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40 }}
          icon={<AntDesignOutlined />}
          src={localStorage.getItem("profilePic")}
        />
      </div>
      <div
        className={`h-[calc(100vh-50px)] lg:h-[calc(100vh-70px)] 2xl:h-[calc(100vh-50px)] p-4 lg:p-5 ${childClass}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
