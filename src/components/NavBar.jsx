import { useNavigate, useLocation } from "react-router-dom";
import {ReactComponent as SellersIcon} from "../assets/svg/localOfferIcon.svg";
import {ReactComponent as FindIcon} from "../assets/svg/exploreIcon.svg";
import {ReactComponent as PersonOutlineIcon} from "../assets/svg/personOutlineIcon.svg";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const activeNavBarElement = (route) => {
        if (route === location.pathname) {
            return true;
        }
    }

    return(
        <footer className='navbar'>
            <nav className='navbarNav'>
                <ul className='navbarListItems'>
                    <li className='navbarListItem' onClick={() => navigate('/')}>
                        <FindIcon fill={activeNavBarElement('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                        <p className={activeNavBarElement('/') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Find</p>
                    </li>
                    <li className='navbarListItem' onClick={() => navigate('/sellers')}>
                        <SellersIcon fill={activeNavBarElement('/sellers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                        <p className={activeNavBarElement('/sellers') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Sellers</p>
                    </li>
                    <li className='navbarListItem' onClick={() => navigate('/profile')}>
                        <PersonOutlineIcon fill={activeNavBarElement('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px'/>
                        <p className={activeNavBarElement('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName' }>Profile</p>
                    </li>
                </ul>
            </nav>
        </footer>
    )

}

export default NavBar;
