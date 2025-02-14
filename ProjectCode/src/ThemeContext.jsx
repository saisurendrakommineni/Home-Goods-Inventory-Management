import React, { createContext, useState, useContext,useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = sessionStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkTheme(savedTheme === 'dark');
        }
    }, []);

    // Toggle the theme and save to localStorage
    const toggleTheme = () => {
        setIsDarkTheme(prevTheme => {
            const newTheme = !prevTheme;
            sessionStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };



    // const toggleTheme = () => {
    //     setIsDarkTheme((prevTheme) => !prevTheme);
    // };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
