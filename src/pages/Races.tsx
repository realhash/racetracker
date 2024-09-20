import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import './css/Races.css';

interface Filters {
  elite: string[];
  date: string[];
  country: string[];
  distance: string[];
  obstacles: string[];
}

const initialFilters: Filters = {
  elite: [],
  date: [],
  country: [],
  distance: [],
  obstacles: []
};

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
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
  elite: string;
  jrelite: string;
}

export default function Races() {
  const navigate = useNavigate();
  const { userEmail } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [races, setRaces] = useState<Race[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const switchSide = (newside: string) => {
    navigate('/' + newside);
  };

  const handleFilterChange = (category: keyof Filters, value: string, checked: boolean) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };

      if (category === 'country') {
        updatedFilters[category] = checked ? [value] : [];
      } else if (category === 'distance' || category === 'obstacles') {
        if (checked) {
          updatedFilters[category] = [value]; // Only allow one selection
        } else {
          updatedFilters[category] = []; // Deselect
        }
      } else {
        if (checked) {
          updatedFilters[category] = (updatedFilters[category] as string[]).concat(value);
        } else {
          updatedFilters[category] = (updatedFilters[category] as string[]).filter(item => item !== value);
        }
      }

      return updatedFilters;
    });
  };

  const applyFilters = (race: Race) => {
    const matchSearchTerm = race.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchElite = filters.elite.length === 0 || filters.elite.includes(race.elite);
    const matchDate = filters.date.length === 0 || filters.date.includes(race.date);
    const matchCountry = filters.country.length === 0 || filters.country.includes(race.country);
    const matchDistance = filters.distance.length === 0 || filters.distance.includes(race.distance.toString());

    const matchObstacles = filters.obstacles.length === 0 || filters.obstacles.some(filterValue => {
      const filterNumber = Number(filterValue);
      return race.forhindringer >= filterNumber;
    });

    return matchSearchTerm && matchElite && matchDate && matchCountry && matchDistance && matchObstacles;
  };

  const filteredRaces = races.filter(applyFilters);

  const resetFilters = () => {
    setFilters(initialFilters);
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
            const [dayA, monthA, yearA] = a.date.split("-");
            const [dayB, monthB, yearB] = b.date.split("-");
            const dateA = new Date(+yearA, +monthA - 1, +dayA);
            const dateB = new Date(+yearB, +monthB - 1, +dayB);
            return dateA.getTime() - dateB.getTime();
          });

          setRaces(sortedRaces);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    } else {
      axios.get<Race[]>(`http://localhost:5000/races`)
        .then(racesResponse => {
          setRaces(racesResponse.data);
        })
        .catch(error => {
          console.error("There was an error fetching the races!", error);
        });
    }
  }, [userEmail]);

  return (
    <>
      <Header />
      <div className="racesBG">
        <div className="inside">
          <h2>Races</h2>
          <p>Se en liste og information over alle officele OCR-Race.</p>
          <div className="box">
            <div className="filters">
              <input
                type="text"
                placeholder="Søg..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="searchBar"
              />
              <div className="filter-select">
                <div className="filter-group">
                  <p>Land:</p>
                  <select
                    value={filters.country.length > 0 ? filters.country[0] : ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleFilterChange('country', value, value !== '');
                    }}
                    className="filter-select-dropdown"
                  >
                    <option value="">Vælg land</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                  </select>
                </div>

                <div className="filter-group">
                  <p>Distance:</p>
                  <select
                    value={filters.distance.length > 0 ? filters.distance[0] : ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleFilterChange('distance', value, value !== '');
                    }}
                    className="filter-select-dropdown"
                  >
                    <option value="">Vælg distance</option>
                    <option value="4">4 KM</option>
                    <option value="5">5 KM</option>
                    <option value="8">8 KM</option>
                    <option value="12">12 KM</option>
                    <option value="16">16 KM</option>
                  </select>
                </div>

                <div className="filter-group">
                  <p>Forhindringer:</p>
                  <select
                    value={filters.obstacles.length > 0 ? filters.obstacles[0] : ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleFilterChange('obstacles', value, value !== '');
                    }}
                    className="filter-select-dropdown"
                  >
                    <option value="">Vælg forhindringer</option>
                    <option value="20">20+</option>
                    <option value="25">25+</option>
                    <option value="30">30+</option>
                    <option value="35">35+</option>
                    <option value="40">40+</option>
                    <option value="45">45+</option>
                    <option value="50">50+</option>
                  </select>
                </div>
              </div>
              <button onClick={resetFilters} className="reset-button">Reset Filters</button>
            </div>
            <div className="racelist">
              {filteredRaces.slice(0, 100).map((race, index) => (
                <div key={index} className="raceBox">
                  <h2>{race.name} - {race.organizer}</h2>
                  <p className="elite"><strong>Elite:</strong> {race.elite}</p>
                  <p className="elite2"><strong>Jr. Elite:</strong> {race.jrelite}</p>
                  <p className="date"><strong>Date:</strong> {race.date}</p>
                  <p className="address"><strong>Address:</strong> {race.address}</p>
                  <p className="country"><strong>Country:</strong> {race.country}</p>
                  <p className="info"><strong>Race:</strong> +{race.forhindringer} Obstacles, {race.distance} KM</p>
                  <div className="buttons">
                    <button className="buyBUTTON" onClick={() => window.open(race.billet, '_blank', 'noopener,noreferrer')}>KØB</button>
                    <button className="detailButton22">DETAILS</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="createrace" onClick={() => switchSide("races/create")}>OPRET LØB</button>
        </div>
      </div>
    </>
  );
}