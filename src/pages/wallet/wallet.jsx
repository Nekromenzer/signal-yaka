import React, { useEffect, useState } from "react";
import PageWrapper from "../../layout/PageWrapper";
import { Modal, Card, Typography, Spin, Row, Col, Progress } from "antd";
import handleApiCall from "../../api/handleApiCall";
import { RiMedalFill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import {
  MdOutlineSubdirectoryArrowRight,
  MdOutlineArrowForward,
} from "react-icons/md";
import { AiFillDollarCircle } from "react-icons/ai";
import { SiBinance, SiTelegram } from "react-icons/si";
import dayjs from "dayjs";

const Wallet = () => {
  const [userData, setUserData] = useState({});
  const [earnings, setEarnings] = useState({
    direct: 0,
    indirect: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Paragraph } = Typography;

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
        }
      },
    });
  }, []);

  return (
    <PageWrapper>
      <Spin tip="Updating... Please wait" spinning={loading}>
        <Row>
          <Col xs={24} lg={18} className="2xl:px-8">
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
                      className="bg-green-600 h-[3rem] w-full rounded-md cursor-pointer hover:shadow-md text-center flex justify-center duration-300 transition-all delay-75 hover:bg-green-500 items-center text-white text-[1.2rem] font-semibold"
                    >
                      Withdraw Earnings
                    </div>
                  </div>
                  <div className="self-center flex-1 flex items-center justify-center gap-6">
                    <div className="w-1/2  bg-white h-[8rem] rounded-2xl p-4 flex flex-col justify-center border-[1px] duration-500 transition-all delay-75 hover:bg-blue-50">
                      <div className="flex gap-2 items-center justify-between h-[3rem] mb-2">
                        <div className="text-[1rem] text-start">
                          Direct Earnings
                        </div>
                        <MdOutlineArrowForward className="text-green-400 text-[3rem]" />
                      </div>
                      <div className="text-[1.5rem] font-semibold font-mono text-slate-950">
                        USD {earnings.direct}
                      </div>
                    </div>
                    <div className="w-1/2  bg-white h-[8rem] rounded-2xl p-4 flex flex-col justify-center border-[1px] duration-500 transition-all delay-75 hover:bg-blue-50">
                      <div className="flex gap-2 items-center justify-between h-[3rem] mb-2">
                        <div className="text-[1rem] text-start">
                          Indirect Earnings
                        </div>
                        <MdOutlineSubdirectoryArrowRight className="text-orange-400 text-[3rem]" />
                      </div>
                      <div className="text-[1.5rem] font-semibold font-mono text-slate-950">
                        USD {earnings.indirect}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>

          <Col xs={24} lg={6} className="flex flex-col gap-4"></Col>
        </Row>
      </Spin>
      <Modal
        title="Withdraw Earnings"
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
          Send related details to admin telegram id to withdraw your earnings.
        </p>
        <div className="flex flex-wrap md:flex-nowrap flex-row md:flex-row items-center justify-between mt-8 gap-4 mb-12">
          <div className="w-full  h-[8rem] rounded-2xl p-4 flex flex-col justify-center border-[1px] duration-500 transition-all delay-75 hover:bg-blue-50">
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

export default Wallet;
