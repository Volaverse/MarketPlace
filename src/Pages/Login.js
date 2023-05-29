import { useState, useContext, useEffect } from 'react';
import { Context } from '../ContextStore';
import { connect, getAddress } from '../services/userData'
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleSider from '../components/Siders/SimpleSider';
// import useMetaMask from '../hooks/metamask';


function Login({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [address, setAddress] = useState("");
    // const { connect, disconnect, isActive, account, shouldDisable } = useMetaMask()
    const { setUserData } = useContext(Context)

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        // loginUser(user)
        connect().then(res => {
                // if (!res.error) {
                    // setUserData(res.user)
                    var ad = getAddress();
                    setAddress(ad);
                    setUserData(ad);
                    history.push('/')
                // } else {
                //     console.log("FFFFFFFFFFFF4");
                //     setLoading(false);
                //     setError(res.error.message);
                //     setAlertShow(true);
                // }
            }).catch(err => console.error('error from login: ', err))
    }
    
    // useEffect(() => {
    //     console.log("hello yo" + address);
    //     setUserData(address);
    // }, [address]);

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
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">
                            Connect To Metamask
                        </Button>
                    }
                </Form>
            </div>
        </>
    )
}

export default Login;