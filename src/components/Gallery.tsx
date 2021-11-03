import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import '../styles/gallery.css'

type Hamster = any

const Gallery = () => {

    const [hamsters, setHamsters] = useState<Hamster[] | null>(null)

    //Kör on mount
    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component will be unmount')
        }
    }, []);

    //Hämta alla hamstrar
    const sendRequest = async () => {
        const response = await fetch('/hamsters')
        const data = await response.json()
        setHamsters(data)
    }

    const logData = () => {
        console.log(hamsters)
    }

    return (
        <div className='gallery--body'>

            <header className="gallery--header">
                <figure>
                    <Link to='/'>
                        <img className='header--logo' src="hamster_logo.png" alt="logo" />
                    </Link>
                </figure>
            </header>

            <main className="gallery--main">

                <nav className="gallery--nav">
                    <Link to='/' style={{ textDecoration: 'none' }}><h3>Landing</h3></Link>
                    <Link to='/competition' style={{ textDecoration: 'none' }}><h3>Competition</h3></Link>
                    <Link to='/gallery' style={{ textDecoration: 'none' }}><h3>Gallery</h3></Link>
                </nav>

                <section className='gallery__grid--container'>

                    <article className='gallery--info'>
                        <h4>Här kan du lägga till eller ta bort hamstrar från databasen.</h4>
                    </article>

                    {hamsters
                        ? hamsters.map(obj => (
                            <article className='gallery__hamster--card' key={obj.id}>
                                <figure>
                                    <img src={'/img/' + obj.imgName} alt={obj.name} />
                                </figure>
                                <h2>{obj.name}</h2>
                                <button>🗑️</button>
                            </article>
                        ))
                        : ''}

                    <button className="add--btn">+</button>

                </section>

                <button onClick={sendRequest}>Press me!</button>

            </main>
        </div>
    )
}

export default Gallery