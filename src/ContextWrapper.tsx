import React, { createContext, useState } from 'react';

interface Globals {
  twitchId: number | string | null;
  setTwitchId: React.Dispatch<React.SetStateAction<number | null>>;
}

const defaultValues = {
  twitchId: null,
  setTwitchId: () => {},
};

export const GlobalContext = createContext<Globals>(defaultValues);

const ContextWrapper = ({ children }: any) => {
  const [twitchId, setTwitchId] = useState(null);

  const context = {
    twitchId,
    setTwitchId,
  };

  return <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>;
};

export { ContextWrapper };
