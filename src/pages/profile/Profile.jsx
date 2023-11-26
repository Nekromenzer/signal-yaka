import React, { useState } from "react";
import { Card, Avatar, Typography, Button } from "antd";
import PageWrapper from "../../layout/PageWrapper";

const Profile = () => {
  const [userData, setUserData] = useState({
    email: "bagimshan@gmail.com",
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
        className="drop-shadow-md"
      >
        <div className="flex items-center justify-between cursor-pointer">
          <h1 className="font-semibold">Maneesha Gimshan</h1>
          <Avatar
            size={60}
            className="border-[1px] border-gray-300 hover:shadow-md duration-200 transition-shadow"
            // profile image url
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          />
        </div>
        <div className="mt-6">
          {dataList.map((item, index) => (
            <div className="flex gap-4 items-center" key={index}>
              <div className="w-1/5 flex gap-1 justify-between">
                <Paragraph className="font-semibold">{item.label}</Paragraph>
                <Paragraph className="font-semibold">:</Paragraph>
              </div>
              <Paragraph
                className="w-full"
                disabled={item.id === "phone"}
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
            className="text-[0.8rem] px-2 border-none font-semibold bg-navy text-white hover:!text-white/60 ml-auto"
            onClick={() => {
              console.log("clicked");
            }}
            loading={loading}
          >
            {loading ? "saving..." : "Input Button Name"}
          </Button>
        </div>
      </Card>
    </PageWrapper>
  );
};

export default Profile;
