import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import SimpleSider from '../components/Siders/SimpleSider';
import Breadcrumb from '../components/Details/Breadcrumb';
import ProductInfo from '../components/Details/ProductInfo/ProductInfo';
import Aside from '../components/Details/Aside/Aside';
import { getSpecific } from '../services/productData'

import '../components/Details/ProductInfo/ProductInfo.css';
import '../components/Details/Aside/Aside.css';

function Details({ match, history }) {
    let tokenId = match.params.tokenId;
    let contractAddress = match.params.contractAddress;
    let [product, setProduct] = useState([])
    let [loading, setLoading] = useState(true);
   
    useEffect(() => {
        window.scrollTo(0, 0);
        if (contractAddress && tokenId) {
            getSpecific(contractAddress, tokenId)
                .then(res => {if (res) setProduct(res); console.log("hey;", res)})
                .catch(err => console.log("hey1 " + err));
        }
        else {
            console.log("Params half loaded: ", contractAddress, tokenId);
        }
            
    }, [tokenId, contractAddress])

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
                    <Breadcrumb params={product} />
                    <Row>
                        <Col lg={8} id="detailsProduct">
                            <ProductInfo params={product} />
                        </Col>
                        <Col lg={4}>
                            <Aside params={product} history={history} />
                        </Col>
                    </Row></>) : (<Spinner animation="border" />)}
            </div>
        </>
    )
}

export default Details;