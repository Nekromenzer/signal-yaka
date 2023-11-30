import React from "react";
import PageWrapper from "../../layout/PageWrapper";
import Marquee from "react-fast-marquee";
import { Alert } from "antd";

const Dashboard = () => {
  return (
    <PageWrapper>
      <div className="2xl:mx-24">
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
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
