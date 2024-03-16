import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import MaxContainer from "./MaxContainer";
import CreatePool from "./CreatePool";

export default function Header() {
  const { isConnected } = useWeb3ModalAccount();
  return (
    <header className="sticky top-0 inset-x-0 w-full h-16 z-10 backdrop-blur-2xl">
      <MaxContainer className="py-3 w-full h-full flex items-center justify-between">
        <h1>Staking dApp</h1>

        <div className="flex items-center gap-2">
          <w3m-button />
          {isConnected && <CreatePool />}
        </div>
      </MaxContainer>
    </header>
  );
}
