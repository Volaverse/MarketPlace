import { Card } from 'react-bootstrap';
// import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import land_img1 from '../../assets/land.png';
import land_img2 from '../../assets/land2.png';
import land_img3 from '../../assets/land3.png';
import land_img4 from '../../assets/land4.png';
import { cryptography,transactions } from "@liskhq/lisk-client";

// import decoration_img1 from '../../assets/table.png';
// import decoration_img2 from '../../assets/table3.png';

// import wearable_img1 from '../../assets/hat1_.png';
// import wearable_img2 from '../../assets/hat2_.png';
// import wearable_img3 from '../../assets/hat3_.png';

function ProductCard({ params }) {
    // console.log(params);
    const user=localStorage.getItem("address");
    let ownerAddressBase32=""
    const get_land_image = () => {
        if(params.imageUrl){
            return params.imageUrl;
        }
        return land_img1;
        // if (i == 1) {
        //     return land_img1;
        // } 
        // else if (i == 3) {
        //     return land_img2;
        // } 
        // else if (i == 4) {
        //     return land_img3;
        // } 
        // else {
        //     return land_img4;
        // }
    }
    // const get_wearable_image = (i) => {
    //     if (i == 0) {
    //         return wearable_img1;
    //     } 
    //     else if (i == 7) {
    //         return wearable_img2;
    //     } 
    //     else {
    //         return wearable_img3;
    //     }
    // }
    // const get_decoration_image = (i) => {
    //     if (i == 1) {
    //         return decoration_img1;
    //     }
    //     else {
    //         return decoration_img2;
    //     }
    // }
    var bgColor;
    if (params.category == "land") bgColor = "white";
    if(params.ownerAddress){
        ownerAddressBase32=cryptography.getBase32AddressFromAddress(Buffer.from(params.ownerAddress, 'hex'), 'lsk').toString('binary');

    }
    else bgColor = '#afabab';
    return (
        <Card style={{backgroundColor: bgColor}}>
            <Link to={`/nft/${params.id}/details`}>
                {<Card.Img variant="top" src={get_land_image()} />}
                {/* {params.category == "wearable" && <Card.Img variant="top" src={get_wearable_image(params.tokenId)} />}
                {params.category == "decoration" && <Card.Img variant="top" src={get_decoration_image(params.tokenId)} />} */}
                <Card.Body>
                    {/* <Card.Title>{params.id.substr(0,6) + "..."}</Card.Title> */}
                    <Card.Title>{params.name}</Card.Title>

                    {/* {params.category == "land" && <Card.Title>{"Vola Land " }</Card.Title>} */}
                    {/* {params.category == "wearable" && <Card.Title>Classic Hat</Card.Title>}
                    {params.category == "decoration" && <Card.Title>Drying Room Table</Card.Title>} */}
                    {/* <Card.Text>Name: {params.name}</Card.Text> */}
                    {params.minPurchaseMargin>0 && ownerAddressBase32==user ?(<Card.Text>On Sale</Card.Text>):(<></>)}
                    {params.minPurchaseMargin>0 && ownerAddressBase32!=user ?(<Card.Text>Buy </Card.Text>):(<></>)}
                    {params.minPurchaseMargin==0 && ownerAddressBase32==user ?(<Card.Text>Sell </Card.Text>):(<></>)}
                    {params.minPurchaseMargin==0 && ownerAddressBase32!=user ?(<Card.Text>Not For Sale </Card.Text>):(<></>)}
                    {params.minPurchaseMargin>0?(<Card.Text>{Number(transactions.convertBeddowsToLSK(params.value))+Number((params.minPurchaseMargin*0.01))} lisk</Card.Text>):(<></>)}
                    {params.minPurchaseMargin==0?(<Card.Text>-- </Card.Text>):(<></>)}

                </Card.Body>
            </Link>
            {/* <Card.Footer>
                <small className="text-muted">
                    <Moment format="d MMM YYYY (dddd) HH:mm">
                        {"0 000 0000 (0000) 00;00"}
                    </Moment>
                </small>
            </Card.Footer> */}
        </Card>
    )
}

export default ProductCard;