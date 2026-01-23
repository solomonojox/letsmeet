import { createContext } from "react";

interface Banks {
    name: string;
    slug: string;
    code: string;
    ussd: string;
    logo: string
}

interface BankContextType {
    banks: Banks[];
    setBanks: React.Dispatch<React.SetStateAction<Banks[]>>;
}

const BankContext = createContext<BankContextType | undefined>(undefined);
export { BankContext };
export type { BankContextType, Banks };
