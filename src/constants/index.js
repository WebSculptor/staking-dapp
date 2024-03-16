import { ethers } from "ethers";
import CONTRACT_ABI from "../json/stakingPool.json";

const { VITE_BALLOT_CONTRACT_ADDRESS, VITE_RPC_URL } = import.meta.env;

export const getStakingPoolContract = (providerOrSigner) =>
  new ethers.Contract(
    VITE_BALLOT_CONTRACT_ADDRESS,
    CONTRACT_ABI,
    providerOrSigner
  );

// read only provider pointing to sepolia. It allows read only access to the sepolia blockchain
export const readOnlyProvider = new ethers.JsonRpcProvider(VITE_RPC_URL);

// read/write provider, that allows you to read data and also sign transaction on whatever chain it's pointing to
export const getProvider = (provider) => new ethers.BrowserProvider(provider);
