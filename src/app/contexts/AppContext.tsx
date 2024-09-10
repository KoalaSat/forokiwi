import { languages } from '../../constants';
import i18n from 'locales/i18n';
import {
  createContext,
  useState,
  type ReactNode,
} from 'react';

export interface AppContextProviderProps {
  isDarkMode: boolean;
  children: ReactNode;
}

export interface UseAppStoreType {
  isDarkMode: boolean
  language: { value: string, label: string }
  setLanguage: (language: { value: string, label: string }) => void
  topicLanguage: string
  setTopicLanguage: (language: string) => void
  turtleMode: boolean
  setTurtleMode: (turtleMode: boolean) => void
}

export const initialAppContext: UseAppStoreType = {
  isDarkMode: false,
  language: languages[0],
  setLanguage: () => {},
  topicLanguage: i18n.language,
  setTopicLanguage: () => {},
  turtleMode: false,
  setTurtleMode: () => {}
};

export const AppContext = createContext<UseAppStoreType>(initialAppContext);

export const AppContextProvider = ({ isDarkMode, children }: AppContextProviderProps): JSX.Element => {
  const [language, setLanguage] = useState<{ value: string, label: string }>(languages.find((lang) => i18n.language === lang.value) ?? initialAppContext.language);
  const [topicLanguage, setTopicLanguage] = useState<string>('all');
  const [turtleMode, setTurtleMode] = useState<boolean>(initialAppContext.turtleMode);

  return (
    <AppContext.Provider
      value={{
        isDarkMode,
        language,
        setLanguage,
        topicLanguage,
        setTopicLanguage,
        turtleMode,
        setTurtleMode
      }}
    >
      {children}
    </AppContext.Provider>
  )
};
