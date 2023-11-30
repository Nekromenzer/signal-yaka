import React, { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper";
import Marquee from "react-fast-marquee";
import { Alert, Card, Typography, Statistic } from "antd";
import handleApiCall from "../../api/handleApiCall";

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
  const { Countdown } = Statistic;
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 182 + 1000 * 30;

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
          });
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
    <PageWrapper childClass="dashboard-bg">
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
                Please make payment using link or qr code then contact Admin for
                the account activation
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
              !userData.subscription_valid && "pointer-events-none !text-slate-400"
            }`}
          >
            {modifiedReferralLink}
          </Paragraph>
        </Card>
      </div>
      <div className="my-8 2xl:my-10">
        <Countdown title="Days remaining" value={deadline} format="D" />
      </div>
      <div className="mt-4">
        <Card
          bordered={false}
          style={{ maxWidth: 600 }}
          className="drop-shadow-md shadow-emerald-500"
        >
          <div className="mb-6 text-center text-[1.8rem]">Subscription</div>
          <div className="flex items-center justify-between">
            <div className="font-semibold">Plan</div>
            <div>{subscription.plan_name}</div>
          </div>
          <div className="text-sm mt-1 text-slate-700">
            {subscription.plan_discription}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
