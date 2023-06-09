import { Wizard } from "react-use-wizard";
import { useContext } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import * as Icon from "react-icons/cg";

import peronCafecito from "/public/peron.png";
import logo from "/public/logo-white.png";
import sol from "/public/sol.png";
import WalletInstallation from "../WizardSteps/WalletInstallation";
import PolygonNetwork from "../WizardSteps/PolygonNetwork";
import WalletConnect from "../WizardSteps/WalletConnect";
import { WizardContext } from "../../contexts/WizardContext";
import AddingToken from "../WizardSteps/AddingToken";
import Box3d from "../Box3d/Box3d";

const Overlay = () => {
  const { closeModalHandler } = useContext(WizardContext);

  return (
    <div
      onClick={closeModalHandler}
      className="fixed left-0 top-0 h-full w-full bg-black/50 backdrop-blur-sm grid place-content-center z-10 cursor-pointer mobile:z-50"
    ></div>
  );
};

const WizardModal = () => {
  const { activeStep, closeModalHandler } = useContext(WizardContext);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Overlay />
      <div className="fixed 2xl:top-1/2 2xl:left-1/2 2xl:-translate-x-1/2 2xl:-translate-y-1/2 laptop:top-2/3 laptop:left-1/2 laptop:-translate-x-1/2 laptop:-translate-y-2/3 mobile:translate-y-[23rem] mobile:bottom-0 z-50 mobile:h-full mobile:w-full laptop:w-fit xl:h-fit">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="relative z-50 bg-[#0B4D76] border-2 border-solid border-[#00B7C2] p-10 rounded-lg flex flex-col items-center 2xl:w-[1000px] laptop:w-[950px] laptop:h-[400px] 2xl:h-[600px] xl:h-[500px] mobile:h-2/3 mobile:w-full"
        >
          <button
            onClick={closeModalHandler}
            className="absolute top-4 right-4 p-3 hover:rounded-full hover:bg-[#083a58] transition-all ease-linear text-[#00B7C2]"
          >
            <Icon.CgClose className="h-8 w-8" />
          </button>
          <div className="absolute -top-[100px] z-10 left-1/2 -translate-x-1/2">
            <div className="relative">
              <Image
                src={peronCafecito}
                height={150}
                width={150}
                alt="Peron tomandose un café"
              />
            </div>
          </div>
          <Image
            src={logo}
            alt="Logo Peronio"
            width={200}
            height={200}
            className="text-center laptop:w-[150px] laptop:h-auto 2xl:w-[200px] 2xl:h-[200px]"
          />
          <div className="flex laptop:flex-row xl:flex-row mobile:flex-col w-full h-full gap-0 justify-start items-start">
            <div className="laptop:basis-full xl:basis-1/2 2xl:basis-1/2 h-full mobile:basis-full">
              <Wizard startIndex={activeStep}>
                <WalletInstallation />
                <WalletConnect />
                <PolygonNetwork />
                <AddingToken />
              </Wizard>
            </div>
            <Box3d>
              <Image
                src={sol}
                width={500}
                height={500}
                alt="Sol de la patría Argentina"
                style={{ filter: "drop-shadow(2px 4px 6px black);" }}
                className="laptop:w-[300px] laptop:h-auto 2xl:w-[500px] xl:w-[350px] xl:h-auto"
              />
            </Box3d>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default WizardModal;
