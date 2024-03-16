import { useCallback } from "react";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { getStakingPoolContract, getProvider } from "@/constants";
import { ethers } from "ethers";

export const useCreatePool = () => {
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(
    async (rate) => {
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      try {
        const contract = getStakingPoolContract(signer);

        if (!contract) {
          throw new Error("Contract instance is null");
        }

        const tokenContract = contract; // Assuming this is the correct way to get the token contract instance
        const amountWei = ethers.parseUnits(rate.toString(), 18);

        // Approve transfer of tokens to the contract
        const approveTx = await tokenContract.approve(
          contract.target,
          amountWei
        );
        await approveTx.wait(); // Wait for approval transaction to be mined

        console.log("Approval transaction hash:", approveTx.hash);

        const createPoolTx = await contract.createPool(rate);
        console.log("Create pool transaction hash:", createPoolTx.hash);

        const receipt = await createPoolTx.wait();

        console.log("Receipt:", receipt);

        if (receipt.status === 1) {
          toast("Transfer successful!");
        } else {
          toast("Transfer failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast("Error creating pool: " + error.message);
      }
    },
    [walletProvider]
  );
};
