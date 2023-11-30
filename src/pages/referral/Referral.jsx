import React from "react";
import PageWrapper from "../../layout/PageWrapper";
import { Typography, Card } from "antd";

const Referral = () => {
  const { Paragraph } = Typography;
  const referralLink = import.meta.env.VITE_REFERRAL_URL;

  const modifiedReferralLink = `${referralLink}/ref/${localStorage.getItem(
    "uid"
  )}`;
  return (
    <PageWrapper>
      <Card
        bordered={false}
        style={{ maxWidth: 600 }}
        className="drop-shadow-md mt-8"
      >
        <div className="font-semibold mb-4">Copy referral</div>
        <Paragraph copyable className="text-blue-500">
          {modifiedReferralLink}
        </Paragraph>
      </Card>
    </PageWrapper>
  );
};

export default Referral;
