import {React} from 'react'
import { Link } from 'react-router-dom'
import '/src/Components/NavBar/Navbar.css'
const NavBar = () => {
    return (
        <nav>
            <div>
            <Link to='/'>BEERHERE</Link>
            </div>
           <Link to='/AllBreweries'>All Breweries</Link>
           <Link to='/aboutMe'>Contributor</Link>
        </nav>
    )
}

export default NavBar