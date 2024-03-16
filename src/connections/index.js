import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN = 80001;
const { VITE_PROJECT_ID, VITE_RPC_URL } = import.meta.env;

const mumbai = {
  chainId: SUPPORTED_CHAIN,
  name: "Mumbai",
  currency: "Matic",
  explorerUrl: "https://mumbai.polygonscan.com",
  rpcUrl: VITE_RPC_URL,
};

const metadata = {
  name: "Ballot",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mumbai],
    projectId: VITE_PROJECT_ID,
    enableAnalytics: false, // Optional - defaults to your Cloud configuration
  });
