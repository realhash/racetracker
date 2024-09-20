import './css/RaceWeb.css';
import Header from '../components/Header';
import { formatDate } from './formatDate';

export const generateRaceSite = (
        name: string, 
        organizer: string, 
        price: string, 
        date: string, 
        address: string, 
        country: string, 
        obstacles: number, 
        distance: number, 
        elite: string, 
        jrelite: string,
        heatinfo: string,
        billet: string,
        website: string
    ) => {

    const goToWeb = (side: string) => {
        window.open(side, '_blank', 'noopener,noreferrer');
    }

    return (
        <>
            <Header/>
            <div className="siterace-BG">
                <div className='siterace-INSIDE'>
                    <h2 className='INSIDE-name'>{name}</h2>
                    <h4 className='INSIDE-host'>{organizer}</h4>
                    <div className='siterace-BASICINFO'>
                        <h3 className="INSIDE-title">Basisk Info</h3>
                        <p className='INSIDE-price'><strong>Pris:</strong> {price},- DKK</p>
                        <p className='INSIDE-date'><strong>Dato:</strong> {date}</p>
                        <p className='INSIDE-address'><strong>Addresse:</strong> {address}</p>
                        <p className='INSIDE-country'><strong>Land:</strong> {country}</p>
                        <p className='INSIDE-obstacles'><strong>Forhindringer:</strong> +{obstacles}</p>
                        <p className='INSIDE-distance'><strong>Længde:</strong> {distance} KM</p>
                        <p className='INSIDE-elite'><strong>Elite:</strong> {elite}</p>
                        <p className='INSIDE-jrelite'><strong>Jr. Elite:</strong> {jrelite}</p>
                    </div>
                    <div className='siterace-HEATINFO'>
                        <h3 className='INSIDE-title'>Heat Info</h3>
                        <p>{heatinfo}</p>
                    </div>
                </div>
                <button className='siterace-BTN1' onClick={() => goToWeb(billet)}>Køb Billet</button>
                <button className='siterace-BTN2' onClick={() => goToWeb(website)}>Event Hjemmeside</button>
            </div>
        </>
    );
};