import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/profile";
import Header from "./structure/header";
import NotFound from "./components/notFound";
import Home from "./components/home";
import { AuthProvider } from "./authentication/authContext";
import Layout from "./structure/layout";
import Login from "./components/login";
import Register from "./components/register";
import AboutUs from "./components/about_us";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Layout>
          <Router>
          <Header />
            <Routes>
                <Route index element={<Navigate to="/home" />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="profile" element={<Profile />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </Layout>
      </AuthProvider>
    </div>
  );
}

export default App;
