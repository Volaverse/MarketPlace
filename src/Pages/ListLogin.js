import { useState, useContext, useEffect } from 'react';
import { Context } from '../ContextStore';
import { connect, getAddress } from '../services/userData'
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleSider from '../components/Siders/SimpleSider';
import { passphrase, cryptography } from "@liskhq/lisk-client";

function ListLogin({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState("");
    const [password,setPassword]=useState("");
    // const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()
    const { setUserData } = useContext(Context)

    
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("heyyy");
        const { publicKey } = cryptography.getPrivateAndPublicKeyFromPassphrase(
            password
          );

        console.log("here");
        const address = cryptography.getAddressFromPassphrase(password).toString("hex");
        // console.log(publicKey);
        console.log(address);
        setAddress(address);
        setLoading(false);
        if(address){
            const base32UIAddress = cryptography.getBase32AddressFromAddress(Buffer.from(address, 'hex'), 'lsk').toString('binary');
            console.log("ui address is "+base32UIAddress);
            localStorage.setItem('passphrase',base32UIAddress);
            // setUserData(base32UIAddress.toString());
            history.push('/');
            window.location.reload();
        }
    }

    return (
        <>
            <div className="container auth-form">
                <h1 className="auth-heading" style={{color:"white"}}>Sign In</h1>
                <Form className="col-lg-6" onSubmit={handleSubmitLogin}>
                    {alertShow &&
                        <Alert variant="danger" onClose={() => setAlertShow(false)} dismissible>
                            <p>
                                {error}
                            </p>
                        </Alert>
                    }
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <>
                <h5 className="auth-heading" style={{color:"white"}}>Enter Lisk passphrase</h5>

                <Form.Group className="mb-3" controlId="LiskPassphrase">
                    <Form.Label>Passphrase</Form.Label>
                    <Form.Control type="text" value={password} placeholder="12 word password" onChange={(text)=>{
                        setPassword(text.target.value);
                    }}/>
                    <br/>
                </Form.Group>


                <Button variant="dark" className="col-lg-12 btnAuth" type="submit">
                    Connect To Lisk
                </Button>
                        </>
                    }
                </Form>
            </div>
        </>
    )
}

export default ListLogin;