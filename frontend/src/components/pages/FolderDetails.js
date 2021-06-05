import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Layout from '../layout/Layout';
import UserDetailNormal from '../presentational/UserDetailNormal';
import UserDetailAccordion from '../presentational/UserDetailAccordion';

const FolderDetails = () => {

    const history = useHistory();

    const [ cookies ] = useCookies(['loggedInUserToken'])
    
    const [ accessEditable ] = useState((cookies['adminStatus'] === "super") ? true : false);
    const [ user, setUser ] = useState({});
    const {id} = useParams();
    
    // const fetchFolder = (folderId) => {
    // }
    
    useEffect(() => {
        // fetch single folder
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/fetch-client/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : cookies['loggedInUserToken']
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setUser(data.data);
            }else{
                history.push(`/`);
            }
        })
        .catch(err => history.push(`/`))
        // fetchFolder(id);
    }, [ id, cookies, history ])

    return (
        <Layout
            jumboShow = {false}
            pageTitle = {`${user.fullName}'s Folder Details`}
        >
            <UserDetailNormal label = "Client full name." value = {user.fullName} />

            <UserDetailNormal label = "Client age." value = {user.age} />

            <UserDetailNormal label = "Client email address." value = {user.email} />

            <UserDetailNormal label = "Client mobile number." value = {user.mobileNumber} />

            <UserDetailNormal label = "Client business name." value = {user.businessName} />

            <UserDetailNormal label = "Client card number." value = {user.cardNumber} />

            <Accordion defaultActiveKey = "pat">
                <UserDetailAccordion id = {user._id} label = "Primary analysis tool." value = {user.pat} eventKey = "pat" editable = {accessEditable}/>

                <UserDetailAccordion id = {user._id} label = "Additional notes." value = {user.an} eventKey = "an" editable = {accessEditable}/>

                <UserDetailAccordion id = {user._id} label = "Secondary analysis tool." value = {user.sat} eventKey = "sat" editable = {accessEditable}/>

                <UserDetailAccordion id = {user._id} label = "Mini contract." value = {user.mc} eventKey = "mc" editable = {accessEditable}/>

                <UserDetailAccordion id = {user._id} label = "Recommended support activities." value = {user.rsa} eventKey = "rsa" editable = {accessEditable}/>

                <UserDetailAccordion id = {user._id} label = "Negotiation and agreement on scope of support and pricing." value = {user.naa} eventKey = "naa" editable = {accessEditable}/>

                <UserDetailAccordion id = {user._id} label = "Feedback/Follow up." value = {user.ffu} eventKey = "ffu" editable = {false}/>
            </Accordion>
        </Layout>
    )
}

export default FolderDetails
