import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
// import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown } from 'react-bootstrap';
import { getMarketNfts } from '../services/liskProductData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css'
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';
import CenterHeading from '../components/CenterHeading/CenterHeading';


function Categories({ match }) {
    let currentCategory = match.params.category;
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('lowerPrice');

    useEffect(() => {
        setLoading(true);
        getMarketNfts(currentCategory)
            .then(res => {
                console.log("result: " + res);
                console.log("result: " + typeof(res));
                setProduct(res);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [currentCategory])

    return (
        <>
            {/* <CategoriesNav baseUrl="/market" /> */}
            <div className="container">
                <CenterHeading text={currentCategory + " Products "} />
                {/* <Dropdown id="dropdown-sort">
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Sort <BiSort />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setSort('oldest') }}>Oldest <BiDownArrowAlt /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('newest') }}>Newest <BiUpArrowAlt /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('lowerPrice') }}>Price <BiSortDown /></Dropdown.Item>
                        <Dropdown.Item onClick={() => { setSort('biggerPrice') }}>Price <BiSortUp /> </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                {!loading ?
                    <InfiniteScroll
                        dataLength={products.length}
                        hasMore={() => {
                         return false;
                        }}
                        className="row">
                        {products
                            // .sort((a, b) => {
                            //     // if (sort === "oldest") {
                            //     //     return a.addedAt.localeCompare(b.addedAt)
                            //     // }
                            //     // if (sort === "newest") {
                            //     //     return b.addedAt.localeCompare(a.addedAt)
                            //     // }
                            //     if (sort === "lowerPrice") {
                            //         return b[2] - a[2]
                            //     }
                            //     if (sort === "biggerPrice") {
                            //         return a[2] - b[2]
                            //     }
                            // })
                            .map(x =>
                                    <ProductCard params={x} />
                            )}
                    </InfiniteScroll>
                    : <div className="spinner">
                        <Spinner animation="border" />
                    </div>
                }
            </div>
        </>
    )
}

export default Categories;