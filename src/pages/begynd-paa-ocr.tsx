import React from "react";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import './css/ocr.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function StartOCR() {
    const location = useLocation();
    const { userEmail } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState('none');

    const goMenu = (newPage: string) => {
        setSelectedPage(newPage);
        navigate('/begynd-paa-ocr#' + newPage);
    };

    useEffect(() => {
        if (userEmail) {
          axios.get(`http://localhost:5000/users?email=${encodeURIComponent(userEmail)}`)
            .then((response) => {
              setUsers(response.data);
            })
            .catch((error) => {
              console.error("There was an error fetching the user!", error);
            });
        }
    }, [userEmail]);


    return(
        <>
            <Header />
            <div className="start-paa-ocr">
                <div className="box-inside">
                    <h2>Begynd på OCR</h2>
                    <p>Velkommen til vores quick-quide på OCR, hvor du kan finde alt den information du skal bruge til at begynde på ocr. Vi har en pakkeliste, tips, tricks og meget mere til dig!</p>
                    
                    <div className="insideBox">

                        <button
                            className={selectedPage === 'hurtig-guide' ? 'hurtigguideBTN active' : 'hurtigguideBTN'}
                            onClick={selectedPage === 'hurtig-guide' ? () => goMenu("") : () => goMenu("hurtig-guide")}>
                                HURTIG GUIDE
                        </button>

                        <button
                            className={selectedPage === 'pakkeliste' ? 'pakkelisteBTN active' : 'pakkelisteBTN'}
                            onClick={selectedPage === 'pakkeliste' ? () => goMenu("") : () => goMenu("pakkeliste")}>
                                PAKKELISTE
                        </button>

                        <button className={selectedPage === 'dit-forste-lob' ? 'firstrunBTN active' : 'firstrunBTN'}
                            onClick={selectedPage === 'dit-forste-lob' ? () => goMenu("") : () => goMenu("dit-forste-lob")}>
                                DIT FØRSTE LØB
                        </button>

                        <button className={selectedPage === 'elite-lober' ? 'eliteBTN active' : 'eliteBTN'}
                            onClick={selectedPage === 'elite-lober' ? () => goMenu("") : () => goMenu("elite-lober")}>
                                ELITE LØBER
                        </button>

                    </div>
                </div>

                <div className={selectedPage === 'dit-forste-lob' ? 'dit-forste-lob' : 'dit-forste-lob disable'}>
                    <h2>Dit Første Løb</h2>
                    <p>Dit allerførste løb i OCR? Læs vores tips og tricks og info til det.</p>
                    <div className="inside">
                        <h3 style={{color: '#81bebe', marginLeft: '20px'}}>Kom i gang med OCR-løb:</h3>
                        <ul style={{color: '#999', marginLeft: '20px', marginRight: '20px'}}>
                            <li><strong>Tilmeld dig et løb:</strong> Det vigtigste er at tage det første skridt og tilmelde dig et løb. Find et event nær dig og meld dig til – resten skal nok falde på plads.</li>
                            <li><strong>Mød op og vær klar på sjov:</strong> Det handler mest om at have det sjovt og få en fed oplevelse. Du behøver ikke være i topform for at starte – det vigtigste er at dukke op og være klar til at prøve noget nyt.</li>
                            <li><strong>Tag det i dit eget tempo:</strong> Der er ingen krav om at klare alle forhindringer. Hvis du støder på en forhindring, du ikke kan klare, så tag en pause, gå udenom eller prøv noget andet – det er helt okay!</li>
                            <li><strong>Del oplevelsen med venner:</strong> Det er sjovest, hvis du tager nogle venner med eller finder nye på dagen. OCR-løb er en fantastisk måde at have det sjovt og samarbejde på.</li>
                        </ul>
                        <h3 style={{color: '#81bebe', marginLeft: '20px'}}>Tips til at undgå skader (og stadig have det sjovt!):</h3>
                        <ul style={{color: '#999', marginLeft: '20px', marginRight: '20px'}}>
                            <li><strong>Varm let op:</strong> Du behøver ikke lave en maraton-opvarmning, men stræk lige benene og armene lidt. Et par hop eller en kort løbetur kan gøre underværker.</li>
                            <li><strong>Pas på de våde forhindringer:</strong> Hvis noget ser glat ud – det er det nok! Tag det roligt og hold fast, når du hopper eller klatrer.</li>
                            <li><strong>Brug dit instinkt:</strong> Hvis noget føles usikkert eller ubehageligt, så spring det over. Der kommer flere sjove forhindringer, og du skal jo gerne kunne gå i morgen!</li>
                            <li><strong>Hydrér dig selv (ja, vand hjælper):</strong> Sørg for at drikke vand før og efter løbet. Du vil ikke ligne en tørret rosin midt i løbet.</li>
                            <li><strong>Lyt til kroppen:</strong> Får du en lille smerte eller ubehag undervejs, så tag en pause. Ingen grund til at være en helt, der ender med at sidde ude i flere uger.</li>
                        </ul>
                    </div>
                </div>



                <div className={selectedPage === 'elite-lober' ? 'elite-lober' : 'elite-lober disable'}>
                    <h2>Elite Løber</h2>
                    <p>Ønsker du at tage konkurrencen i OCR mere seriøs? Læs hvordan og hvad Elite indgår i.</p>
                    <div className="inside">
                        <h3 style={{color: '#81bebe', marginLeft: '20px'}}>Hvad er en Elite Løber:</h3>
                        <ul style={{color: '#999', marginLeft: '20px', marginRight: '20px'}}>
                            <li><strong>Definition:</strong> En elite løber er dem som ikke bare løber for sjov, men også for konkurrencen. Som elite har du mulighed for DM, EM og VM ved nogen races.</li>
                        </ul>
                    </div>
                </div>

                <div className={selectedPage === 'pakkeliste' ? 'pakkeliste' : 'pakkeliste disable'}>
                    <h2>Pakkeliste</h2>
                    <p>Her er vores forslag på en god pakkeliste til dit næste OCR løb!</p>
                    <div className="inside">
                        <p>• Løbetøj</p>
                        <p>• Skiftetøj</p>
                        <p>• Løbesko/Trailsko</p>
                        <p>• ID-kort m. billed</p>
                        <p>• Handsker (Vis du er sart over for muder)</p>
                        <p>• Snacks til efter løbet (Har du brug for noget extra energi)</p>
                        <p>• Håndklæde</p>
                        <p>• Pose til beskidt tøj & sko</p>
                        <p>‎ </p>
                        <p>Dette er vores forslag på en starter pakkeliste! Når du bliver mere advanceret kunne du selvfølgelig være smart at medbringe, fx. sportstape, kalk til grebbet eller noget andet!</p>
                    </div>
                </div>

                <div className={selectedPage === 'hurtig-guide' ? 'hurtig-guide' : 'hurtig-guide disable'}>
                    <h2>Hurtig Guide</h2>
                    <p>Her er vores hurtig guide til at komme igang med OCR!</p>
                    <div className="inside">
                        
                    </div>
                </div>
            </div>
        </>
    )
}