import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import CategoriesNav from '../components/Categories/CategoriesNav'
import ProductCard from '../components/ProductCard/ProductCard';
import { Col, Spinner, Dropdown ,Button} from 'react-bootstrap';
import { getUserNfts } from '../services/liskProductData';
import { BiSortDown, BiSort, BiDownArrowAlt, BiUpArrowAlt, BiSortUp } from 'react-icons/bi'
import '../components/Siders/SearchSider.css';
import '../components/Categories/Categories.css';
import '../components/ProductCard/ProductCard.css';
import './Owned.css';
import {fetchAccountInfo} from '../services/liskUserData'
import CenterHeading from '../components/CenterHeading/CenterHeading';
import { transactions } from "@liskhq/lisk-client";
import { Link } from 'react-router-dom';

function Owned({ match }) {
    let currentCategory = match.params.category;
    console.log("category is "+ currentCategory)
    let userAddress = localStorage.getItem('hexAddress');
    let displayAddress = localStorage.getItem('address')
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState('lowerPrice');
    const [userData, setUserData] = useState(null);
    const [balance,setBalance]=useState("0");
    let cat;
    useEffect(() => {
        setLoading(true);
        console.log("userAddress is " +userAddress)
        
        if (!userAddress) return;
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
        console.log("cat num is " +cat+ " catefory is "+currentCategory);

        getUserNfts(userAddress,cat)
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

    useEffect(() => {

        async function fetchAccountDetails(){
            const res=await fetchAccountInfo(localStorage.getItem("hexAddress"));
            // console.log(localStorage.getItem("address").toString("hex"));
            // console.log(res.token.balance);
            if(res){
                setBalance(Number(transactions.convertBeddowsToLSK(res.token.balance)));
            }
            
        }
        if(localStorage.getItem("hexAddress")){
            fetchAccountDetails();
        }
      }, []);

    const handleSearch = (e) => {
        e.preventDefault()
    }


    
    // console.log("userData:", userData);
    return (
        <>
            <CenterHeading text={"My Account"} />
            <></>

            <div className="user-details">
            <h2 className="address-text">Address : {displayAddress}</h2>
            <Link to={"/auth/funds"}>
                <Button variant="dark" id="properties" className='Fund-btn'>Add Faucet</Button>
            </Link>
            </div>
            <div>
            <h2 className="funds-text">Balance : {balance}</h2>
            </div>

            
            <CategoriesNav baseUrl={"/owned/" + userData} />
            
            <div className="container">
            { products.length!=0 && <a href={"/categories/"+currentCategory+"/owner"}> <p className="noItems"> See More ...</p> </a> }
             
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
                        { products.length==0 && <div className='no-nft'>NO NFT PURCHASED</div> }
                        {products.slice(0, 5)

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