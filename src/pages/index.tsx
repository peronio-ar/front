import type { NextPage } from "next";
import styled from "@emotion/styled";
import { useContext } from "react";
import WizardModal from "../components/WizardModal/WizardModal";
import { WizardContext } from "../contexts/WizardContext";

import AnimatedUnderline from "../components/animatedUnderline/AnimatedUnderline";
import Metrics from "../components/Metrics/Metrics";
import Head from "next/head";
import useARSPrice from "../hooks/useARSPrice";
import usePairs from "../hooks/usePairs";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-image: url("/sol-bg.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  padding-bottom: 100px;
  @media (min-width: 1280px) {
    min-height: 100vh;
  }
  @media (min-width: 320px) {
    background-size: cover;
    overflow-y: auto;
    min-height: 100%;
    padding-bottom: 20px;
  }
`;

const Home: NextPage = () => {
  const { isOpen } = useContext(WizardContext);
  const arsPrice = useARSPrice();
  const [usdcReserve, , pePrice] = usePairs();
  const arsPricePerPe = Number(pePrice * arsPrice).toFixed(3);

  return (
    <>
      <Head>
        <title>Peronio - ${String(arsPricePerPe)}</title>
        <meta property="og:title" content="Peronio Inicio" key="title" />
      </Head>
      <Main>
        <header className="h-fit w-full xl:p-20 2xl:pt-10 text-center flex flex-col items-center">
          <div className="relative h-fit w-fit mb-3 xl:mb-10 laptop:mt-10">
            <h1 className="font-Abril text-center w-full h-full mobile:text-5xl xl:text-[7rem] mobile:mt-10">
              Peronio
            </h1>
            <AnimatedUnderline />
          </div>
          <p className="font-Robot mobile:text-xl xl:text-3xl mobile:px-5">
            Comprá, vendé, intercambiá y revisá precios historicos!
          </p>
        </header>
        <div className="flex laptop:flex-col mobile:flex-col mobile:overflow-y-hidden mobile:h-full mobile:max-h-full mobile:min-h-full gap-5 justify-center mobile:px-7 pb-10 pt-10 laptop:px-20 2xl:px-40 laptop:pb-16">
          <Metrics />
        </div>
        <h3 className="mobile:mt-auto text-4xl mobile:3xl font-Abril text-center xl:mb-10">
          Chequeá nuestro exchange{" "}
          <span className="text-yellow-400">BLOCKS</span>
        </h3>
        {isOpen && <WizardModal />}
      </Main>
    </>
  );
};

export default Home;
