import { Link } from 'react-router-dom';
import { useState } from "react";
import '../styles/competition.css'

const Competition = () => {
    return (
        <div className='competition--body'>
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
            </main>
        </div>
    )
}

export default Competition