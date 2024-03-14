import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

import "./index.css";

import Layout from "./pages/layout/Layout";
import NoPage from "./pages/NoPage";
import Chat from "./pages/chat/Chat";
import { AppStateProvider } from "./state/AppProvider";
import { useState } from 'react';  
import TermsAndConditionsDialog from './TermsAndConditionsDialog';


initializeIcons();

export default function App() {  
    const currentVersion = 1; // Update this whenever the terms and conditions change!  
  
    const [termsAccepted, setTermsAccepted] = useState(() => {  
        // Get the accepted version from localStorage  
        const acceptedVersion = parseInt(localStorage.getItem('acceptedVersion') || '0', 10);  
        // If the accepted version matches the current version, the terms have been accepted  
        // Otherwise, they have not been accepted  
        return acceptedVersion === currentVersion;  
    }); 
  
    const handleAcceptTerms = () => {  
        // Store the current version in localStorage  
        localStorage.setItem('acceptedVersion', currentVersion.toString());  
        setTermsAccepted(true);  
    };  
  
    return (  
        <React.StrictMode>  
            <AppStateProvider>  
                <TermsAndConditionsDialog isOpen={!termsAccepted} onAccept={handleAcceptTerms} />  
                <HashRouter>  
                    <Routes>  
                        <Route path="/" element={<Layout />}>  
                            <Route index element={<Chat />} />  
                            <Route path="*" element={<NoPage />} />  
                        </Route>  
                    </Routes>  
                </HashRouter>  
            </AppStateProvider>  
        </React.StrictMode>  
    );  
}  


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
