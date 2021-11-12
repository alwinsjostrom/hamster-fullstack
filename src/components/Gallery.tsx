import '../styles/gallery.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HamsterObj from '../models/hamster';
import HamsterCard from './HamsterCard';
import { setTimeout } from 'timers';
import { isValidName, isValidAge } from '../functions/validate';

type Visibility = boolean

const Gallery = () => {
    //Generella states
    const [hamsters, setHamsters] = useState<HamsterObj[] | null>(null)
    const [active, setActive] = useState<Visibility>(true)
    const [newHamster, setNewHamster] = useState({
        games: 0,
        wins: 0,
        defeats: 0,
        imgName: 'hamster-1.jpg',
        name: '',
        age: 0,
        loves: '',
        favFood: ''
    })

    //States för valideringen
    const [name, setName] = useState('')
    const [age, setAge] = useState(0)
    const [loves, setLoves] = useState('')
    const [food, setFood] = useState('')
    const [nameTouched, setNameTouched] = useState(false)
    const [ageTouched, setAgeTouched] = useState(false)
    const [lovesTouched, setLovesTouched] = useState(false)
    const [foodTouched, setFoodTouched] = useState(false)

    //Kör on mount
    useEffect(() => {
        sendRequest()
    }, []);

    //Hämta alla hamstrar
    const sendRequest = async () => {
        const response = await fetch('/hamsters')
        const data = await response.json()
        setHamsters(data)
        setActive(true)
    }

    //Visa formuläret
    const showAdd = () => {
        setActive(false)
    }

    //Validering av name
    const nameIsValid = isValidName(name)
    const nameClass = nameIsValid ? 'valid' : 'invalid'
    const nameSet = (target: any) => {
        setName(target.value)
        setNameTouched(true)
        makeHamster(target)
    }

    //Validering av age
    const ageIsValid = isValidAge(age)
    const ageClass = ageIsValid ? 'valid' : 'invalid'
    const ageSet = (target: any) => {
        setAge(Number(target.value))
        setAgeTouched(true)
        makeHamster(target)
    }

    //Validering av loves
    const lovesIsValid = isValidName(loves)
    const lovesClass = lovesIsValid ? 'valid' : 'invalid'
    const lovesSet = (target: any) => {
        setLoves(target.value)
        setLovesTouched(true)
        makeHamster(target)
    }

    //Validering av food
    const foodIsValid = isValidName(food)
    const foodClass = foodIsValid ? 'valid' : 'invalid'
    const foodSet = (target: any) => {
        setFood(target.value)
        setFoodTouched(true)
        makeHamster(target)
    }

    //Kolla att alla fält är ok ifyllda
    const formIsValid = nameIsValid && ageIsValid && lovesIsValid && foodIsValid

    //Skapa ett nytt hamsterobjekt med rätt properties
    const makeHamster = (target: any) => {
        let object = newHamster

        //Kolla vilket fält som blev ifyllt
        if (target.name === 'input--name') {
            object.name = target.value
        } else if (target.name === 'input--age') {
            object.age = target.value
        } else if (target.name === 'input--loves') {
            object.loves = target.value
        } else if (target.name === 'input--food') {
            object.favFood = target.value
        }

        //Uppdatera state
        setNewHamster(object)
    }

    const addHamster = () => {
        //Lägga till det nya hamsterobjektet i databasen
        fetch("/hamsters", {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(newHamster)
        })

        //Slumpa en bildaddress från img-mappen
        const randomNum = Math.floor(Math.random() * 40)

        //Reset
        setNewHamster({
            games: 0,
            wins: 0,
            defeats: 0,
            imgName: `hamster-${randomNum}.jpg`,
            name: '',
            age: 0,
            loves: '',
            favFood: ''
        })

        //Delay för att databasen ska hinna uppdateras
        setTimeout(function () { sendRequest() }, 1000);
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
                    <Link to='/' style={{ textDecoration: 'none' }}><h3>Home</h3></Link>
                    <Link to='/competition' style={{ textDecoration: 'none' }}><h3>Battle</h3></Link>
                    <Link to='/gallery' style={{ textDecoration: 'none' }}><h3>Gallery</h3></Link>
                </nav>

                <article className='gallery--info'>
                    <h4>Här kan du lägga till eller ta bort hamstrar från databasen.</h4>
                </article>

                <button className={active ? 'add--btn' : 'hide'} onClick={showAdd}>+</button>

                <article className={active ? 'hide' : 'add--card'}>
                    <h3>Här kan du lägga till din hamster!</h3>
                    <input className={nameTouched ? nameClass : 'untouched'} type="text" placeholder="Name" name="input--name" onChange={e => nameSet(e.target)} />
                    <input className={ageTouched ? ageClass : 'untouched'} type="text" placeholder="Age" name="input--age" onChange={e => ageSet(e.target)} />
                    <input className={lovesTouched ? lovesClass : 'untouched'} type="text" placeholder="Loves" name="input--loves" onChange={e => lovesSet(e.target)} />
                    <input className={foodTouched ? foodClass : 'untouched'} type="text" placeholder="Favourite food" name="input--food" onChange={e => foodSet(e.target)} />
                    <button disabled={!formIsValid} className="submit--btn" onClick={addHamster}>Skicka</button>
                </article>

                <section className='gallery__grid--container'>
                    {hamsters
                        ? hamsters.map(obj => (
                            <HamsterCard handleClick={sendRequest} obj={obj} key={obj.id} />
                        ))
                        : ''}
                </section>
            </main>
        </div>
    )
}

export default Gallery