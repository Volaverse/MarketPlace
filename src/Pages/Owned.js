import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown } from 'react-bootstrap';
import { getUserNfts } from '../services/liskProductData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css';
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';
import CenterHeading from '../components/CenterHeading/CenterHeading';

function Owned({ match }) {
    let currentCategory = match.params.category;
    console.log("category is "+ currentCategory)
    let userAddress = localStorage.getItem('hexAddress');
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('lowerPrice');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        setLoading(true);
        console.log("userAddress is " +userAddress)
        
        if (!userAddress) return;
        getUserNfts(userAddress,"land")
            .then(res => {
                console.log("user nft is " +res)

                setProduct(res);
                setLoading(false);
                // setQuery("");
            })
            .catch(err => console.log(err));
    }, [currentCategory, userAddress])

    useEffect(() => {
        console.log("id:",userAddress);
        setUserData(userAddress);
    }, [userAddress]);

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
                                <ProductCard key={x.id} params={x} />
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