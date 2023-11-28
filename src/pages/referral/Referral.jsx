import React from "react";
import PageWrapper from "../../layout/PageWrapper";
import { Typography, Card } from "antd";

const Referral = () => {
  const { Paragraph } = Typography;
  return (
    <PageWrapper>
      <Card
        bordered={false}
        style={{ maxWidth: 600 }}
        className="drop-shadow-md"
      >
        <div className="font-semibold mb-4">Copy refereral</div>
        <Paragraph copyable className="text-blue-500">
          https://ant.design/components/typography
        </Paragraph>
      </Card>
    </PageWrapper>
  );
};

export default Referral;
