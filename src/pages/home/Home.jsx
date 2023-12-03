import React, { useCallback, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import heroImage from "/src/img/hero-1.png";
import { loadSlim } from "tsparticles-slim";
import AOS from "aos";
import Particles from "react-particles";

const Home = () => {
  const navigate = useNavigate();
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="h-screen home-section">
      <div className="absolute top-5 left-28 bg-logo bg-no-repeat bg-center bg-contain w-[300px] h-[90px]" />
      <div className="bg-gradient-to-r from-emerald-100 from-10% via-sky-500 via-30% to-emerald-500 to-90% absolute w-fit md:w-full opacity-40 rounded-bl-[6rem] h-[80vh] lg:rounded-bl-[18.75rem] md:h-screen  2xl:h-screen" />
      <div className="md:w-full relative z-[11] w-fit">
        <div className="flex justify-normal md:justify-between items-start h-screen px-8 lg:px-[8rem] pt-[5rem] lg:pt-[10rem] xl:pt-[12rem] lg:flex-row flex-col">
          <div className="w-full lg:w-[50%] lg:absolute pt-[6rem] md:pt-0">
            <h1 className="text-[#1D3557] text-[3rem] md:text-[3rem] lg:text[3.5rem] xl:text-[5rem] font-normal lg:leading-[4rem] xl:leading-[6rem] leading-[4rem] mb-8 text-center lg:text-left">
              Unlock Earnings
              <br className="md:hidden lg:block" />
              with 10Doller -
              <br />
              <span className="md:mx-auto md:text-[1.6rem] lg:text-[2rem] xl:text-[4rem] text-[1.3rem] font-bold">
                <Typewriter
                  words={["Gain your $10 to $100"]}
                  loop
                  cursor
                  cursorBlinking
                />
              </span>
            </h1>
            <p className="text-[#E63946] text-xl lg:text-2xl tracking-wider leading-9 text-center lg:text-left font-semibold">
              Empowering the trading community |
              <br className="hidden xl:block" /> with proficient signals and
              Fundamental knowledge!.
            </p>
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="mx-auto md:mx-0 rounded-[2rem] w-[12rem] bg-[#E63946] text-white font-semibold text-center px-4 py-3 cursor-pointer hover:shadow shadow-red mt-8 xl:mt-[5rem] border-double border"
            >
              GET STARTED
            </div>
          </div>

          <div className="self-end w-full lg:w-[50%] lg:absolute right-0  lg:bottom-0 xl:pl-[11rem] hidden lg:block">
            <img
              width="auto"
              src={heroImage}
              className="max-w-[30rem] relative"
              alt="office"
            />
          </div>
        </div>
      </div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "white",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#E63946",
            },
            links: {
              color: "#1D3557",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1200,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default Home;
