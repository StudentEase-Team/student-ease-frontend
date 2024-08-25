import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type LocaleContextType = {
    locale: string;
    setLocale: Dispatch<SetStateAction<string>>;
};

export const LocaleContext = createContext<LocaleContextType>({
    locale: 'sr',
    setLocale: () => {}
});

type LocaleProviderProps = {
    children: ReactNode;
};

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
    const [locale, setLocale] = useState<string>('sr'); 

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};
