import React, { useState, useEffect } from "react";
import { Card, Avatar, Input, Button, Form, message, Spin } from "antd";
import PageWrapper from "../../layout/PageWrapper";
import handleApiCall from "../../api/handleApiCall";

const nicRegex = /^(?:\d{9}(?:V|v)|\d{12})$/;
function validateNIC(nicNumber) {
  return nicRegex.test(nicNumber);
}

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: localStorage.getItem("email"),
    nic: "",
    mobile: "",
    address: "",
    telegram_id: "",
    binance_pay_id: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const getProfileData = () => {
    handleApiCall({
      urlType: "getProfileById",
      urlParams: `/${localStorage.getItem("uid")}`,
      setLoading,
      cb: (res) => {
        if (res.status === 200) {
          const {
            nic,
            address,
            mobile,
            telegram_id,
            binance_pay_id,
            name,
            subscription_valid,
            kyc_verified,
          } = res?.data;
          localStorage.setItem("subscription_valid", subscription_valid);
          localStorage.setItem("kyc_verified", kyc_verified);
          setUserData({
            name: name,
            nic: nic,
            mobile: mobile,
            address: address,
            telegram_id: telegram_id,
            binance_pay_id: binance_pay_id,
          });
        } else {
          messageApi.error("Something went wrong");
        }
      },
    });
  };

  const success = () => {
    messageApi.success("Profile Updated Successfully");
    getProfileData();
  };

  useEffect(() => {
    // fetch user data from api
    getProfileData();
  }, []);

  useEffect(() => {
    form.setFieldsValue(userData);
  }, [userData]);

  return (
    <PageWrapper>
      {contextHolder}
      <Spin tip="Updating... Please wait" spinning={loading}>
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
          <Form
            form={form}
            name="create"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
              width: "100%",
              zoom: 0.9,
            }}
            initialValues={userData}
            onFinish={(values) => {
              const data = {
                ...values,
              };

              handleApiCall({
                urlType: "editProfile",
                urlParams: `?id=${localStorage.getItem("uid")}`,
                data: data,
                setLoading,
                cb: (res) => {
                  if (res.status === 200 || res.status === 201) {
                    success();
                  } else {
                    messageApi.error("Something went wrong");
                  }
                },
              });
            }}
            autoComplete="off"
            className="text-sm"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: "email",
                  message: "Please enter valid email",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="NIC"
              name="nic"
              rules={[
                { required: true, message: "Please enter your NIC number" },
                () => ({
                  validator(_, value) {
                    if (!value || validateNIC(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Enter valied NIC number"));
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="mobile"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^0[0-9]{9}$/,
                  message: "Please enter valid phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your Address" }]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
          label=""
          name="address"
          rules={[{ required: true, message: "Please enter your Address" }]}
        >
          <Input />
        </Form.Item> */}

            <Form.Item
              label="Telegram ID"
              name="telegram_id"
              rules={[
                { required: true, message: "Please enter your Telegram ID" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Binance ID"
              name="binance_pay_id"
              rules={[
                { required: true, message: "Please enter your Binance ID" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-950 text-white text-sm w-full mt-6"
              >
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </PageWrapper>
  );
};

export default Profile;
