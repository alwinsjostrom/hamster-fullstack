import '../styles/competition.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import HamsterObj from '../models/hamster';

type Visibility = boolean

const Competition = () => {
    //Deklarera states
    const [one, setOne] = useState<HamsterObj[] | null>(null)
    const [two, setTwo] = useState<HamsterObj[] | null>(null)
    const [oneVisible, setOneVisible] = useState<Visibility>(true)
    const [twoVisible, setTwoVisible] = useState<Visibility>(true)
    const [active, setActive] = useState<Visibility>(true)

    //Kör on mount
    useEffect(() => {
        sendRequest()
    }, []);

    //Hämta en slumpad hamster
    const sendRequest = async () => {
        const response = await fetch('/hamsters')
        const data = await response.json()

        //Slumpa fram en från arrayen, men ta sedan bort den slumpade från arrayen
        //för att inte få samma två gånger
        const randomNum = Math.floor(Math.random() * data.length)
        const randomizedOne = [data[randomNum]]
        data.splice(randomNum, 1)

        //Slumpa nästa
        const randomizedTwo = [data[Math.floor(Math.random() * data.length)]]
        setOne(randomizedOne)
        setTwo(randomizedTwo)

        //Reset
        setOneVisible(true)
        setTwoVisible(true)
        setActive(true)
    }

    //Hantera en röstning
    const sendVote = (winner: HamsterObj, loser: [HamsterObj] | any, num: number) => {

        //Öka räknare
        winner.games++
        winner.wins++
        loser[0].games++
        loser[0].defeats++

        //Uppdatera räknare och visibility
        if (num === 1) {
            setOne([winner])
            setTwo(loser)
            setTwoVisible(false)
        } else {
            setTwo([winner])
            setOne(loser)
            setOneVisible(false)
        }

        //Visa info
        setActive(false)

        //Updatera vinnaren med nya värden i databasen
        fetch("/hamsters/" + winner.id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                games: winner.games,
                wins: winner.wins
            })
        })

        //Updatera förloraren med nya värden i databasen
        fetch("/hamsters/" + loser[0].id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                games: loser[0].games,
                defeats: loser[0].defeats
            })
        })
    }

    return (
        <div className='competition--body'>
            <header className='competition--header'>
                <Link to='/'>
                    <img className='header--logo' src="hamster_logo.png" alt="logo" />
                </Link>
            </header>

            <main className="competition--main">
                <nav className="competition--nav">
                    <Link to='/' style={{ textDecoration: 'none' }}><h3>Home</h3></Link>
                    <Link to='/competition' style={{ textDecoration: 'none' }}><h3>Battle</h3></Link>
                    <Link to='/gallery' style={{ textDecoration: 'none' }}><h3>Gallery</h3></Link>
                </nav>

                <article className='competition--info'>
                    <h4>Här kan du rösta på vilken hamster du tycker är sötast.</h4>
                </article>

                <section className='competiton__hamster--section'>
                    {one && oneVisible
                        ? one.map(obj => (
                            <article className='competiton__hamster--card' key={obj.id}>
                                <figure>
                                    <img src={'/img/' + obj.imgName} alt={obj.name} />
                                </figure>
                                <h2>{obj.name}</h2>
                                <aside className={active ? 'hide' : undefined}>
                                    <p>{'Ålder: ' + obj.age}</p>
                                    <p>{'Älskar: ' + obj.loves}</p>
                                    <p>{'Favoritmat: ' + obj.favFood}</p>
                                    <p>{'Matcher: ' + obj.games}</p>
                                    <p>{'Vinster: ' + obj.wins}</p>
                                    <p>{'Förluster: ' + obj.defeats}</p>
                                </aside>
                                <button className={active ? undefined : 'hide'} onClick={() => sendVote(obj, two, 1)}>Rösta</button>
                            </article>
                        ))
                        : ''}

                    {two && twoVisible
                        ? two.map(obj => (
                            <article className='competiton__hamster--card' key={obj.id}>
                                <figure>
                                    <img src={'/img/' + obj.imgName} alt={obj.name} />
                                </figure>
                                <h2>{obj.name}</h2>
                                <aside className={active ? 'hide' : undefined}>
                                    <p>{'Ålder: ' + obj.age}</p>
                                    <p>{'Älskar: ' + obj.loves}</p>
                                    <p>{'Favoritmat: ' + obj.favFood}</p>
                                    <p>{'Matcher: ' + obj.games}</p>
                                    <p>{'Vinster: ' + obj.wins}</p>
                                    <p>{'Förluster: ' + obj.defeats}</p>
                                </aside>
                                <button className={active ? undefined : 'hide'} onClick={() => sendVote(obj, one, 2)}>Rösta</button>
                            </article>
                        ))
                        : ''}
                </section>

                <button className={active ? 'hide' : 'again--btn'} onClick={sendRequest}>Nästa omgång!</button>
            </main>
        </div>
    )
}

export default Competition