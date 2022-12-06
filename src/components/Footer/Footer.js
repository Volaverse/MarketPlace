import './Footer.css';
import { AiFillInstagram, AiFillLinkedin ,AiOutlineTwitter} from 'react-icons/ai'; 
import { FaDiscord,FaTelegramPlane } from "react-icons/fa";

import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

import { FaFacebook } from 'react-icons/fa';

function Footer() {
    return (
        <footer>
            <div className="container">
                <a href="https://www.instagram.com/volaverse/" target="_blank" rel="noopener noreferrer"><AiFillInstagram className="footer-icon"/></a>
                <a href="https://twitter.com/Volaverse" target="_blank" rel="noopener noreferrer"><AiOutlineTwitter className="footer-icon"/></a>
                <a href ="https://www.linkedin.com/company/volaverse/" target="_blank" rel="noopener noreferrer"> <AiFillLinkedin className="footer-icon"/></a>
                <a href="https://discord.gg/uKdeefrV" target="_blank" rel="noopener noreferrer"><FaDiscord className="discord-icon"/></a>
                <a href="https://t.me/Volaverse" target="_blank" rel="noopener noreferrer"><FaTelegramPlane className="footer-icon"/></a>
</div>
<br/>
<div className="container">

We at Volaverse are working towards creating a community driven metaverse on blockchain for Web 3.0 enthusiasts around the globe. To contribute to the flourishing fast growing ecosystem we aim to build a learning, teaching and socializing platform creating a gamified and immersive experience for our users.
            </div>
        </footer >
    )
}

export default Footer;