import React, { useState, useEffect } from "react";
import { Card, Avatar, Typography, Button } from "antd";
import PageWrapper from "../../layout/PageWrapper";
import handleApiCall from "../../api/handleApiCall";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    telegram_id: "",
    binance_pay_id: "",
    phone: "",
    address: "",
    referral_user_id: localStorage.getItem("referralId"),
    user_auth_id: localStorage.getItem("uid"),
  });
  const [loading, setLoading] = useState(false);
  const dataList = [
    {
      id: "name",
      label: "Name",
      value: userData.name,
    },
    {
      id: "phone",
      label: "Phone",
      value: userData.phone,
    },
    {
      id: "address",
      label: "Address",
      value: userData.address,
    },
    {
      id: "email",
      label: "Email",
      value: userData.email,
    },
    {
      id: "telegram_id",
      label: "Telegram ID",
      value: userData.telegramId,
    },
    {
      id: "binance_pay_id",
      label: "Binance ID",
      value: userData.binanceId,
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

  useEffect(() => {
    // fetch user data from api
    handleApiCall({
      urlType: "profiles",
      // urlParams: `/rNn1qCtUMKndzPA0uQR8`,
      cb: (res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      },
    });

    //   axios
    //     .get("https://us-central1-infact-zerp.cloudfunctions.net/api/user/profiles")
    //     .then(function (response) {
    //       // handle success
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function () {
    //       // always executed
    //     });
  }, []);

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
                editable={(text) => {
                  handleValueChange(text, item.id);
                }}
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
              handleApiCall({
                urlType: "createProfile",
                data: userData,
                cb: (res) => {
                  if (res.status === 200) {
                    console.log(res.data);
                  }
                },
              });
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
