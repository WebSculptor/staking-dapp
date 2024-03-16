import Header from "@/components/shared/Header";
import { useWeb3ModalTheme } from "@web3modal/ethers/react";

export default function App() {
  const { setThemeMode, setThemeVariables } = useWeb3ModalTheme();

  setThemeMode("dark");

  setThemeVariables({
    "--w3m-accent": "#3B82F6",
    "--w3m-font-size-master": "9px",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    </div>
  );
}
