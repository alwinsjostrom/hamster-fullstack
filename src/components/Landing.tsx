import '../styles/landing.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HamsterObj from '../models/hamster';

type Visibility = boolean

const Landing = () => {
    const [hamsters, setHamsters] = useState<HamsterObj[] | null>(null)
    const [active, setActive] = useState<Visibility>(true)

    //Kör on mount
    useEffect(() => {
        sendRequest()
    }, []);

    //Hämta alla hamstrar
    const sendRequest = () => {
        //Göm felmeddelande
        setActive(true)

        fetch('/hamsters/cutest')
            .then(res => {
                return res.json()
            })
            .then(data => {
                //Slumpa en om flera ligger lika
                const randomized = [data[Math.floor(Math.random() * data.length)]]
                setHamsters(randomized)
            })
            .catch(err => {
                //Hantera felmeddelande
                console.log(err.message)
                setActive(false)
            })
    }

    return (
        <div className='landing--body'>
            <header className="landing--header">
                <figure>
                    <Link to='/'>
                        <img className='header--logo' src="hamster_logo.png" alt="logo" />
                    </Link>
                </figure>
            </header>

            <main className='landing--main'>
                <nav className='landing--nav'>
                    <Link to='/' style={{ textDecoration: 'none' }}><h3>Landing</h3></Link>
                    <Link to='/competition' style={{ textDecoration: 'none' }}><h3>Competition</h3></Link>
                    <Link to='/gallery' style={{ textDecoration: 'none' }}><h3>Gallery</h3></Link>
                </nav>

                <article className='landing--info'>
                    <h1>Välkommen till hamsterwars!</h1>
                    <h4>Du kommer få två alternativ, och du kan rösta på den hamster du tycker är sötast. Nedan kan du se vilken hamster som leder tävlingen. Tryck på Competition-fliken för att gå vidare till första rundan.</h4>
                </article>

                <article className={active? 'hide' : 'error--message'}>
                    <p>Hoppsan, något gick fel. Försök igen?</p>
                    <button onClick={sendRequest}>Nytt försök</button>
                </article>

                {hamsters
                    ? hamsters.map(obj => (
                        <article className='landing__hamster--card' key={obj.id}>
                            <img src={'/img/' + obj.imgName} alt={obj.name} />
                            <h2>{obj.name}</h2>
                        </article>
                    ))
                    : ''}
            </main>
        </div>
    )
}

export default Landing