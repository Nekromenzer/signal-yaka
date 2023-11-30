import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import handleApiCall from "../../api/handleApiCall";

const nicRegex = /^(?:\d{9}(?:V|v)|\d{12})$/;
function validateNIC(nicNumber) {
  return nicRegex.test(nicNumber);
}

const CreateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  // console.log(localStorage.getItem("email"));

  const initialValues = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    nic: "991221891V",
    mobile: "0766856678",
    address: "bandarwela",
    telegram_id: "23123",
    binance_pay_id: "213123123",
  };

  useEffect(() => {
    // fetch user data from api
    handleApiCall({
      urlType: "getProfileById",
      urlParams: `/${localStorage.getItem("uid")}`,
      setLoading,
      cb: (res) => {
        if (res.status === 200) {
          navigate("/dashboard", { replace: true });
        } else if (res.response.data.statusCode === 404) {
          setShowForm(true);
        } else {
          navigate("/dashboard", { replace: true });
        }
      },
    });
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading... Please wait
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {showForm && (
        <>
          <div className="mb-5 text-center text-[2rem]">Create Profile</div>
          <Form
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
            initialValues={initialValues}
            onFinish={(values) => {
              const data = {
                ...values,
                referral_user_id: localStorage.getItem("referralId"),
                subscription_id: "",
                user_auth_id: localStorage.getItem("uid"),
              };

              handleApiCall({
                urlType: "createProfile",
                data: data,
                setLoading,
                cb: (res) => {
                  if (res.status === 201) {
                    navigate("/dashboard", { replace: true });
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default CreateProfile;
