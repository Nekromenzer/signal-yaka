import React from "react";
import { Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const PageWrapper = ({ children }) => {
  const path = window.location.pathname;
  return (
    <>
      <div className="h-[50px] w-full px-4 lg:px-5 flex items-center gap-4 justify-end">
        <div className="mr-auto text-[0.8rem] capitalize">{path.replace("/", "")}</div>
        <span className="font-semibold tracking-wide text-base">Maneesha Gimshan</span>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40 }}
          icon={<AntDesignOutlined />}
        />
      </div>
      <div className="h-[calc(100vh-66px)] lg:h-[calc(100vh-70px)] 2xl:h-[calc(100vh-74px)] p-4 lg:p-5">
        {children}
      </div>
    </>
  );
};

export default PageWrapper;
