// context/ContractContext.tsx
import React, { createContext, useState, useEffect, type ReactNode } from "react";
import type { Contract, ContractStatus } from "../types/Contract";

// Define the context type
type ContractContextType = {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  updateContractField: (contractId: string, fieldId: string, value: any) => void;
  changeContractStatus: (contractId: string, newStatus: ContractStatus) => void;
};

// Create context with default values
export const ContractContext = createContext<ContractContextType>({
  contracts: [],
  addContract: () => {},
  updateContractField: () => {},
  changeContractStatus: () => {},
});

// Provider props type
type Props = { children: ReactNode };

export const ContractProvider: React.FC<Props> = ({ children }) => {
  // Load contracts from localStorage initially
  const [contracts, setContracts] = useState<Contract[]>(() => {
    const stored = localStorage.getItem("contracts");
    return stored ? JSON.parse(stored) : [];
  });

  // Save contracts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contracts", JSON.stringify(contracts));
  }, [contracts]);

  // Add a new contract
  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
  };

  // Update a field of a specific contract
  const updateContractField = (contractId: string, fieldId: string, value: any) => {
    setContracts(prev =>
      prev.map(c =>
        c.id === contractId
          ? {
              ...c,
              fields: c.fields.map(f => (f.id === fieldId ? { ...f, value } : f)),
            }
          : c
      )
    );
  };

  // Change the status of a contract according to lifecycle rules
 const changeContractStatus = (contractId: string, requestedStatus?: ContractStatus) => {
  setContracts(prev =>
    prev.map(contract => {
      if (contract.id !== contractId) return contract;

      // 1. Prevent changes if contract is in a terminal state
      if (contract.status === "Locked" || contract.status === "Revoked") return contract;

      // 2. Define the complete lifecycle (must include ALL types)
      const lifecycle: Record<ContractStatus, ContractStatus | null> = {
        Pending: "Active",   // Added
        Active: "Signed",    // Added
        Created: "Approved",
        Approved: "Sent",
        Sent: "Signed",
        Signed: "Locked",
        Locked: null,
        Revoked: null,
      };

      // 3. Handle specific "Revoke" override
      if (requestedStatus === "Revoked") {
        return { ...contract, status: "Revoked" };
      }

      // 4. Determine the next status
      // Use requestedStatus if provided, otherwise move to the next logical step
      const nextStatus = requestedStatus || lifecycle[contract.status];

      if (nextStatus && (nextStatus === requestedStatus || lifecycle[contract.status] === nextStatus)) {
        return { ...contract, status: nextStatus };
      }

      return contract;
    })
  );
};

  return (
    <ContractContext.Provider
      value={{ contracts, addContract, updateContractField, changeContractStatus }}
    >
      {children}
    </ContractContext.Provider>
  );
};
