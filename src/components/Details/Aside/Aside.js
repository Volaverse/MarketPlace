import { useState, useContext, useEffect } from 'react';
import { Context } from '../../../ContextStore';
import { Button, Modal, Form, OverlayTrigger, Tooltip, Col, Spinner} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {checkIfWalletIsConnected2} from '../../../services/userData'
import { getApproval, setApproval, startSale, closeSale, buyProduct } from '../../../services/productData';
import './Aside.css';

import styled from 'styled-components';

const Text = styled.p`
    color : #E7E6E6;
`;

const H4 = styled.h4`
    color : #E7E6E6;
`

function Aside({ params, history }) {
    let owner = params.owner;
    let onSale = params.onSale;
    let givenPrice = params.price;   
    let contractAddress = params.contractAddress;
    let ipfsHash = params.ipfsHash;
    let tokenId = params.tokenId;

    const [price, setPrice] = useState(0);
    const [approved, setApproved] = useState(null);
    const [userData, setUserData] = useState({
        address: "",
        isAuth: false,
        isOwner: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("params inside useeffect:", params);
        if (params.length == 0) return;
        checkIfWalletIsConnected2()
            .then(res => {
                console.log("res: ", res);
                if (!params) {
                    setLoading(true);
                }
                else {
                    setUserData({
                        address: res,
                        isAuth: res != null && res != "",
                        isOwner: res == owner,
                        onSale: onSale
                    });
                    setPrice(givenPrice);
                    if (res) setLoading(false);
                }
                if (res != "") {
                    console.log("here address: ", res);
                    getApproval(contractAddress, ipfsHash, res)
                    .then(res2 => {
                        console.log("approved: ", res2);
                        setApproved(res2);
                    })
                    .catch(err => console.log(err));
                }

            })
            .catch(err => console.log(err));
        console.log("aside se bhai2:");

    }, [params]);

    const handlePriceChange = (event) => {
        event.preventDefault();
        setPrice(event.target.value);
    }

    const handleStartSale = (event) => {
        event.preventDefault();
        console.log("helllo");
        startSale(contractAddress, tokenId, price)
        .then(res => {
            console.log("post startSale: ", res);
        })
        .catch(err => console.log(err));
    }

    const handleCloseSale = (event) => {
        event.preventDefault();
        console.log("helllo");
        closeSale(contractAddress, tokenId)
        .then(res => {
            console.log("post closeSale: ", res);
        })
        .catch(err => console.log(err));
    }

    const handleBuy = (event) => {
        event.preventDefault();
        console.log("helllo from buy");
        buyProduct(contractAddress, tokenId, givenPrice)
        .then(res => {
            console.log("post buy: ", res);
        })
        .catch(err => console.log(err));
    }

    const handlePermChange = (event) => {
        event.preventDefault();
        console.log("helllo:",approved);
        setApproval(contractAddress, ipfsHash, !approved)
        .then(res => {
            console.log("post setApproved: ", res);
        })
        .catch(err => console.log(err));
    }

    console.log("userData: ", userData);

    const handleTodoButton = () => {};

    return (
        <div>
        {loading ? (<Spinner animation="border" />) :
        (<aside>
            <div className="product-details-seller">
                <div id="priceLabel" className="col-lg-12">
                    {userData.isAuth && <div> 
                        <H4 style={{color:"#E7E6E6"}}> Permission </H4>
                        {approved == null && <Text> loading permissions ...</Text>}
                        {approved == true && <Text> Volaverse has permission to manage this asset for you. This is necessary if you want to buy / sell it via volaverse. Click here if you no longer want volaverse to have this permission </Text>}
                        {approved == false && <Text> Volaverse needs permission to manage this asset for you. This is necessary if you want to buy / sell it via volaverse. Click here to grant volaverse this permission </Text>}
                        
                        {approved == true && <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handlePermChange}>
                                Disallow
                            </Button>
                        }
                            
                        {approved == false && <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handlePermChange}>
                                Allow
                            </Button>
                        }                      
                        </div>
                    }
                    {userData.onSale && <H4 id="product-price-heading"> On Sale </H4>}
                    {!userData.onSale && <H4 id="product-price-heading"> Not on Sale </H4>}
                    {/* {userData.isOwner && userData.onSale &&
                        <>
                            <OverlayTrigger placement="top" overlay={<Tooltip>Edit the selling</Tooltip>}>
                                <span id="edit-icon">
                                    <Link to={`/categories/land/${params.tokenId}/edit`}><GrEdit /></Link>
                                </span>
                            </OverlayTrigger>
                        </>
                    } */}
                    {userData.onSale && <H4 id="price-heading">{price} weth</H4>}
                </div>
                {userData.isAuth ? (<>
                    {!userData.isOwner && userData.onSale &&
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleBuy}>
                            Buy
                        </Button>
                    }
                    {userData.isOwner && userData.onSale &&
                        <div>
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleCloseSale}>
                            Remove Sale
                        </Button>
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleTodoButton}>
                            Update Sale
                        </Button>
                        </div>
                    }
                    {userData.isOwner && !userData.onSale &&
                        <div>
                        <form className="col-lg-12">
                        <label>
                            {/* {alertShow &&
                                <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                                    <p>
                                        {error}
                                    </p>
                                </Alert>
                            } */}
                            <Text> <input type="text" name="price" value={price} onChange={handlePriceChange} required /> weth </Text>
                        </label>
                        </form>
                        <Button variant="dark" className="col-lg-10" id="btnContact" onClick={handleStartSale}>
                            Start Sale
                        </Button>
                        </div>
                    }
                </>) : (
                        <p id="guest-msg"><Link to="/auth/login">Sign In</Link> now to buy the NFT</p>
                    )}
            </div>
            {/* <Modal show={showMsg} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" name="textarea" onChange={handleMsgChange} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={onMsgSent}>Sent</Button>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal> */}

            {/* <Modal show={showArchive} onHide={handleCloseArchive}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to archive this item?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        By clicking <strong>Archive</strong>, this sell will change
                    it's status to <strong>Archived</strong>,
                    which means that no one but you will be able see it.
                    You may want to change the status to <strong>Actived</strong> if you have
                    sold the item or you don't want to sell it anymore.
                    </p>

                    Don't worry, you can unarchive it at any time from Profile - Sells!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseArchive}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Archive
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </aside>)}
        </div>
    )
}

export default Aside;