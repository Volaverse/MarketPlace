import { useContext, useEffect,useState } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, NavDropdown, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { fetchAccountInfo } from '../../services/liskUserData';
import './Header.css'
import logo from '../../assets/logo_without_bg.png'

import { VscAccount } from 'react-icons/vsc';

function Header() {
    const {userData, setUserData} = useContext(Context)
    const [loggedIn,setLoggedIn]=useState(false)
    const [balance,setBalance]=useState("");

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
    return (
        <Navbar className="color-nav" collapseOnSelect>
            <div className="container">
                <Navbar.Brand>
                <NavLink className="navbar-brand" to="/"><img src={logo} className="brand-logo"/></NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className='Navbar-align'>
                    <Nav className="mr-auto Nav-align">
                        <NavLink to={{pathname: "https://www.volaverse.com/#about-us"}} target="_blank" className="headNav" id="about">About-us</NavLink>
                        <NavLink to={{pathname: "https://www.volaverse.com/#about-us"}} target="_blank" className="headNav">VolaBuild</NavLink>
                        <NavLink to={{pathname: "https://www.volaverse.com/#roadmap"}} target="_blank" className="headNav">Roadmap</NavLink>
                        <NavLink to={{pathname: "https://uploads-ssl.webflow.com/62541216f5af5bb26d69f95b/62ed514f2433bd09e3d19f93_Volaverse-The%20Education%20Metaverse.pdf"}} target="_blank" className="headNav">Docs</NavLink> 
                        <NavLink to={{pathname: "https://www.volaverse.com/#Team"}} target="_blank" className="headNav">Our Team</NavLink>
                        <NavLink to={{pathname: "https://www.volaverse.com/#FAQ"}} target="_blank" className="headNav">FAQ</NavLink>
                        <NavLink to={{pathname: "https://www.volaverse.com/#roadmap"}} target="_blank" className="headNav">Community</NavLink>
                        <NavLink to={{pathname: "https://www.volaverse.com/blogs"}} target="_blank" className="headNav">Blogs</NavLink>
                    </Nav>
                    {console.log(loggedIn)}

                    {(userData)?
                        (<Nav>
                            
                            <NavLink style={{margin:3}}  id="collasible-nav-dropdown" to={`/owned/${userData}/land`}>
                            {<VscAccount className='account-icon'/>}
                            </NavLink>
                            {/* //to={`/owned/${userData}/land`} */}
                            {/* <NavDropdown onClick={() => {navigator.clipboard.writeText(userData)}}  title={<span className="titleName">{userData.substr(0,6) + "..." + userData.substr(-5,5)}</span>} drop="left" id="collasible-nav-dropdown">
                                <NavLink className="dropdown-item" onClick={()=>{console.log("myAsset clicked")}}  to={`/owned/${userData}/land`}>
                                    <BsFillPersonFill /> My Assets
                                </NavLink>
                                <NavDropdown.Divider />
                            </NavDropdown> */}
                            {/* <NavLink style={{margin:3}} className="nav-item" id="nav-sign-in" to="/auth/funds">
                                Funds
                            </NavLink> */}
                          
                            <NavLink style={{margin:3}} className="nav-item" id="nav-sign-in" to="/auth/logout">
                                Logout
                            </NavLink>
                        </Nav>)
                        :
                        (<Nav >
                            <NavLink style={{margin:3}} className="nav-item" id="nav-sign-in" to="/auth/login">
                                Login
                            </NavLink>
                            <NavLink style={{margin:3}} className="nav-item" id="nav-sign-in" to="/auth/signup">
                                Sign Up
                            </NavLink>
                        </Nav>)
                    }
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;