import { SUPPORTED_CHAIN } from "@/connections";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isSupportedChain = (chainId: number) =>
  Number(chainId) === SUPPORTED_CHAIN;
