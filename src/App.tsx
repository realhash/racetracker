import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Register from './auth/Register';
import Login from './auth/Login';
import Home from './pages/Home';
import StartOCR from './pages/begynd-paa-ocr';
import Hjaelp from './pages/Hjaelp';
import Races from './pages/Races';
import CreateRace, { CreateUNOFFICIAL, CreateOFFICIAL } from './pages/create-race';
import PublicRoute from './auth/PublicRoute';
import AuthGuard from './auth/AuthGuard';


const App: React.FC = () => {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/register" element={<PublicRoute element={<Register />} />} />
                  <Route path="/login" element={<PublicRoute element={<Login />} />} />

                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route 
                      path="/home" 
                      element={
                          <AuthGuard>
                              <Home />
                          </AuthGuard>
                      } 
                  />
                  <Route 
                      path="/races" 
                      element={
                        <AuthGuard>
                            <Races />
                        </AuthGuard>
                    } 
                  />
                  <Route 
                      path="/races/create" 
                      element={
                        <AuthGuard>
                            <CreateRace />
                        </AuthGuard>
                    } 
                  />
                  <Route 
                      path="/races/create-unofficial/" 
                      element={
                        <AuthGuard>
                            <CreateUNOFFICIAL />
                        </AuthGuard>
                    } 
                  />
                  <Route 
                      path="/races/create-official/80c49f87-b344-437e-911e-f530c9156e72" 
                      element={
                        <AuthGuard>
                            <CreateOFFICIAL />
                        </AuthGuard>
                    } 
                  />
                  <Route 
                      path="/begynd-paa-ocr" 
                      element={
                        <AuthGuard>
                            <StartOCR />
                        </AuthGuard>
                    } 
                  />
                  <Route 
                      path="/hjaelp" 
                      element={
                        <AuthGuard>
                            <Hjaelp />
                        </AuthGuard>
                    } 
                  />
                  <Route 
                      path="/om-os" 
                      element={
                        <AuthGuard>
                            <Home />
                        </AuthGuard>
                    } 
                  />
                  <Route 
                      path="/faellesskab" 
                      element={
                        <AuthGuard>
                            <Home />
                        </AuthGuard>
                    } 
                  />
              </Routes>
          </Router>
      </AuthProvider>
  );
};

export default App;