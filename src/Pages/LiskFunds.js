import { useState, useContext, useEffect } from 'react';
import { Context } from '../ContextStore';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { passphrase, cryptography ,transactions} from "@liskhq/lisk-client";
// import {fetchNodeInfo, purchaseNFTToken, sellNFTToken, sendTransactions} from '../../../services/liskProductData';
import {sendTransactions,fetchNodeInfo} from '../services/liskProductData'
import {transferFunds} from '../services/liskUserData'
import { NodeInfoContext,nodeInfoContextDefaultValue } from '../ContextStore';
import {fetchAccountInfo} from '../services/liskUserData'

function LiskFunds({ history }) {
    const [loading, setLoading] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
      recipientAddress: "",
      passphrase: "peanut hundred pen hawk invite exclude brain chunk gadget wait wrong ready",
      amount: "",
      fee: "",
    });
    const nodeInfo = useContext(NodeInfoContext);
    const [nodeInfoState, updateNodeInfoState] = useState(
		nodeInfoContextDefaultValue,
	);
    const [balance,setBalance]=useState("");


    //   const validatePassphrase=(str)=>{
    //     if (str.trim().split(" ").length != 12) {
    //         return false;
    //     }else{
    //         return true;
    //     }
    // }
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

        async function fetchAccountDetails(){
            const res=await fetchAccountInfo(localStorage.getItem("hexAddress"));
            // console.log(localStorage.getItem("address").toString("hex"));
            // console.log(res.token.balance);
            setBalance(res.token.balance);
        }
        if(localStorage.getItem("hexAddress")){
            fetchAccountDetails();
        }
      }, []);

    const handleChange = (event) => {
        event.persist();
        setData({ ...data, [event.target.name]: event.target.value });
      };
    
    const handleTransferFunds=async(event)=>{
        event.preventDefault();
        // try{
        setLoading(true);

        const info=await fetchNodeInfo();
        console.log(info);
        const res = await transferFunds({
            ...data,
            networkIdentifier: info.networkIdentifier,
            minFeePerByte: info.genesisConfig.minFeePerByte,
        });
        const response=await sendTransactions(res.tx);
        setLoading(false)
        if(response.transactionId){
            alert("Transaction successful,Transaction will be updated soon");
        }else{
          alert("Something went wrong!");
        }
    // }
    // catch{
    //     alert("Something went wrong");
    //     setLoading(false)

    // }
        }

    return (
        <>
            <div className="container auth-form">
                <h1 className="auth-heading" style={{color:"white"}}>Transfer Funds</h1>
                <h5 className="auth-heading" style={{color:"white"}}>
                               (Current Balance : {Number(transactions.convertBeddowsToLSK(balance))} lsk)
                </h5>
                <Form className="col-lg-6" onSubmit={handleTransferFunds}>
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
                        <fieldset>
                            <Form.Group className="mb-3">
                            <Form.Control name="recipientAddress" value={data.recipientAddress} onChange={handleChange} placeholder="Recipient Address" />
                            </Form.Group>
                        </fieldset>

                        <fieldset>
                            <Form.Group className="mb-3">
                            <Form.Control type="Number" name="amount" value={data.amount} onChange={handleChange} placeholder="Amount (lsk)" />
                            </Form.Group>
                        </fieldset>

                        <fieldset>
                            <Form.Group className="mb-3">
                            <Form.Control name="fee" value={data.fee} onChange={handleChange} placeholder="Fee" />
                            </Form.Group>
                        </fieldset>

                        <fieldset disabled>
                            <Form.Group className="mb-3">
                            <Form.Control name="passphrase" value={data.passphrase} onChange={handleChange} placeholder="Passphrase" />
                            </Form.Group>
                        </fieldset>
                         <Button variant="dark" className="col-lg-12 btnAuth" type="submit">
                            Get Faucet
                         </Button>
                        </>
                        

                        )
                    }
                </Form>
            </div>
        </>
    )
}

export default LiskFunds;