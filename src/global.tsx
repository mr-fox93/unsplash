import { createContext, useEffect, useState, ReactNode } from "react";

type GlobalContextType = {
  lightDarkMode: boolean;
  setLightDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [lightDarkMode, setLightDarkMode] = useState(true);

  useEffect(() => {
    console.log("darkmode:", lightDarkMode);
  }, [lightDarkMode]);

  return (
    <GlobalContext.Provider value={{ lightDarkMode, setLightDarkMode }}>
      {children}
    </GlobalContext.Provider>
  );
};
