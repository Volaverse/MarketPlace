import { useContext, useEffect,useState } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, NavDropdown, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPlusCircleFill } from 'react-icons/bs';
import './Header.css'
import logo from '../../assets/logo_without_bg.png'

function Header() {
    const {userData, setUserData} = useContext(Context)
    const [loggedIn,setLoggedIn]=useState(false)

    useEffect(() => {
        if(localStorage.getItem("address")){
            {console.log(localStorage.getItem("address"))}
            setUserData(localStorage.getItem("address"));
            setLoggedIn(true);
        }
    }, []);

    // if(localStorage.getItem("passphrase")!=0){
    //     setLoggedIn(true);
    //     setUserData(localStorage.getItem("passphrase"));
    // }
    
    console.log("header se bhai", userData);
    return (
        <Navbar className="color-nav" collapseOnSelect>
            <div className="container">
                <Navbar.Brand>
                <NavLink className="navbar-brand" to="/"><img src={logo} className="brand-logo"/></NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {console.log(loggedIn)}

                    {(userData)?
                        (<Nav>
                            <NavDropdown title={<span className="titleName">{userData.substr(0,6) + "..." + userData.substr(-5,5)}</span>} drop="left" id="collasible-nav-dropdown">
                                <NavLink className="dropdown-item" to={`/owned/${userData}/land`}>
                                    <BsFillPersonFill />My Assets
                                </NavLink>
                                <NavDropdown.Divider />
                            </NavDropdown>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/logout">
                                Logout
                            </NavLink>
                        </Nav>)
                        :
                        (<Nav>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                                Login
                            </NavLink>
                        </Nav>)
                    }
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;