import {
  createContext,
  useState,
  type ReactNode,
} from 'react';

export interface AppContextProviderProps {
  children: ReactNode;
}

export interface UseAppStoreType {
  turtleMode: boolean
  setTurtleMode: (turtleMode: boolean) => void
}

export const initialAppContext: UseAppStoreType = {
  turtleMode: false,
  setTurtleMode: () => {}
};

export const AppContext = createContext<UseAppStoreType>(initialAppContext);

export const AppContextProvider = ({ children }: AppContextProviderProps): JSX.Element => {
  const [turtleMode, setTurtleMode] = useState<boolean>(initialAppContext.turtleMode);

  return (
    <AppContext.Provider
      value={{
        turtleMode,
        setTurtleMode
      }}
    >
      {children}
    </AppContext.Provider>
  )
};
