import Header from "./components/Header"
import React, { useState, useEffect } from 'react';
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { generateUUID } from "./functions/GenerateUUID";
import './css/create-race.css'
import e from "express";

export default function CreateRace() {
    const navigate = useNavigate();
    const [value, onChange] = useState("wrong");
    const { userEmail } = useAuth();
  
    const switchSide = (newside: string) => {
      navigate('/' + newside);
    };

    useEffect(() => {
        if (userEmail === 'edb020ac-7180-46c0-8f2b-ca55cca8a0ed@racetracker.dk') {
            onChange('perms');
        }
    });

    return (
        <>
            <Header/>
            <div className="createRace">
                <div className="options">
                    <h2>Opret et Race!</h2>
                    <p>Er der et race som ikke er her på men du gerne ville have så opret et race på din profil! Skal det være officelt så send en mail med detaljer og info til os.</p>
                    <button onClick={() => switchSide("races/create-unofficial")} className="btn">Opret uofficielt race</button>
                    <p>Ved opretning at et uofficelt er det kun dig der kan se det, og det kræver ingen tilladelser.</p>
                    <button
                    className={value === 'perms' ? 'officialbtn-active btn' : 'officialbtn'}
                    onClick={value === 'perms' ? () => switchSide("races/create-official/80c49f87-b344-437e-911e-f530c9156e72") : () => switchSide('home')}
                    >Opret officielt race</button>
                    <p>Ved opretning at et officelt er det alle på siden som kan se det. Kan kun oprettelse af administrator</p>
                    <button className="wishbtn btn">Send et ønske</button>
                    <p>Send et ønske til vores Administration team for at lave et løb officelt!</p>
                </div>
            </div>
        </>
    )
}

