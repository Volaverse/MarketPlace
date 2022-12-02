import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css'
import { BsHouseDoorFill, BsFillHouseFill, BsFillPuzzleFill } from 'react-icons/bs'
import { AiFillCar } from 'react-icons/ai';
import { GiFlowerPot, GiClothes } from 'react-icons/gi';
import { TiSortAlphabetically } from 'react-icons/ti';
import { MdPhoneAndroid } from 'react-icons/md'

function CategoriesNav(params) {
    return (
        <div className="container" id="categories">
            <Link to={params.baseUrl + "/land"}>
                <Button variant="dark" id="properties"><BsHouseDoorFill />Land</Button>{' '}
            </Link>
            {/* <Link to={params.baseUrl + "/wearable"}>
                <Button variant="dark" id="clothes"><GiClothes />Wearables</Button>{' '}
            </Link>
            <Link to={params.baseUrl + "/decoration"}>
                <Button variant="dark" id="garden"><GiFlowerPot />Decoration</Button>{' '}
            </Link> */}
        </div>
    )
}

export default CategoriesNav;