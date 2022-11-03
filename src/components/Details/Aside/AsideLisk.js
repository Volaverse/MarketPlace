import { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, OverlayTrigger, Tooltip, Col, Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cryptography,transactions } from "@liskhq/lisk-client";
import {fetchNodeInfo, purchaseNFTToken, sellNFTToken, sendTransactions} from '../../../services/liskProductData';
import { NodeInfoContext,nodeInfoContextDefaultValue } from '../../../ContextStore';
import './Aside.css';

import styled from 'styled-components';

const Text = styled.p`
    color : #E7E6E6;
`;

const H4 = styled.h4`
    color : #E7E6E6;
`
const H5 = styled.h5`
    color : #E7E6E6;
`
const H6 = styled.h6`
    color : #E7E6E6;
`

function AsideLisk({ params, history }) {
    let user = localStorage.getItem("address");
    let onSale = params.minPurchaseMargin==0?false:true;
    let name=params.name;
    // let contractAddress = params.contractAddress;
    // let ipfsHash = params.ipfsHash;
    let imageUrl=params.imageUrl;
    let ownerAddressBase32="";
    let basePrice=params.value;
    const [fee,setFee]=useState("");
    const [purchaseValue,setPurchaseValue]=useState("");
    const nodeInfo = useContext(NodeInfoContext);
    const [data, setData] = useState({
        name: "",
        nftId: "",
        purchaseValue: "",
        fee: "",
        passphrase: "",
      });
    const [sellData, setSellData] = useState({
        name: "",
        nftId: "",
        minPurchaseMargin:null,
        fee: "",
        passphrase: "",
      });
      let pass="";
      const [nodeInfoState, updateNodeInfoState] = useState(
		nodeInfoContextDefaultValue,
	);

    let price= 0;


    if(params.ownerAddress){
        ownerAddressBase32=cryptography.getBase32AddressFromAddress(Buffer.from(params.ownerAddress, 'hex'), 'lsk').toString('binary');
        // console.log(ownerAddressBase32);
        // console.log(user);
        price=Number(transactions.convertBeddowsToLSK(params.value))+(Number((params.minPurchaseMargin*0.01)));
        basePrice=Number(transactions.convertBeddowsToLSK(params.value));

    }
    
    const [loading, setLoading] = useState(false);

    const validatePassphrase=(str)=>{
        if (str.trim().split(" ").length != 12) {
            return false;
        }else{
            return true;
        }
    }
    
	const updateHeight = async () => {
		const info = await fetchNodeInfo();
		updateNodeInfoState({
			networkIdentifier: info.networkIdentifier,
			minFeePerByte: info.genesisConfig.minFeePerByte,
			height: info.height,
		});
	};

    useEffect(() => {
        async function fetchData() {
          const info = await fetchNodeInfo();
          updateNodeInfoState({
            networkIdentifier: info.networkIdentifier,
            minFeePerByte: info.genesisConfig.minFeePerByte,
            height: info.height,
          });
          setInterval(updateHeight, 3000);
        }
        fetchData();
      }, []);
   

    const handlePriceChange = (event) => {
    //     event.preventDefault();
    //     setPrice(event.target.value);
    }

    const handleStartSale = async (event) => {
        event.preventDefault();
        try{
        setLoading(true);
        console.log(sellData);
        if(!validatePassphrase(sellData.passphrase)){
            setLoading(false);
            alert("Invalid Password");
            return;
        }
       
        sellData.name=params.name;
        sellData.nftId=params.id;
        // console.log(sellData)
        const info = await fetchNodeInfo();

        const res = await sellNFTToken({
            ...sellData,
            networkIdentifier: info.networkIdentifier,
            minFeePerByte: info.genesisConfig.minFeePerByte,
          });
          const response=await sendTransactions(res.tx);
          setLoading(false);

          if(response.transactionId){
              alert("Transaction successful,Transaction will be updated soon");
          }else{
            alert("Something went wrong!");
          }

          window.location.reload();
        }
        catch{
            setLoading(false);
            alert("Something went wrong");
        }

    }

    const handleCloseSale = (event) => {
    //     event.preventDefault();
    //     console.log("helllo");
    //     closeSale(contractAddress, tokenId)
    //     .then(res => {
    //         console.log("post closeSale: ", res);
    //     })
    //     .catch(err => console.log(err));
    }

    const handleBuy = async (event) => {
        event.preventDefault();
        try{
            setLoading(true);
            if(!validatePassphrase(data.passphrase)){
                setLoading(false);
                alert("Invalid Password");
                return;
            }
        const info = await fetchNodeInfo();
        data.name=params.name;
        data.nftId=params.id;
        data.fee=fee;
        data.purchaseValue=purchaseValue;
        console.log(data);
        const res = await purchaseNFTToken({
            ...data,
            networkIdentifier: info.networkIdentifier,
            minFeePerByte: info.genesisConfig.minFeePerByte,
        });
        const response=await sendTransactions(res.tx);

        setLoading(false);

        if(response.transactionId){
            alert("Transaction successful,Transaction will be updated soon");
        }else{
          alert("Something went wrong!");
        }
        window.location.reload();
    }catch{
        alert("Something went wrong!");
        setLoading(false);

    }
   }

    const handlePermChange = (event) => {
    //     event.preventDefault();
    //     console.log("helllo:",approved);
    //     setApproval(contractAddress, ipfsHash, !approved)
    //     .then(res => {
    //         console.log("post setApproved: ", res);
    //     })
    //     .catch(err => console.log(err));
    }

    // console.log("userData: ", params);

    const handleTodoButton = () => {};

    return (
        <div>
        {loading ? (<Spinner animation="border" />) :
        (<aside>
            <div className="product-details-seller">
                <div id="priceLabel" className="col-lg-12">
                    {onSale && <H4 id="product-price-heading"> On Sale </H4>}
                    {!onSale && <H4 id="product-price-heading"> Not on Sale </H4>}
                    {onSale && <H4 id="price-heading">{price} lsk</H4>}
                </div>
                {user ? (<>
                    {!(ownerAddressBase32==user) && onSale &&
                    <>
                    <Form className="col-lg-6" onSubmit={handleBuy}>

                        <input type="text" name="passphrase" placeholder='Enter Passphrase (12 words)' value={data.passphrase} onChange={(text)=>{
                            setData({ ...data, [text.target.name]: text.target.value });
                        }} required />
                        <input type="number" name="purchaseValue" placeholder='Enter Price (>value)' value={purchaseValue} onChange={(text)=>{
                            setPurchaseValue(text.target.value);
                            // setData({ ...data, [text.target.name]: text.target.value });
                        }} required />
                        <input type="number" name="fee" placeholder='Enter Fee (>0)' value={fee} onChange={(text)=>{
                            // setData({ ...data, [text.target.name]: (text.target.value) });
                            setFee(text.target.value);
                        }} required />
                        <Button variant="dark" className="col-lg-10" id="btnContact" type="Submit">

                            Buy
                        </Button>
                    </Form>
                    </>
                    }
                    {(ownerAddressBase32==user) && onSale &&
                        <div>
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleCloseSale}>
                            Remove Sale(...coming soon)
                        </Button>
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleTodoButton}>
                            Update Sale(...coming soon)
                        </Button>
                        </div>
                    }
                    {(ownerAddressBase32==user) && !onSale &&
                        <div>
                        <Form className="col-lg-12" onSubmit={handleStartSale}>
                        <div id="priceLabel" className="col-lg-12">
                   <H5 id="product-price-heading"> Purchase Value: {basePrice} lsk</H5>
                </div>
                            <br/>
                            <input type="number" name="minPurchaseMargin" placeholder='Minimum Margin (%)' value={sellData.minPurchaseMargin} onChange={(text)=>{
                            setSellData({ ...sellData, [text.target.name]: text.target.value });
                        }} required />
                        <br/>
                       

                        <H6 id="product-price-heading"> Sell Value: {Number(basePrice)+Number(sellData.minPurchaseMargin*0.01*basePrice)} lsk</H6>

                            <input type="text" name="fee" placeholder='Fee (>0) lsk' value={sellData.fee} onChange={(text)=>{
                                setSellData({ ...sellData, [text.target.name]: text.target.value });
                            }} required />
                            <br/>

                            <input type="text" name="passphrase" placeholder='Passphrase (12 words)' value={sellData.passphrase} onChange={(text)=>{
                                pass=text.target.value;
                                setSellData({ ...sellData, [text.target.name]: text.target.value });
                            }} required />
                            <br/>
                            <br/>
                            {/* <Text> <input type="text" name="price" value={basePrice} onChange={handlePriceChange} required /> lsk </Text> */}

                        <Button variant="dark" className="col-lg-10" id="btnContact" type="submit">
                            Start Sale
                        </Button>
                        </Form>
                        </div>
                    }
                </>) : (
                        <p id="guest-msg"><Link to="/auth/login">Sign In</Link> now to buy the NFT</p>
                    )}
            </div>
        </aside>)}
        </div>
    )
}

export default AsideLisk;