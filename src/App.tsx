import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { formatDate } from './pages/functions/formatDate';
import Register from './auth/Register';
import Login from './auth/Login';
import Home from './pages/Home';
import StartOCR from './pages/begynd-paa-ocr';
import Hjaelp from './pages/Hjaelp';
import Races from './pages/Races';
import CreateRace, { CreateUNOFFICIAL, CreateOFFICIAL } from './pages/create-race';
import PublicRoute from './auth/PublicRoute';
import AuthGuard from './auth/AuthGuard';
import axios from 'axios';

interface Race {
    id: number;
    name: string;
    organizer: string;
    price: string;
    date: string;
    country: string;
    address: string;
    forhindringer: number;
    distance: number;
    billet: string;
    website: string;
    email: string;
    official: string;
    uuid: string;
  }

const App: React.FC = () => {
    const [races, setRaces] = useState<Race[]>([]);

    useEffect(() => {
        axios.get<Race[]>(`http://localhost:5000/races`)
        .then((racesResponse) => {
            const formattedRaces = racesResponse.data.map((race) => ({
                ...race,
                date: formatDate(race.date),
            }));
            setRaces(formattedRaces);
        })
        .catch((error) => {
            console.error("There was an error fetching the races!", error);
        });
    });

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
                    {races.map((race) => (
                        <Route
                            key={race.uuid}
                            path={`/races/${race.uuid}`}
                            element={
                            <AuthGuard>
                                <Races />
                            </AuthGuard>
                            }
                        />
                    ))}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;