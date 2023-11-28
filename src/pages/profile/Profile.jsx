import React, { useState } from "react";
import { Card, Avatar, Typography, Button } from "antd";
import PageWrapper from "../../layout/PageWrapper";

const Profile = () => {
  const [userData, setUserData] = useState({
    email: localStorage.getItem("email"),
    telegramId: "user@88",
    binanceId: "9978797978892",
    phone: "**********",
  });
  const [loading, setLoading] = useState(false);
  const dataList = [
    {
      id: "email",
      label: "Email",
      value: userData.email,
    },
    {
      id: "telegramId",
      label: "Telegram ID",
      value: userData.telegramId,
    },
    {
      id: "binanceId",
      label: "Binance ID",
      value: userData.binanceId,
    },
    {
      id: "phone",
      label: "Phone",
      value: userData.phone,
    },
  ];

  const handleValueChange = (text, id) => {
    if (id === "email") {
      if (!validateEmail(text)) {
        return;
      }
    }
    setUserData({
      ...userData,
      [id]: text,
    });
  };

  const validateEmail = (email) => {
    // eslint-disable-next-line no-useless-escape
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const { Paragraph } = Typography;

  return (
    <PageWrapper>
      <Card
        bordered={false}
        style={{ maxWidth: 600 }}
        className="drop-shadow-md shadow-emerald-500"
      >
        <div className="flex items-center justify-between cursor-pointer">
          <h1 className="font-semibold">{localStorage.getItem("name")}</h1>
          <Avatar
            size={60}
            className="border-[1px] border-gray-300 hover:shadow-md duration-200 transition-shadow"
            // profile image url
            src={localStorage.getItem("profilePic")}
          />
        </div>
        <div className="mt-6">
          {dataList.map((item, index) => (
            <div
              className="flex gap-1 md:gap-4 md:items-center items-start flex-col md:flex-row"
              key={index}
            >
              <div className="md:w-1/5 w-1/2 flex gap-1 justify-between">
                <Paragraph className="font-semibold">{item.label}</Paragraph>
                <Paragraph className="font-semibold">:</Paragraph>
              </div>
              <Paragraph
                className="w-full disabled:!text-black !text-black"
                disabled={item.id === "phone" || item.id === "email"}
                editable={
                  item.id !== "phone" && {
                    onChange: (text) => {
                      handleValueChange(text, item.id);
                    },
                  }
                }
              >
                {item.value}
              </Paragraph>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center lg:justify-end">
          <Button
            type="default"
            className="text-[0.8rem] px-2 border-none font-semibold border-[1px] bg-emerald-500 text-white hover:!text-emerald-500 hover:!bg-emerald-100 hover:!border-emerald-500 hover:!shadow-emerald-500 duration-200 transition-all"
            onClick={() => {
              console.log("clicked");
            }}
            loading={loading}
          >
            {loading ? "saving..." : "Update"}
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
};

export default Profile;
