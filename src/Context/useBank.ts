import { useContext } from "react";
import { BankContext } from "./BankContext";

export const useBank = () => {
  const context = useContext(BankContext);

  if (!context) {
    throw new Error("useBank must be used within a LoveProvider");
  }

  return context;
};