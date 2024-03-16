import Header from "@/components/shared/Header";
import { useGetAllPools } from "@/hooks/useGetAllPools";
import { useWeb3ModalTheme } from "@web3modal/ethers/react";
import { useEffect } from "react";

export default function App() {
  const { setThemeMode, setThemeVariables } = useWeb3ModalTheme();

  setThemeMode("dark");

  setThemeVariables({
    "--w3m-accent": "#3B82F6",
    "--w3m-font-size-master": "9px",
  });

  const game = useGetAllPools();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    </div>
  );
}
