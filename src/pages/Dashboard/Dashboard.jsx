import React from "react";
import PageWrapper from "../../layout/PageWrapper";
// import Marquee from "react-fast-marquee";
import { Alert, Card, Typography } from "antd";

const Dashboard = () => {
  const { Paragraph } = Typography;
  const referralLink = import.meta.env.VITE_REFERRAL_URL;
  const modifiedReferralLink = `${referralLink}/ref/${localStorage.getItem(
    "uid"
  )}`;

  return (
    <PageWrapper>
      <div className="2xl:mx-24">
        {/* <Alert
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
        /> */}
      </div>
      <div className="mt-12">
        <Card
          bordered={false}
          style={{ maxWidth: 600 }}
          className="drop-shadow-md"
        >
          <div className="font-semibold mb-4">Copy referral</div>
          <Paragraph copyable className="text-blue-500">
            {modifiedReferralLink}
          </Paragraph>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
