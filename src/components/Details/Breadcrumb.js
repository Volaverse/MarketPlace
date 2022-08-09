import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BreadcrumbNav({ params }) {
    console.log("BreadcrumbNav | params:", params);
    const category = "land";
    if (params.length == 0) return <p> hello </p>;
    return (
        <Breadcrumb style={{margin:"20px"}}>
            <li className="breadcrumb-item">
                <Link to={"/owned/" + params.owner + "/" + params.category}>{category}</Link>
            </li>
            <li  className="breadcrumb-item">
                <Link to={"/nft/" + params.contractAddress + "/" + params.tokenId + "/details"}>{params.contractAddress.substr(0,6) + "... : " + params.tokenId}</Link>
            </li>
        </Breadcrumb>
    )
}

export default BreadcrumbNav;