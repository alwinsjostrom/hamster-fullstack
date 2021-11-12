import { useState } from "react"
import HamsterObj from '../models/hamster';

type Visibility = boolean
type AppProps = {
    handleClick: Function,
    obj: HamsterObj,
    key: string
}

const HamsterCard = (props:AppProps) => {
    const [moreInfo, setMoreInfo] = useState<Visibility | true>(true)

    //Ta bort den valda hamstern från databasen
    const removeHamster = async (hamster: HamsterObj) => {
        //Skicka ett DELETE request med id:t för den valda hamstern
        await fetch("/hamsters/" + hamster.id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        })

        //Uppdatera sidan
        props.handleClick()
    }

    //Visa eller göm info
    const changeVis = () => {
        if (moreInfo === true) {
            setMoreInfo(false)
        } else {
            setMoreInfo(true)
        }
    }

    return (
        <article className='gallery__hamster--card' key={props.obj.id}>
            <figure>
                <img src={'/img/' + props.obj.imgName} alt={props.obj.name} />
            </figure>
            <h2>{props.obj.name}</h2>
            <aside className={moreInfo ? 'hide' : 'gallery__hamster--info'}>
                <h4>{'Ålder: ' + props.obj.age}</h4>
                <h4>{'Älskar: ' + props.obj.loves}</h4>
                <h4>{'Favoritmat: ' + props.obj.favFood}</h4>
                <h4>{'Matcher: ' + props.obj.games}</h4>
                <h4>{'Vinster: ' + props.obj.wins}</h4>
                <h4>{'Förluster: ' + props.obj.defeats}</h4>
            </aside>
            <button onClick={changeVis}>Mer info</button>
            <button onClick={() => removeHamster(props.obj)}>🗑️</button>
        </article>
    )
}

export default HamsterCard