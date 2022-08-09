import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown } from 'react-bootstrap';
import { getUserNfts } from '../services/productData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css';
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';
import CenterHeading from '../components/CenterHeading/CenterHeading';

function Owned({ match }) {
    let currentCategory = match.params.category;
    let tempid = match.params.publicAddress;
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('lowerPrice');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setLoading(true);
        
        if (!tempid) return;
        getUserNfts(tempid, currentCategory)
            .then(res => {
                // console.log("params: ", match.params);
                setProduct(res);
                setLoading(false);
                // setQuery("");
            })
            .catch(err => console.log(err));
    }, [currentCategory, tempid])

    useEffect(() => {
        console.log("id:",tempid);
        setUserData(tempid);
    }, [tempid]);

    const handleSearch = (e) => {
        e.preventDefault()
    }
    // console.log("userData:", userData);
    return (
        <>
            <CenterHeading text={"My Nfts"} />
            <CategoriesNav baseUrl={"/owned/" + userData} />
            <div className="container">
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
                        // next={() => {
                        //         getLands()
                        //             .then(res => {
                        //                 setProduct([...products, ...res]);
                        //             })
                        // }}
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

export default Owned;