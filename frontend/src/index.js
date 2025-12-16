import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; 
import Dashboard from './Dashboard'; 
import reportWebVitals from './reportWebVitals';
import { Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Root_page() {
    return (!localStorage.getItem('logged_in') || localStorage.getItem('otp_required'))?<App/>:<Navigate to="/dashboard" replace/>
}
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Root_page/>} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
reportWebVitals();