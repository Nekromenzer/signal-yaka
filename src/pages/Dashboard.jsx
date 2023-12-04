import React, { useEffect, useState } from "react";
import PageWrapper from "../layout/PageWrapper";
import { Modal, Card, Typography, Spin, Row, Col, Progress } from "antd";
import handleApiCall from "../api/handleApiCall";
import { RiMedalFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiBinance, SiTelegram } from "react-icons/si";
import dayjs from "dayjs";

const Dashboard = () => {
  const [subscription, setSubscription] = useState({
    subscription_valid: false,
    kyc_verified: false,
  });
  const [userData, setUserData] = useState({});
  const [earnings, setEarnings] = useState({
    direct: 0,
    indirect: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Paragraph } = Typography;
  const referralLink = import.meta.env.VITE_REFERRAL_URL;
  const modifiedReferralLink = `${referralLink}/ref/${localStorage.getItem(
    "uid"
  )}`;

  const profileStates = [
    {
      name: "Email verified",
      state: userData.email_verified,
    },
    {
      name: "Mobile verified",
      state: userData?.mobile_verified,
    },
    {
      name: "KYC verified",
      state: userData?.kyc_verified,
    },
    {
      name: "Subscription valid",
      state: userData?.subscription_valid,
    },
  ];

  const tasks = [
    {
      name: "complete 500 down-liners",
      state: false,
    },
    {
      name: "complete 1000 down-liners",
      state: false,
    },
  ];

  function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
  }

  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }

  const subsValid = 180;
  const subscribedDay = toDateTime(userData.subscribed_at?._seconds);
  const subscriptionEndDate = dayjs(subscribedDay)
    .add(subsValid, "day")
    .format("YYYY-MM-DD");
  const getRemainingDays = dayjs().diff(subscriptionEndDate, "day");

  useEffect(() => {
    handleApiCall({
      urlType: "getWalletById",
      urlParams: `/${localStorage.getItem("uid")}`,
      setLoading,
      cb: (res) => {
        if (res.status === 200) {
          const { direct_earnings, indirect_earnings } = res?.data;
          setEarnings({
            direct: direct_earnings,
            indirect: indirect_earnings,
          });
        }
      },
    });
  }, []);

  useEffect(() => {
    handleApiCall({
      urlType: "getProfileById",
      urlParams: `/${localStorage.getItem("uid")}`,
      setLoading,
      cb: (res) => {
        // profile data
        if (res.status === 200) {
          const { subscription_valid, kyc_verified, subscription_id } =
            res?.data;
          localStorage.setItem("subscription_valid", subscription_valid);
          localStorage.setItem("kyc_verified", kyc_verified);
          setUserData({
            subscription_valid: subscription_valid,
            kyc_verified: kyc_verified,
            ...res.data,
          });
          // call subs
          handleApiCall({
            variant: "variant",
            urlType: "getSubById",
            urlParams: `/${subscription_id}`,
            setLoading,
            cb: (res) => {
              if (res.status === 200) {
                setSubscription(res?.data);
              }
            },
          });
        }
      },
    });
  }, []);

  return (
    <PageWrapper>
      <Spin tip="Updating... Please wait" spinning={loading}>
        <Row>
          <Col xs={24} lg={18} className="2xl:px-8">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              {!userData.kyc_verified && (
                <div className="w-full flex-1 min-h-[8rem] bg-yellow-50 rounded-2xl shadow-sm border-2 text-center px-4 border-yellow-200 flex items-center justify-center text-slate-900 font-semibold tracking-wider">
                  Please verify your KYC to activate your account!
                </div>
              )}
              {!userData.subscription_valid && (
                <div className="w-full flex-1 min-h-[8rem] bg-yellow-50 rounded-2xl shadow-sm border-2 text-center px-4 border-yellow-200 flex items-center justify-center text-slate-900 font-semibold tracking-wider">
                  Please make payment using link or qr code then contact Admin
                  for the account activation!
                </div>
              )}
            </div>
            <div className="mt-12">
              <Card bordered={false} className={` bg-transparent`}>
                <div className="flex items-center flex-wrap gap-6 md:gap-12">
                  <div className="w-full md:w-1/3 flex flex-col gap-8">
                    <div className="min-h-[8rem] p-3 rounded-lg cursor-pointer flex items-center justify-center px-8 gap-[2rem] hover:border-2 hover:border-blue-900 duration-700 transition-all delay-75 hover:bg-blue-50">
                      <AiFillDollarCircle className="text-[4rem] text-blue-400" />
                      <div>
                        <div className="text-[1.5rem] font-semibold text-slate-950">
                          Earnings
                        </div>
                        <div className="text-[1.5rem] font-normal font-mono text-slate-950/70">
                          USD {earnings.direct + earnings.indirect}
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                      className="bg-green-400 h-[3rem] w-full rounded-md cursor-pointer hover:shadow-md text-center flex justify-center duration-300 transition-all delay-75 hover:bg-green-500 items-center text-white text-[1.2rem] font-semibold"
                    >
                      Contact Admin
                    </div>
                  </div>

                  {/* ref */}
                  <div className="w-full md:flex-1 self-center">
                    <div className="font-semibold mb-2">Copy referral</div>
                    <div className="rounded-md px-4 py-2 shadow-sm flex items-center justify-start border-[1px]">
                      <Paragraph
                        copyable={userData.subscription_valid}
                        className={` ${
                          userData.subscription_valid
                            ? "text-blue-500"
                            : "text-slate-500"
                        } cursor-pointer select-none !mb-0`}
                      >
                        {userData.subscription_valid
                          ? modifiedReferralLink
                          : "please subscribe to activate referral link"}
                      </Paragraph>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>

          <Col xs={24} lg={6} className="flex flex-col gap-4">
            <div className="my-8 2xl:my-10 text-center">
              <div className="flex flex-col gap-1 items-center justify-center">
                <div className="text-base font-semibold mb-3">
                  Subscription Period
                </div>
                <Progress
                  type="circle"
                  percent={
                    percentage(Math.abs(getRemainingDays), subsValid).toFixed(
                      2
                    ) || 0
                  }
                  format={() => (
                    <div className="text-[1rem]">{`${
                      userData.subscribed_at?._seconds
                        ? Math.abs(getRemainingDays)
                        : "0"
                    } Days`}</div>
                  )}
                />
              </div>
            </div>

            <Card
              bordered={false}
              style={{ maxWidth: 600 }}
              className="drop-shadow-md shadow-emerald-500"
            >
              <div className="mb-6 text-center text-[1.2rem] text-slate-800 font-semibold">
                Subscription Plan
              </div>
              <div className="flex items-center justify-between mb-3">
                {subscription?.plan_name ? (
                  <RiMedalFill className="text-[1.2rem]" />
                ) : (
                  <div className="text-slate-500 tracking-wider text-center">
                    Currently no subscription plans with this account
                  </div>
                )}
                <div>{subscription?.plan_name}</div>
              </div>
              <div className="text-[0.8rem] mt-1 text-slate-700/90 ">
                {subscription?.plan_discription}
              </div>
            </Card>
            {subscription?.plan_name !== "Bronze Plan" && (
              <Card
                bordered={false}
                style={{ maxWidth: 600 }}
                className="drop-shadow-md shadow-emerald-500"
              >
                <div className="mb-6 text-center text-[1.2rem] text-slate-800 font-semibold">
                  Tasks
                </div>
                <div className="flex flex-col gap-4">
                  {tasks.map((item, key) => (
                    <div
                      className="flex justify-between items-center"
                      key={key}
                    >
                      <div className="flex items-center justify-between">
                        <div>{item.name}</div>
                      </div>
                      <div className="text-[0.8rem] text-slate-700/90 ">
                        {item.state ? (
                          <FaCheckCircle className="text-[1rem] text-green-500" />
                        ) : (
                          <IoMdCloseCircle className="text-[1rem] text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
            <Card
              bordered={false}
              style={{ maxWidth: 600 }}
              className="drop-shadow-md shadow-emerald-500 mb-4"
            >
              <div className="flex flex-col gap-4">
                {profileStates.map((item, key) => (
                  <div className="flex justify-between items-center" key={key}>
                    <div className="flex items-center justify-between">
                      <div>{item.name}</div>
                    </div>
                    <div className="text-[0.8rem] text-slate-700/90 ">
                      {item.state ? (
                        <FaCheckCircle className="text-[1rem] text-green-500" />
                      ) : (
                        <IoMdCloseCircle className="text-[1rem] text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
      <Modal
        title="Contact Admin"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        cancelButtonProps={{
          className: "bg-white text-navy border-none px-4",
        }}
        okButtonProps={{
          className:
            "!bg-blue-400 text-white border-none px-4 hover:!bg-blue-600",
        }}
      >
        <p className="text-base text-center italic tracking-wide mt-4">
          Please pay $30 to admin and send a <b>screen-shot and google account related to 10Doller</b> to admin to activate
          your account
        </p>
        <div className="flex flex-wrap md:flex-nowrap flex-row md:flex-row items-center justify-between mt-8 gap-4 mb-12">
          <div className="w-1/2 h-[8rem] rounded-2xl p-4 flex flex-col justify-center border-[1px] duration-500 transition-all delay-75 hover:bg-yellow-50">
            <div className="flex gap-2 items-center justify-between h-[3rem] mb-2">
              <SiBinance className="text-yellow-400 text-[3rem]" />
              <div className="text-[0.8rem] text-start">Binance pay Id</div>
            </div>
            <Paragraph copyable className="mt-3">
              {import.meta.env.VITE_BINANCE_PAY_ID}
            </Paragraph>
          </div>

          <div className="w-1/2  h-[8rem] rounded-2xl p-4 flex flex-col justify-center border-[1px] duration-500 transition-all delay-75 hover:bg-blue-50">
            <div className="flex gap-2 items-center justify-between h-[3rem] mb-2">
              <SiTelegram className="text-blue-400 text-[3rem]" />
              <div className="text-[0.8rem] text-start">Admin telegram Id</div>
            </div>
            <Paragraph copyable className="mt-3">
              {import.meta.env.VITE_ADMIN_TELEGRAM_ID}
            </Paragraph>
          </div>
        </div>
      </Modal>
    </PageWrapper>
  );
};

export default Dashboard;
