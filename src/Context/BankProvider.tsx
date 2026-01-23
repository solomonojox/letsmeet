import React, { useState, ReactNode } from "react";
import { BankContext, Banks } from "./BankContext";

const LoveProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [banks, setBanks] = useState<Banks[]>([]);

  return (
    <BankContext.Provider value={{ banks, setBanks }}>
      {children}
    </BankContext.Provider>
  );
};

export default LoveProvider;