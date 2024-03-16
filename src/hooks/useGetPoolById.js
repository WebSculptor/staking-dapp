import { useCallback } from "react";
import { toast } from "sonner";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getProposalsContract, getProvider } from "@/constants";
import { isSupportedChain } from "@/lib/utils";

export const useGetPoolById = (poolId) => {
  const { chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isConnected)
      return toast("Oops! Maybe you've forgotten", {
        description: "You need to connect your wallet to continue",
      });
    if (!isSupportedChain(chainId))
      return toast("Wrong network", {
        description: "Please select the supported chain",
      });
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getProposalsContract(signer);

    try {
      const transaction = await contract.getPoolByID(poolId);

      console.log("transaction: ", transaction);
      toast("Pending transaction", {
        description: "Please wait for the transaction to be approved",
      });

      const receipt = await transaction.wait();
      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast("Successful transaction", {
          description: "You have successfully delegated your vote to a user",
        });
      } else {
        toast("Failed transaction", {
          description: "Could not delegate vote to user",
        });
      }
    } catch (error) {
      if (error.reason === "Has no right to vote") {
        toast("Ouch! Something went wrong!", {
          description: "You don't have the right to vote yet!",
        });
      } else if (error.reason === "Already voted.") {
        toast("Oops! Maybe you've forgotten", {
          description: "Seems like you've already voted for the candidate",
        });
      } else {
        toast(error.message);
      }
    }
  }, [chainId, isConnected, poolId, walletProvider]);
};
