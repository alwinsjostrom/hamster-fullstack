import { Link } from 'react-router-dom';
import { useState } from 'react'
import '../styles/gallery.css'

type Hamster = any

const Gallery = () => {

    const production = 'https://hamsterwars--fullstack.herokuapp.com/';
    const development = 'http://localhost:5500/';
    const baseUrl = (process.env.NODE_ENV ? production : development);
    
    const [hamsters, setHamsters] = useState<Hamster[] | null>(null)

    //Hämta alla hamstrar
    const sendRequest = async () => {
        const response = await fetch(baseUrl + 'hamsters')
        const data = await response.json()
        setHamsters(data)
    }

    const logData = () => {
        console.log(hamsters)
    }

    return (
        <div className='gallery--body'>
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
                <section className='grid--container'>
                    {hamsters
                    ? hamsters.map(obj => (
                        <article className='hamster--card'>
                            <figure>
                                <img src={baseUrl + 'img/' + obj.imgName} alt={obj.name} />
                            </figure>
                            <h2>{obj.name}</h2>
                            <p>{'Vinster: ' + obj.wins}</p>
                            <p>{'Matcher: ' + obj.games}</p>
                            <button>🗑️</button>
                        </article>
                    ))
                    : 'Loading hamsters...'}
                    <article className='hamster__card--add'>
                        <h1>Add new hamster</h1>
                        <button>+</button>
                    </article>
                </section>
                
                <button onClick={sendRequest}>Press me!</button>
                <button onClick={logData}>Logga hamsters</button>
            </main>
        </div>
    )
}

export default Gallery