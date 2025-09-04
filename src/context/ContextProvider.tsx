import React from "react";
import type { ReactNode } from "react";

import {PlayerProvider} from "../context";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <PlayerProvider>
      {children}
    </PlayerProvider>
  );
};

export default ContextProvider;
