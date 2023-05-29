import { useEffect, useState,useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { Context } from '../ContextStore';
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown, Row } from 'react-bootstrap';
import { getMarketNfts } from '../services/liskProductData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css'
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';
import './Market.css';
import ControlledCarousel from './Carousel'

function Market({ match }) {
    const [landProducts, setLandProducts] = useState([]);
    const [wearableProducts, setWearableProducts] = useState([]);
    const [decorationProducts, setDecorationProducts] = useState([]);
    const [landLoading, setLandLoading] = useState(true);
    const [wearableLoading, setWearableLoading] = useState(true);
    const [decorationLoading, setDecorationLoading] = useState(true);
 
    const [sort, setSort] = useState('lowerPrice');
    const {userData, setUserData} = useContext(Context)

    useEffect(() => {
        setLandLoading(true);
        setWearableLoading(true);
        setDecorationLoading(true);
        getMarketNfts(0)
            .then(res => {
                // console.log("result: " + typeof(res));
                setLandProducts(res);
                setLandLoading(false);
            })
            .catch(err => console.log("Error loading land market: " + err));
        getMarketNfts(1)
            .then(res => {
                // console.log("result: " + res);
                // console.log("result: " + typeof(res));
                setWearableProducts(res);
                setWearableLoading(false);
            })
            .catch(err => console.log(err));
        getMarketNfts(2)
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
        <h3 className='Tredning'>Trending</h3>
        </div>
        
        <ControlledCarousel />
        {(userData)?
        (
            <div className="container">
                {/* <h1 className="categoryHeading"> Market </h1> */}
                <div>
                   

                    <h3 className="categoryName">LAND</h3> <a href="/categories/land/market"><p className="noItems"> See More ...</p> </a>

                    {landLoading ? 
                            <div className="spinner">
                                <Spinner animation="border" />
                            </div>
                        : 
                            <Row>
                            {(landProducts.length == 0) ? <p className="noItems"> No items to display </p> : 
                                landProducts.slice(0, 5).map(x =>
                                         <ProductCard key={x.id} params={x} />
                                )}
                            </Row>
                    }
                </div>
                <div>


                <a href="/categories/wearable/market"> <h3 className="categoryName">WEARABLE</h3><p className="noItems"> See More ...</p> </a>

                    {wearableLoading ? 
                            <div className="spinner">
                                <Spinner animation="border" />
                            </div>
                        : 
                            <Row>
                            {(wearableProducts.length == 0) ? <p className="noItems"> No items to display </p> : 
                                wearableProducts.slice(0, 5).map(x =>
                                    <ProductCard key={x.id} params={x} />
                                )}
                            </Row>
                    }
                </div>
                <div>
                <a href="/categories/decoration/market"> <h3 className="categoryName">Collectibles</h3><p className="noItems"> See More ...</p> </a>
                    {decorationLoading ? 
                            <div className="spinner">
                                <Spinner animation="border" />
                            </div>
                        : 
                            <Row>
                            {decorationProducts.length == 0 ? <p className="noItems"> No items to display </p> : 
                                decorationProducts.slice(0, 5).map(x =>
                                    <ProductCard key={x.id} params={x} />
                                )}
                            </Row>
                    }
                </div>
            </div>
        )
        :(<> </>)
    }
            
        </>
    )
}

export default Market;