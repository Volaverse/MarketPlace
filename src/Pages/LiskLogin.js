import { useState, useContext, useEffect } from 'react';
import { Context } from '../ContextStore';
import InputGroup from 'react-bootstrap/InputGroup';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { passphrase, cryptography } from "@liskhq/lisk-client";





function LiskLogin({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState("");
    const [password,setPassword]=useState("");
    // const[eye,seteye]=useState(true);
    const eye=true;
    const [passwordType, setPasswordType] = useState("password");
const [passwordBtn, setpasswordBtn] = useState("Show");
const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     setpasswordBtn("Hide")
     return;
    }
    setPasswordType("password")
    setpasswordBtn("Show")
  }

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
                <InputGroup>

                    <Form.Control type={passwordType} value={password} 
placeholder="12 word password" onChange={(text)=>{
                        setPassword(text.target.value);
                    }} /> 
                                    <InputGroup.Prepend>
                                    
                                <InputGroup.Text onClick={togglePassword}>{passwordBtn}
                                {/* <FontAwesomeIcon name="check" spin key="icon" /> */}
                                </InputGroup.Text>
                                
                            </InputGroup.Prepend>
                </InputGroup>
                    <br/>
                    {/* <i className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i> */}
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

export default LiskLogin;