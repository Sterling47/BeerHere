import {React} from 'react'
import { Link } from 'react-router-dom'
import '/src/Components/NavBar/Navbar.css'
import beerLogo from '/src/assets/beerherelogo.png'

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div>
            <Link to='/'><img className='logo' src={beerLogo}/></Link>
            </div>
           <Link className='bttn' to='/AllBreweries'>All Breweries</Link>
        </nav>
    )
}

export default NavBar