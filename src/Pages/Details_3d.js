import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb';
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
// import Aside from '../components/Details/Aside/Aside';
import AsideLisk from '../components/Details/Aside/AsideLisk';
import {  getMarketNftsByID } from '../services/liskProductData'
import { cryptography } from "@liskhq/lisk-client";

import '../components/Details/ProductInfo/ProductInfo.css';
import '../components/Details/Aside/Aside.css';
import ThreeScene from '../components/ThreeScene/ThreeScene';


function DetailsThree({ match, history }) {
    let tokenId = match.params.tokenId;
    // let contractAddress = match.params.contractAddress;
    let [product, setProduct] = useState([])
    let [loading, setLoading] = useState(true);

   
    useEffect(() => {
        window.scrollTo(0, 0);
        if (tokenId) {
            getMarketNftsByID(tokenId)
                .then(res => {if (res) setProduct(res); console.log("hey;", res)})
                // .then(
                //     console.log(cryptography.getBase32AddressFromAddress(Buffer.from(product.ownerAddress, 'hex'), 'lsk').toString('binary'))

                // )
                .catch(err => console.log("hey1 " + err));
        }
        else {
            console.log("Params half loaded: ", tokenId);
        }
            
    }, [tokenId])


    useEffect(() => { 
        if (product != []) {
            setLoading(false);
        }   
    }, [product]);
    
    return (
        <>
            <div className="container">
                {!loading ? (
                    <>
                    {/* <Breadcrumb params={product} /> */}
                    <Row>
                        <Col lg={8} id="detailsProduct">
                            <ProductInfo params={product} />
                        </Col>
                        <Col lg={4}>
                            <AsideLisk params={product} history={history} />
                        </Col>
                    </Row></>) : (<Spinner animation="border" />)}
            </div>




        </>
    )
}

export default DetailsThree;