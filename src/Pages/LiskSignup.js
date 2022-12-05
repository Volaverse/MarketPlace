import { useState, useContext, useEffect } from 'react';
import { Context } from '../ContextStore';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { passphrase, cryptography } from "@liskhq/lisk-client";
import './LiskSignup.css'


function LiskSignup({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const pw = passphrase.Mnemonic.generateMnemonic();
        console.log(pw)
        const address = cryptography.getBase32AddressFromPassphrase(pw).toString("hex");
        setPassword(pw);
        setAddress(address);
      }, []);

      const validatePassphrase=(str)=>{
        if (str.trim().split(" ").length != 12) {
            return false;
        }else{
            return true;
        }
    }
    
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        try{
        if(!validatePassphrase(password)){
            alert("Invalid password");
            return;
        }
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
            localStorage.setItem('address',base32UIAddress);
            localStorage.setItem('hexAddress',address);
            // setUserData(base32UIAddress.toString());
            history.push('/');
            window.location.reload();
        }
    }
    catch{
        
        alert("Something went wrong");
        setLoading(false);
    }
    }

    return (
        <>
            <div className="container auth-form">
                <h1 className="auth-heading" style={{color:"white"}}>Sign Up</h1>
                <h3 className="auth-heading" style={{color:"white"}}>Please copy and safely store the passphrase and address</h3>
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
                        (
                            <>
                        <fieldset disabled>
                            <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Passphrase</Form.Label>
                            <Form.Control id="disabledTextInput" value={password} onClick={() => {navigator.clipboard.writeText(password)}} placeholder="Passphrase" />
                            </Form.Group>
                        </fieldset>

                        <fieldset disabled>
                            <Form.Group className="mb-3">
                            <Form.Label htmlFor="disabledTextInput">Passphrase</Form.Label>
                            <Form.Control id="disabledTextInput" value={address} placeholder="Address" onClick={() => {navigator.clipboard.writeText(address)}} />
                            
                            </Form.Group>
                        </fieldset>
                         <Button variant="dark" className="col-lg-12 btnAuth" type="submit">
                            Login with these Credentials
                         </Button>
                        </>
                        

                        )
                    }
                </Form>
            </div>
        </>
    )
}

export default LiskSignup;