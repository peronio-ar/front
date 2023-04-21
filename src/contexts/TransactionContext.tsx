import React, { createContext, useState, useEffect } from "react";
import {
  ITransactionContext,
  ITransactionContextProvider
} from "../../types/transactions";
import usePeronioWrite from "../hooks/usePeronioWrite";

const initialState = {
  hasAllowance: false,
  allowanceLeft: 0,
  hasApproved: false
};

export const TransactionContext =
  createContext<ITransactionContext>(initialState);

const TransactionProvider = ({ children }: ITransactionContextProvider) => {
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);
  const [allowanceLeft, setAllowanceLeft] = useState<number>(0);
  const [hasApproved, setHasApproved] = useState<boolean>(false);

  useEffect(() => {
    if (allowanceLeft === 0) {
      setHasAllowance(false);
      setHasApproved(false);
    }
  }, [allowanceLeft]);
  return (
    <TransactionContext.Provider
      value={{
        hasAllowance,
        allowanceLeft,
        hasApproved,
        setAllowanceLeft,
        setHasApproved
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
