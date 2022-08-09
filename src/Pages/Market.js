import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown, Row } from 'react-bootstrap';
import { getMarketNfts } from '../services/productData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css'
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';
import './Market.css';

function Market({ match }) {
    const [landProducts, setLandProducts] = useState([]);
    const [wearableProducts, setWearableProducts] = useState([]);
    const [decorationProducts, setDecorationProducts] = useState([]);
    const [landLoading, setLandLoading] = useState(true);
    const [wearableLoading, setWearableLoading] = useState(true);
    const [decorationLoading, setDecorationLoading] = useState(true);
    const [sort, setSort] = useState('lowerPrice');

    useEffect(() => {
        setLandLoading(true);
        setWearableLoading(true);
        setDecorationLoading(true);
        getMarketNfts("land")
            .then(res => {
                // console.log("result: " + res);
                // console.log("result: " + typeof(res));
                setLandProducts(res);
                setLandLoading(false);
            })
            .catch(err => console.log("Error loading land market: " + err));
        getMarketNfts("wearable")
            .then(res => {
                // console.log("result: " + res);
                // console.log("result: " + typeof(res));
                setWearableProducts(res);
                setWearableLoading(false);
            })
            .catch(err => console.log(err));
        getMarketNfts("decoration")
            .then(res => {
                // console.log("result: " + res);
                // console.log("result: " + typeof(res));
                setDecorationProducts(res);
                setDecorationLoading(false);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <div className="container">
                <h1 style={{color:"white", textAlign: "center"}}> Market </h1>
                <div>
                    <a href="/market/land"> <h3 className="categoryName">LAND</h3> <p className="noItems"> See More ...</p> </a>
                    {landLoading ? 
                            <div className="spinner">
                                <Spinner animation="border" />
                            </div>
                        : 
                            <Row>
                            {(landProducts.length == 0) ? <p className="noItems"> No items to display </p> : 
                                landProducts.map(x =>
                                         <ProductCard params={x} />
                                )}
                            </Row>
                    }
                </div>
                <div>
                <a href="/market/wearable"> <h3 className="categoryName">WEARABLE</h3><p className="noItems"> See More ...</p> </a>
                    {landLoading ? 
                            <div className="spinner">
                                <Spinner animation="border" />
                            </div>
                        : 
                            <Row>
                            {(wearableProducts.length == 0) ? <p className="noItems"> No items to display </p> : 
                                wearableProducts.map(x =>
                                    <ProductCard params={x} />
                                )}
                            </Row>
                    }
                </div>
                <div>
                <a href="/market/decoration"> <h3 className="categoryName">DECORATION</h3><p className="noItems"> See More ...</p> </a>
                    {landLoading ? 
                            <div className="spinner">
                                <Spinner animation="border" />
                            </div>
                        : 
                            <Row>
                            {decorationProducts.length == 0 ? <p className="noItems"> No items to display </p> : 
                                decorationProducts.map(x =>
                                    <ProductCard params={x} />
                                )}
                            </Row>
                    }
                </div>
            </div>
        </>
    )
}

export default Market;