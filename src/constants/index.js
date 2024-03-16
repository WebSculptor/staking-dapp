import { ethers } from "ethers";
import CONTRACT_ABI from "../json/stakingPool.json";
import ERC20_CONTRACT_ABI from "../json/erc20.json";

const {
  VITE_STAKE_POOL_CONTRACT_ADDRESS,
  VITE_RPC_URL,
  VITE_REWARD_TOKEN_CONTRACT_ADDRESS,
  VITE_STAKE_TOKEN_CONTRACT_ADDRESS,
} = import.meta.env;

export const getStakingPoolContract = (providerOrSigner) =>
  new ethers.Contract(
    VITE_STAKE_POOL_CONTRACT_ADDRESS,
    CONTRACT_ABI,
    providerOrSigner
  );

export const getRewardContract = (providerOrSigner) =>
  new ethers.Contract(
    VITE_REWARD_TOKEN_CONTRACT_ADDRESS,
    ERC20_CONTRACT_ABI,
    providerOrSigner
  );

export const getStakeContract = (providerOrSigner) =>
  new ethers.Contract(
    VITE_STAKE_TOKEN_CONTRACT_ADDRESS,
    ERC20_CONTRACT_ABI,
    providerOrSigner
  );

// read only provider pointing to sepolia. It allows read only access to the sepolia blockchain
export const readOnlyProvider = new ethers.JsonRpcProvider(VITE_RPC_URL);

// read/write provider, that allows you to read data and also sign transaction on whatever chain it's pointing to
export const getProvider = (provider) => new ethers.BrowserProvider(provider);
