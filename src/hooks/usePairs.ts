import uniswapAbi from "../../abi/IUniswapV2Pair.json";
import { useContractRead } from "wagmi";
import { IDataReserves } from "../../types/contractRead";
import { useEffect, useState } from "react";
import getPePrice from "../utils/getPePrice";

const usePairs = () => {
  const [usdcReserve, setUsdcReserve] = useState<number>(0);
  const [peReserve, setPeReserve] = useState<number>(0);
  const [pePrice, setPePrice] = useState<number>(0);

  const { data }: { data: IDataReserves | undefined } = useContractRead({
    address: "0x93cBcAD1F9642A80e38D980fb872215237d91794",
    abi: uniswapAbi,
    functionName: "getReserves"
  });

  useEffect(() => {
    setUsdcReserve(Number(data?.reserve0._hex));
    setPeReserve(Number(data?.reserve1._hex));
    const calculatedPrice = getPePrice(usdcReserve, peReserve);
    setPePrice(calculatedPrice)
  }, [data?.reserve0._hex, data?.reserve1._hex, peReserve, usdcReserve]);

  return [usdcReserve, peReserve, pePrice];
};

export default usePairs;