export function CreateUNOFFICIAL() {
    const { userEmail } = useAuth();

    const [race, setRace] = useState('');
    const [organier, setOrganizer] = useState('');
    const [price, setPrice] = useState("");
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [forhindringer, setForhindringer] = useState("");
    const [distance, setDistance] = useState("");
    const [billet, setBillet] = useState('');
    const [website, setWebsite] = useState('');
    const [elite, setElite] = useState('');
    const [jrelite, setJrelite] = useState('');
    const [heatinfo, setHeatinfo] = useState('');
    const [official, setOfficial] = useState('false');

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const uuid = generateUUID();
    
        const response = await fetch('http://localhost:5000/createrace-unofficial', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userEmail, race, organier, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo }),
        });
    
        if (response.ok) {
          window.location.href = '/home';
          setError("")
        } else {
            setError("error")
        }
      };

    return (
        <>
            <Header />
            <div className="createRace">
                <div className="inside-box">
                    <h2>Opret et uofficelt Løb</h2>
                    <p className="text1">At oprette et privat løb betyder du opretter et uofficelt løb som kun du kan se! Ønsker du at løbet skal godkendes som et officelt løb så skriv gerne på vores support mail.</p>
                    <form onSubmit={handleSubmit}>
                        <p className={error === 'error' ? 'error' : 'error disable'}>Oprettelse mislykkedes, se om alt er intastet!</p>
                        <div className="box-1">
                            <div className="part1">
                                <p>Navn</p>
                                <input
                                    type="text"
                                    value={race}
                                    onChange={(e) => setRace(e.target.value)}
                                    placeholder="Fx. RaceTracker"
                                    required
                                />
                                <p>Arrangøre</p>
                                <input
                                    type="text"
                                    value={organier}
                                    onChange={(e) => setOrganizer(e.target.value)}
                                    placeholder="Fx. RaceTracker"
                                    required
                                />
                                <p>Pris</p>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Pris"
                                    required
                                />
                                <p>Forhindringer</p>
                                <input
                                    type="number"
                                    value={forhindringer}
                                    onChange={(e) => setForhindringer(e.target.value)}
                                    placeholder="Forhindringer"
                                    required
                                />
                                <p>Distance</p>
                                <input
                                    type="number"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    placeholder="Distance"
                                    required
                                />
                                <p>Elite</p>
                                <input
                                    type="text"
                                    value={elite}
                                    onChange={(e) => setElite(e.target.value)}
                                    placeholder="Ja/Nej"
                                    required
                                />
                            </div>
                            <div className="part2">
                                <p>Dato</p>
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="DD-MM-YYYY"
                                    required
                                />
                                <p>Addresse</p>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Addresse"
                                    required
                                />
                                <p>Land</p>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Land"
                                    required
                                />
                                <p>Billet link</p>
                                <input
                                    type="text"
                                    value={billet}
                                    onChange={(e) => setBillet(e.target.value)}
                                    placeholder="Skriv 'Ukendt' vis du ikke har."
                                    required
                                />
                                <p>Website link</p>
                                <input
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="Skriv 'Ukendt' vis du ikke har."
                                    required
                                />
                                <p>Jr. Elite</p>
                                <input
                                    type="text"
                                    value={jrelite}
                                    onChange={(e) => setJrelite(e.target.value)}
                                    placeholder="Ja/Nej"
                                    required
                                />
                                <p>Heat Info</p>
                                <input
                                    type="text"
                                    value={heatinfo}
                                    onChange={(e) => setHeatinfo(e.target.value)}
                                    placeholder="Basisk heat info.."
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit">Opret</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export function CreateOFFICIAL() {
    const [race, setRace] = useState('');
    const [organier, setOrganizer] = useState('');
    const [price, setPrice] = useState("");
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [forhindringer, setForhindringer] = useState("");
    const [distance, setDistance] = useState("");
    const [billet, setBillet] = useState('');
    const [website, setWebsite] = useState('');
    const [elite, setElite] = useState('');
    const [jrelite, setJrelite] = useState('');
    const [heatinfo, setHeatinfo] = useState('');
    const [official, setOfficial] = useState('false');

    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const uuid = generateUUID();
    
        const response = await fetch('http://localhost:5000/createrace-official', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ race, organier, price, date, country, address, forhindringer, distance, billet, website, elite, jrelite, uuid, heatinfo }),
        });
    
        if (response.ok) {
          window.location.href = '/home';
          setError("")
        } else {
            setError("error")
        }
      };

    return (
        <>
            <Header />
            <div className="createRace">
                <div className="inside-box">
                    <h2>Opret et officelt Løb</h2>
                    <p className="text1">At oprette et privat løb betyder du opretter et uofficelt løb som kun du kan se! Ønsker du at løbet skal godkendes som et officelt løb så skriv gerne på vores support mail.</p>
                    <form onSubmit={handleSubmit}>
                        <p className={error === 'error' ? 'error' : 'error disable'}>Oprettelse mislykkedes, se om alt er intastet!</p>
                        <div className="box-1">
                            <div className="part1">
                                <p>Navn</p>
                                <input
                                    type="text"
                                    value={race}
                                    onChange={(e) => setRace(e.target.value)}
                                    placeholder="Fx. RaceTracker"
                                    required
                                />
                                <p>Arrangøre</p>
                                <input
                                    type="text"
                                    value={organier}
                                    onChange={(e) => setOrganizer(e.target.value)}
                                    placeholder="Fx. RaceTracker"
                                    required
                                />
                                <p>Pris</p>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Pris"
                                    required
                                />
                                <p>Forhindringer</p>
                                <input
                                    type="number"
                                    value={forhindringer}
                                    onChange={(e) => setForhindringer(e.target.value)}
                                    placeholder="Forhindringer"
                                    required
                                />
                                <p>Distance</p>
                                <input
                                    type="number"
                                    value={distance}
                                    onChange={(e) => setDistance(e.target.value)}
                                    placeholder="Distance"
                                    required
                                />
                                <p>Elite</p>
                                <input
                                    type="text"
                                    value={elite}
                                    onChange={(e) => setElite(e.target.value)}
                                    placeholder="Ja/Nej"
                                    required
                                />
                            </div>
                            <div className="part2">
                                <p>Dato</p>
                                <input
                                    type="text"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    placeholder="DD-MM-YYYY"
                                    required
                                />
                                <p>Addresse</p>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Addresse"
                                    required
                                />
                                <p>Land</p>
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Land"
                                    required
                                />
                                <p>Billet link</p>
                                <input
                                    type="text"
                                    value={billet}
                                    onChange={(e) => setBillet(e.target.value)}
                                    placeholder="Skriv 'Ukendt' vis du ikke har."
                                    required
                                />
                                <p>Website link</p>
                                <input
                                    type="text"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="Skriv 'Ukendt' vis du ikke har."
                                    required
                                />
                                <p>Jr. Elite</p>
                                <input
                                    type="text"
                                    value={jrelite}
                                    onChange={(e) => setJrelite(e.target.value)}
                                    placeholder="Ja/Nej"
                                    required
                                />
                                <p>Heat Info</p>
                                <input
                                    type="text"
                                    value={heatinfo}
                                    onChange={(e) => setHeatinfo(e.target.value)}
                                    placeholder="Basisk heat info.."
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit">Opret</button>
                    </form>
                </div>
            </div>
        </>
    )
}