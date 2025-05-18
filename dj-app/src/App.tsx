import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/profile";
import Header from "./components/header";
import NotFound from "./components/notFound";
import { AuthProvider } from "./authentication/authContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <Router>
          <Header />
            <Routes>
                <Route index element={<Navigate to="/profile" />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
