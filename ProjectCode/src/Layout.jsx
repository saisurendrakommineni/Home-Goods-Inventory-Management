import React from 'react';
import Header from './Header'; 
import { useTheme } from './ThemeContext';
import "./theme.css"

const Layout = ({ children , isLoggedIn ,onLogout }) => {
    const { isDarkTheme } = useTheme();

    const themeStyles = {
        backgroundColor: isDarkTheme ? '#333' : '#f8f8f8',
        color: isDarkTheme ? '#f8f8f8' : '#333',
        minHeight: '100vh', 
        width: '100vw', 
        margin: 0, 
        padding: 0, 
        overflowX: 'hidden', 
    
    };
    return (
        <div style={themeStyles}>
            {/* <div className={isDarkTheme ? 'layout-dark' : 'layout-light'}> */}
            {isLoggedIn && <Header onLogout={onLogout}/>}
            <main>{children}</main> {/* This is where page content will be rendered */}
        </div>
    );
};

export default Layout;
