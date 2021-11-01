import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/landing.css';

type Hamster = any

const Landing = () => {

    const baseUrl = process.env.HOST || 'http://localhost:5500/'
    const [hamsters, setHamsters] = useState<Hamster[] | null>(null)

    //useEffect

    //Hämta den hamster som leder
    const sendRequest = async () => {
        const response = await fetch(baseUrl + 'hamsters/cutest')
        const data = await response.json()
        //Slumpa en om flera ligger lika
        const randomized = [data[Math.floor(Math.random() * data.length)]]
        setHamsters(randomized)
    }

    const logData = () => {
        console.log(hamsters)
    }

    return (
        <div className='landing--body'>
            <header>
                <figure>
                    <Link to='/'>
                        <img className='header--logo' src="hamster_logo.png" alt="logo" />
                    </Link>
                </figure>
            </header>

            <main>
                <nav>
                    <Link to='/'><h3>Landing</h3></Link>
                    <Link to='/competition'><h3>Competition</h3></Link>
                    <Link to='/gallery'><h3>Gallery</h3></Link>
                </nav>

                <article className='main--info'>
                    <h1>Välkommen till hamsterwars!</h1>
                    <h3>Du kommer få två alternativ, och du kan rösta på den hamster du tycker är sötast. Nedan kan du se vilken eller vilka hamstrar som leder tävlingen. Tryck på knappen för att gå vidare till första rundan.</h3>
                </article>

                <article className='hamster--card'>
                    <figure>
                        <img src='https://media.istockphoto.com/photos/hamster-picture-id1299089557' alt='test' />
                    </figure>
                    <h2>Kalle</h2>
                    <p>Vinster: 1</p>
                    <p>Matcher: 1</p>
                </article>

                {hamsters
                    ? hamsters.map(obj => (
                        <article className='hamster--card'>
                            <figure>
                                <img src={baseUrl + 'img/' + obj.imgName} alt={obj.name} />
                            </figure>
                            <h2>{obj.name}</h2>
                            <p>{'Vinster: ' + obj.wins}</p>
                            <p>{'Matcher: ' + obj.games}</p>
                        </article>
                    ))
                    : 'Loading hamsters...'}
            </main>

            <button onClick={sendRequest}>Press me!</button>
            <button onClick={logData}>Logga hamsters</button>


        </div>

    )
}



export default Landing