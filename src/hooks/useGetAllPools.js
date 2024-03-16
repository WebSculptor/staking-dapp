import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Abi from "../json/stakingPool.json";
import MulticallAbi from "../json/multicall.json";

import { getStakingPoolContract, readOnlyProvider } from "@/constants";

export const useGetAllPools = () => {
  const [data, setData] = useState([]);
  const [numOfPool, setNumOfPool] = useState(0);

  const contract = getStakingPoolContract(readOnlyProvider);

  useEffect(() => {
    (async () => {
      contract
        .id()
        .then((res) => setNumOfPool(Number(res)))
        .catch((err) => console.log(err));

      const poolIDs = [...Array.from({ length: numOfPool + 1 })].map(
        (_, index) => index
      );

      // console.log(poolIDs);

      const itf = new ethers.Interface(Abi);
      const calls = poolIDs.map((x) => ({
        target: import.meta.env.VITE_STAKE_POOL_CONTRACT_ADDRESS,
        callData: itf.encodeFunctionData("getPoolByID", [x]),
      }));

      //multicall
      const multicall = new ethers.Contract(
        import.meta.env.VITE_MULTICALL_ADDRESS,
        MulticallAbi,
        readOnlyProvider
      );

      const callResults = await multicall.tryAggregate.staticCall(false, calls);
      const validResponsesIndex = [];
      const validResponses = callResults.filter((x, i) => {
        if (x[0] === true) {
          validResponsesIndex.push(i);
          return true;
        }
        return false;
      });

      const decodedResponses = validResponses.map((x) =>
        itf.decodeFunctionResult("getPoolByID", x[1])
      );
      setData(decodedResponses);
      console.log("====================================");
      console.log(decodedResponses);
      console.log("====================================");
    })();
  }, [contract, numOfPool]);
  return data;
};
