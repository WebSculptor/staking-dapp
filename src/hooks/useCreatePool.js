// import { useCallback } from "react";
// import { useWeb3ModalProvider } from "@web3modal/ethers/react";
// import { toast } from "sonner";
// import { getStakingPoolContract, getProvider } from "@/constants";
// import { ethers } from "ethers";

// export const useCreatePool = () => {
//   const { walletProvider } = useWeb3ModalProvider();

//   return useCallback(
//     async (rate) => {
//       const readWriteProvider = getProvider(walletProvider);
//       const signer = await readWriteProvider.getSigner();

//       const contract = getStakingPoolContract(signer);
//       try {
//         if (!contract) {
//           throw new Error("Contract instance is null");
//         }

//         const tokenContract = contract; // Assuming this is the correct way to get the token contract instance
//         const amountWei = ethers.parseUnits(rate.toString(), 18);

//         // Approve transfer of tokens to the contract
//         const approveTx = await tokenContract.approve(
//           contract.target,
//           amountWei
//         );
//         await approveTx.wait(); // Wait for approval transaction to be mined

//         console.log("Approval transaction hash:", approveTx.hash);

//         const createPoolTx = await contract.createPool(rate);
//         console.log("Create pool transaction hash:", createPoolTx.hash);

//         const receipt = await createPoolTx.wait();

//         console.log("Receipt:", receipt);

//         if (receipt.status === 1) {
//           toast("Transfer successful!");
//         } else {
//           toast("Transfer failed!");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         toast("Error creating pool: " + error.message);
//       }
//     },
//     [walletProvider]
//   );
// };

import {
  getProvider,
  getRewardContract,
  getStakingPoolContract,
} from "@/constants";
import { isSupportedChain } from "@/lib/utils";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useCallback } from "react";
import { toast } from "sonner";

export const useCreatePool = (rewardRate) => {
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

    const stakingContract = getStakingPoolContract(signer);
    const rewardContract = getRewardContract(signer);

    try {
      toast("Pending transaction", {
        description: "Waiting to approve transaction!",
      });

      const txERC20Approval = await rewardContract.approve(
        import.meta.env.VITE_STAKE_POOL_CONTRACT_ADDRESS,
        ethers.parseUnits("100", 18)
      );
      await txERC20Approval.wait();

      toast("Successful transaction", {
        description: "Successfully approved transaction",
      });

      toast("Pending transaction", {
        description: "Please wait while we create pool!",
      });

      const convertedRate = rewardRate * 10e18;

      const txCreatePool = await stakingContract.createPool(convertedRate);
      const receipt = await txCreatePool.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return toast("Successful transaction", {
          description: "Pool was successfully created!",
        });
      } else {
        toast("Failed transaction", {
          description: "Failed to create pool",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.reason === "rejected") {
        toast("Failed transaction", {
          description: "You rejected the transaction",
        });
      } else {
        toast("Error transaction", {
          description: error.code,
        });
      }
    }
  }, [isConnected, chainId, walletProvider, rewardRate]);
};
