import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/landing.css';

type Hamster = any

const Landing = () => {

    const [hamsters, setHamsters] = useState<Hamster[] | null>(null)

    //Kör on mount
    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component will be unmount')
        }
    }, []);

    //Hämta den hamster som leder
    const sendRequest = async () => {
        const response = await fetch('/hamsters/cutest')
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
                    <h4>Du kommer få två alternativ, och du kan rösta på den hamster du tycker är sötast. Nedan kan du se vilken eller vilka hamstrar som leder tävlingen. Tryck på knappen för att gå vidare till första rundan.</h4>
                </article>

                <article className='landing__hamster--card'>
                    <img src='https://media.istockphoto.com/photos/hamster-picture-id1299089557' alt='test' />
                    <h2>Kalle</h2>
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

            <button onClick={sendRequest}>Press me!</button>


        </div>

    )
}



export default Landing