import React from 'react';
import Header from "./components/Header";
import axios from 'axios';
import Calendar from 'react-calendar';

import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from "react-router-dom";
import { calculateAge } from './functions/AgeCalculator';

import './css/Calender.css';
import './css/Home.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const monthMapping: { [key: string]: number } = {
  'januar': 0,
  'februar': 1,
  'marts': 2,
  'april': 3,
  'maj': 4,
  'juni': 5,
  'juli': 6,
  'august': 7,
  'september': 8,
  'oktober': 9,
  'november': 10,
  'december': 11
};

interface User {
    id: number;
    name: string;
    email: string;
    age: Date;
    races: number;
    racetime: string;
    fastest: string;
    fastestrace: string;
    distance: number;
    permission: number;
}

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
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    

    const { userEmail } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [userRaces, setUserRaces] = useState<Race[]>([]);
    const [races, setRaces] = useState<Race[]>([]);
    const [value, onChange] = useState<Value>(new Date());
    const [closestRace, setClosestRace] = useState<Race | null>(null);
    const [date, setDate] = useState(new Date());
    const [closestRaceByDate, setClosestRaceByDate] = useState<Race | null>(null);

    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
      if (races.length > 0 && value) {
        const newDate = Array.isArray(value) ? value[0] : value;
    
        if (newDate) {
          const newDateTimestamp = newDate.getTime();
    
          const closest = races.reduce<Race | null>((prev, curr) => {
            const parts = curr.date.split(' ');
            if (parts.length !== 3) {
              console.error(`Invalid date format for race: ${curr.date}`);
              return prev;
            }
    
            const day = parseInt(parts[0].replace('.', '').trim());
            const month = monthMapping[parts[1]];
            const year = parseInt(parts[2]);
    
            if (isNaN(day) || month === undefined || isNaN(year)) {
              console.error(`Invalid date values for race: ${curr.date}`);
              return prev;
            }
    
            const currDate = new Date(year, month, day).getTime();
    
            if (currDate >= newDateTimestamp) {
              let prevDate = null;
              if (prev) {
                const prevParts = prev.date.split(' ');
                if (prevParts.length === 3) {
                  const prevDay = parseInt(prevParts[0].replace('.', '').trim());
                  const prevMonth = monthMapping[prevParts[1]];
                  const prevYear = parseInt(prevParts[2]);
                  if (!isNaN(prevDay) && prevMonth !== undefined && !isNaN(prevYear)) {
                    prevDate = new Date(prevYear, prevMonth, prevDay).getTime();
                  }
                }
              }
    
              if (!prev || (prevDate !== null && currDate < prevDate)) {
                return curr;
              }
            }
            return prev;
          }, null);
    
          setClosestRaceByDate(closest);
        }
      } else {
        setClosestRaceByDate(null);
      }
    }, [races, value]);
    
    

    const switchSide = (newside: string) => {
      navigate('/' + newside);
    };

    const goToWeb = (side: string) => {
      window.open(side, '_blank', 'noopener,noreferrer');
    }

    const formatDate = (dateString: string) => {
      const [day, month, year] = dateString.split("-");
      const date = new Date(+year, +month - 1, +day);
      const formattedDate = new Intl.DateTimeFormat('da-DK', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
      }).format(date);
      return formattedDate.replace(/(\d{1,2})\s/, '$1. '); 
    };

    useEffect(() => {
        if (userEmail) {
            const fetchUsersData = axios.get<User[]>(`http://localhost:5000/users?email=${encodeURIComponent(userEmail)}`);
            const fetchRacesData = axios.get<Race[]>(`http://localhost:5000/races`);
            const fetchUserRacesData = axios.get<Race[]>(`http://localhost:5000/userraces?email=${encodeURIComponent(userEmail)}`);

            Promise.all([fetchUsersData, fetchRacesData, fetchUserRacesData])
                .then(([usersResponse, racesResponse, userRacesResponse]) => {
                    setUsers(usersResponse.data);

                    const allRaces = [...racesResponse.data, ...userRacesResponse.data];
                    const sortedRaces = allRaces.sort((a: Race, b: Race) => {
                        const dateA = new Date(a.date.split('-').reverse().join('-'));
                        const dateB = new Date(b.date.split('-').reverse().join('-'));
                        return dateA.getTime() - dateB.getTime();
                    });

                    const formattedRaces = sortedRaces.map((race) => ({
                        ...race,
                        date: formatDate(race.date),
                    }));

                    setRaces(formattedRaces);
                    setUserRaces(userRacesResponse.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the data!", error);
                });
        } else {
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
        }
    }, [userEmail]);

    return (
        <>
            <Header />
            <div className="homePage">
                <div className="nyheder">
                    <div className="raceList">
                        {races.slice(0, 6).map((race, index) => (
                            <div key={index} className="raceCard">
                                <h2>{race.name} - {race.organizer}</h2>
                                <div className="down1">
                                  <p><strong>Dato:</strong> {race.date}</p>
                                  <p><strong>Pris:</strong> {race.price},- DKK</p>
                                  <p><strong>Land:</strong> {race.country}</p>
                                </div>
                                <button className="detailsButton">DETALJER</button>
                            </div>
                        ))}
                    </div>
                    <h2 className="header">Næste OCR-Løb</h2>
                    <button className="create-race" onClick={() => switchSide("races/create")}>OPRET LØB</button>
                </div>

                <Calendar onChange={onChange} value={value} className="Calendar" />

                <div className="selection">
                    <h2>Tætteste OCR-Løb</h2>
                    <div className="closeRace">
                        <div className="cRace">
                            {races.length > 0 ? (
                              <div key={races[0].id}>
                                <h2>{closestRaceByDate ? closestRaceByDate.name : 'Ingen race fundet.'}</h2>
                                <h3>{closestRaceByDate ? closestRaceByDate.organizer : 'Ukendt'}</h3>
                                <p><strong>Dato:</strong> {closestRaceByDate ? closestRaceByDate.date : 'Ukendt'}</p>
                                <p><strong>Pris:</strong> {closestRaceByDate ? closestRaceByDate.price : 'Ukendt'} ,- DKK</p>
                                <p><strong>Address:</strong> {closestRaceByDate ? closestRaceByDate.address : 'Ukendt'}</p>
                                <p><strong>Distance:</strong> {closestRaceByDate ? closestRaceByDate.distance : 'Ukendt'} KM</p>
                                <p><strong>Forhindringer:</strong> +{closestRaceByDate ? closestRaceByDate.forhindringer : 'Ukendt'}</p>
                                <p><strong>Land:</strong> {closestRaceByDate ? closestRaceByDate.country :'Ukendt'}</p>
                                {closestRaceByDate ? <p><strong>Viden:</strong> ønsker du at vide mere omkring løbet kan du trykke på <b>DETALJER</b> knappen nede under</p> : ''}
                                <button className="detailsButton2">DETALJER</button>
                                <button className="detailsButton3" onClick={() => goToWeb("" + closestRaceByDate?.billet)}>KØB BILLET</button>
                                <button className="detailsButton4" onClick={() => goToWeb("" + closestRaceByDate?.website)}>HJEMMESIDE</button>
                              </div>
                            ) : (
                                <p>Ingen løb fundet.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="start-ocr">
                  <div className='ocr-start'>
                    <h2>Begynd på OCR</h2>
                    <p>OCR er en pisse fed sport på verdensplan. Ønsker du at prøve det og komme godt igen, så læs vores forslar og quick-guide på det. Vi lover dig det tager ikke mere ned 5 minutter af din tid! Du for svar på hvad du skal gøre, medbringe, hvad det er og mere!</p>
                    <button className="quick-guideBTN" onClick={() => switchSide("begynd-paa-ocr")}>
                      LÆS QUICK-GUIDEN
                    </button>
                  </div>

                </div>

                <div className="personlig2">
                    {users.length > 0 ? (
                      <div>
                        <h2>Hej {users[0].name} </h2>
                      </div>
                    ) : (
                      <h2>Ikke logget ind! </h2>
                    )}
                    <div className="statistic">
                        <div className="statistic2">
                            {users.length > 0 ? (
                              <div key={users[0].id}>
                                <p><strong>Email:</strong> {users[0].email}</p>
                                <p><strong>Alder:</strong> {calculateAge(users[0].age)}</p>
                                <p><strong>Antal Race:</strong> {users[0].races}</p>
                                <p><strong>Race Tid:</strong> {users[0].racetime}</p>
                                <p><strong>Hurtigste Løb:</strong> {users[0].fastest} - {users[0].fastestrace} </p>
                                <p><strong>Distance Løbet:</strong> {users[0].distance} KM</p>
                                <button className="profileBTN">GÅ TIL PROFIL</button>
                              </div>
                            ) : (
                              <>
                                <p>Ingen bruger fundet.</p>
                                <button className="profileBTN3" onClick={() => switchSide("login")}>LOGIN</button>
                                <button className="profileBTN2" onClick={() => switchSide("register")}>OPRET PROFIL</button>
                              </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
