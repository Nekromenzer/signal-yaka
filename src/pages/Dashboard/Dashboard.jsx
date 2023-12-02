import React, { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper";
import Marquee from "react-fast-marquee";
import { Alert, Card, Typography, Statistic, Row, Col, Progress } from "antd";
import handleApiCall from "../../api/handleApiCall";
import { RiMedalFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import dayjs from "dayjs";

const Dashboard = () => {
  const [subscription, setSubscription] = useState({
    subscription_valid: false,
    kyc_verified: false,
  });
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    handleApiCall({
      variant: "variant",
      urlType: "getSubById",
      // urlParams: `/${localStorage.getItem("uid")}`,
      urlParams: "/5p8crgmWHaxSBV78yECK",
      setLoading,
      cb: (res) => {
        if (res.status === 200) {
          setSubscription(res?.data);
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
        if (res.status === 200) {
          const { subscription_valid, kyc_verified } = res?.data;
          localStorage.setItem("subscription_valid", subscription_valid);
          localStorage.setItem("kyc_verified", kyc_verified);
          setUserData({
            subscription_valid: subscription_valid,
            kyc_verified: kyc_verified,
            ...res.data,
          });
        }
      },
    });
  }, []);

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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading... Please wait
      </div>
    );
  }
  return (
    <PageWrapper>
      <Row>
        <Col xs={24} lg={18}>
          <div className="2xl:mx-24">
            {!userData.kyc_verified && (
              <Alert
                banner
                message={
                  <Marquee
                    pauseOnHover
                    gradient={false}
                    className="text-[1rem] font-semibold"
                  >
                    Please enter your Required data in profile
                  </Marquee>
                }
              />
            )}

            {!userData.subscription_valid && (
              <Alert
                className="mt-8"
                banner
                message={
                  <Marquee
                    pauseOnHover
                    gradient={false}
                    className="text-[1rem] font-semibold"
                  >
                    Please make payment using link or qr code then contact Admin
                    for the account activation
                  </Marquee>
                }
              />
            )}
          </div>
          <div className="mt-12">
            <Card
              bordered={false}
              style={{ maxWidth: 600 }}
              className={`drop-shadow-md ${
                !userData.subscription_valid && "pointer-events-none"
              }`}
            >
              <div className="font-semibold mb-4">Copy referral</div>
              <Paragraph
                copyable={!userData.subscription_valid}
                className={`text-blue-500 ${
                  !userData.subscription_valid &&
                  "pointer-events-none !text-slate-400"
                }`}
              >
                {modifiedReferralLink}
              </Paragraph>
            </Card>
          </div>
        </Col>
        <Col xs={24} lg={6} className="flex flex-col gap-6">
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
                  <div className="text-[1rem]">{`${Math.abs(
                    getRemainingDays
                  )} Days`}</div>
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
              <RiMedalFill className="text-[1.2rem]" />
              <div>{subscription.plan_name}</div>
            </div>
            <div className="text-[0.8rem] mt-1 text-slate-700/90 ">
              {subscription.plan_discription}
            </div>
          </Card>
          <Card
            bordered={false}
            style={{ maxWidth: 600 }}
            className="drop-shadow-md shadow-emerald-500 mb-4"
          >
            <div className=" flex flex-col gap-4">
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
    </PageWrapper>
  );
};

export default Dashboard;
