import { useState, useEffect } from 'react';
import { Row, Tabs, Tab, Image, OverlayTrigger , Tooltip} from 'react-bootstrap';
// import ReactThreeFbxViewer from 'react-three-fbx-viewer';
// let fbxUrl = '../../../assets/FirstDecorationTable.fbx';
// import fbxUrl from '../../../assets/cerca2.fbx';
// import ThreeScene from '../../ThreeScene/ThreeScene';
import fbxUrl from '../../../assets/FirstDecorationTable.fbx';

import styled from 'styled-components';

const H6 = styled.h6`
    color : #E7E6E6;
    margin-left : 30px;
    margin-bottom : 10px;
`;

const H1 = styled.h1`
    color : #E7E6E6;
    margin-left : 30px;
    margin-bottom : 20px;
`

const P = styled.p`
    color : #E7E6E6;
    padding : 0;
`

function ProductInfo({ params }) {
    const [info, setInfo] = useState({
        category: "loading",
        contractAddress: "loading",
        tokenId: -1
    });

    useEffect(() => {
        if (params.category && params.contractAddress && params.tokenId)
        setInfo({
            category: params.category,
            contractAddress: params.contractAddress,
            tokenId: params.tokenId
        });
    }, [params, setInfo])

    const LandGroup = (landParams) => {
        const lands = [];
        for (let i=0;i<4;i++) {
            for (let j=0;j<2;j++) {
                const ind = landParams.start + i*10 + j;
                if (ind == info.tokenId) lands.push(<div className="selected-land" key={"land" + ind}>{ind}</div>);
                else lands.push(<div className="land" key={"land" + ind}>{ind}</div>);
            }
        }
        return <div className="land-group" key={"land-group" + landParams.start}>
        {lands}
        </div>;
    }
    const MyMap = () => {
        const groups = [];
        for (let i=0;i<15;i++) {
            const row1 = Math.floor(i / 5);
            const col1 = i % 5;
            groups.push(<LandGroup start={row1 * 40 + col1 * 2}/>);
        }
        return <div className="grid-container" key="grid-container">
            {groups}
        </div>
    };
    console.log("Info:",info);
    console.log("url:", fbxUrl);
    // onLoad(e) {
    //     console.log(e);
    // }
    
    // onError(e) {
    //     console.log(e);
    // }
    let cameraPosition = {
        x:300,
        y:600,
        z:700 
      }
    return (
        <>
            {/* <Image className="col-lg-12" src={params.image} rounded /> */}
            <div>
            {/* <div> */}
                {params.category == "land" && <MyMap  key="grid-container"/>}
                {/* {params.category == "decoration" && <ReactThreeFbxViewer style={{}} cameraPosition={cameraPosition} url={fbxUrl} />} */}

            </div>
            <Row>
                <H1 className="col-lg-10 col-sm-10 product-info-heading">{info.category.toUpperCase()}</H1>
                <H6 className="col-lg-10">{"Address: " + info.contractAddress}</H6>
                <H6 className="col-lg-10 col-sm-10">{"Token ID: " + info.tokenId}</H6>
            </Row>
            <div id="detailsCardText" className="col-lg-12">
                <Tabs defaultActiveKey="details" transition={false}>
                    <Tab eventKey="details" title="Details" id="tab-details">
                    {params.category == "land" && <P>Buy a piece of a land and start spreading the knowledge</P>}
                    {params.category == "decoration" && <P>Make your scene more aesthetic with these limited edition collectibles</P>}
                    {params.category == "wearable" && <P>Make your avatar more fashionable and trendy</P>}
                        <hr />
                        <P id="details-footer" className="text-muted">Product listed at {"00-00-0000"}</P>
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default ProductInfo;