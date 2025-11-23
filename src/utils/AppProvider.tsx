import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


interface User {
  name: string;
  email: string;
  role: string;
}

interface useContextProps {
  authorizedUser: User | null;
  setAuthorizedUser: React.Dispatch<React.SetStateAction<User | null>>;
}


interface UseAppContext {
  children: ReactNode;
}

const AppContext = createContext<useContextProps | null>(null);

export const AppProvider: React.FC<UseAppContext> = ({ children }) => {
  const [authorizedUser, setAuthorizedUser] = useState<User | null>(null);

  const user: useContextProps = {
    authorizedUser,
    setAuthorizedUser,
  };

  return (
    <AppContext.Provider value={user}>
      {children}
    </AppContext.Provider>

  );
};


export const Auth = (): useContextProps => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("No User Context");
  }
  return context;
};
