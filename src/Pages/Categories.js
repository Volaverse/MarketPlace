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
import ToggleSwitch from '../components/Toggle/Toggle';
import { getUserNfts } from '../services/liskProductData';
let userAddress = localStorage.getItem('hexAddress');

function Categories({ match }) {
    let currentCategory = match.params.category;
    let cat=0;
    let page = match.params.page;
    if(!page){
        page='market'
    }
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(false);
    const [sort, setSort] = useState('lowerPrice');

    useEffect(() => {
        setLoading(true);
        switch(currentCategory){
            case "land":
                cat=0;
                break;
            case "wearable":
                cat=1;
                break;
            case "decoration":
                cat=2;
                break;
            default:
                cat=0
        }
        localStorage.setItem('cat',cat)
        if(page=='market'){
            
            getMarketNfts(localStorage.getItem('cat'),toggle)
            .then(res => {
                console.log("result: " + res);
                console.log("result: " + typeof(res));
                setProduct(res);
                setLoading(false);
            })
            .catch(err => console.log(err));
        }
        else if (page=='owner'){

            console.log("cat num is " +cat+ " category is "+currentCategory);
    
            getUserNfts(userAddress,cat)
                .then(res => {
                    console.log("user nft is " +res)
    
                    setProduct(res);
                    setLoading(false);
                    // setQuery("");
                })
                .catch(err => console.log(err));


        }

    }, [currentCategory])

    const handleClick=()=>{
        console.log('Cat is ',localStorage.getItem('cat'))
        console.log('Toggle is clicked')
        console.log('before toggle'+toggle);
        setToggle((prevState)=>{
            console.log('prev state is '+ prevState)
            return !prevState
        })

        console.log('after toggle'+toggle);
    }

    useEffect(()=>{
        console.log('Cat is ',cat)
        getMarketNfts(localStorage.getItem('cat'),toggle)
        .then(res => {
            console.log("result: ",res);
            console.log("result: " + typeof(res));
            setProduct(res);
            setLoading(false);
        })
        .catch(err => console.log(err));
        
    },[toggle])

    const handleToggleClick = (event) => {
        console.log('in handle toggle click')
        event.stopPropagation();
      };
      const handleToggle = (isChecked) => {
        console.log("Toggle is now " + isChecked);
        // Do something else here
      };

    return (
        <>
            {/* <CategoriesNav baseUrl="/market" /> */}
            <div className="container">
                <div className='toogle-switch' onClick={handleClick}>
                <ToggleSwitch
        label="Only for sale"
        isChecked={toggle}
        onToggle={handleToggle}
        onClick={handleToggleClick}
      />
                </div>
            
                <CenterHeading text={currentCategory + " Products " } />
                
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

export default Categories;