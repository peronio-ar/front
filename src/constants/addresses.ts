import { TokenMap } from "../../types/address";

import usdcLogo from "/public/usd-coin-usdc-logo.svg";
import pLogo from "/public/logoP.svg";
import peLogo from "/public/logoPE.svg";
import maticLogo from "/public/polygon-matic-logo.svg";

export const tokens: TokenMap = {
  USDC: {
    name: "USDC",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    image: usdcLogo
  },
  P: {
    name: "P",
    address: "0x78a486306d15e7111cca541f2f1307a1cfcaf5c4",
    image: pLogo
  },
  PE: {
    name: "PE(V1)",
    address: "0xc2768bef7a6bb57f0ffa169a9ed4017c09696ff1",
    image: peLogo
  },
  MATIC: {
    name: "MATIC",
    address: "0x0000000000000000000000000000000000001010",
    image: maticLogo
  },
  migratorV1: {
    name: "migrator",
    address: '0xfe672A4b063b1895b2f6531a78a69c014614B2D8',
    image: ""
  },
};
