import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../layout/Layout';
import ListEnumerator from '../presentational/ListEnumerator';
import { useCookies } from 'react-cookie';
import AlertComp from '../presentational/AlertComp';

const Notifications = () => {
    const history = useHistory();
    
    const [ cookies ] = useCookies(['loggedInUserToken'])
    const [ data, setData ] = useState([])

    useEffect(() => {
        // console.log("use effect")
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/get-notifications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : cookies['loggedInUserToken']
            },
        })
        .then(res => res.json())
        .then(data => {
            setData(data.data.reverse())
            // console.log(data.data);
        })
        .catch(err => {
            history.push('/')
        })
    }, [cookies, history])
    

    return (
        <Layout
            jumboShow = {false}
            pageTitle = "Notifications"
        >
            {(data.length > 0)?
                <ListEnumerator from = "notifications" to = "folder-details" data = {data}/>
                :
                <AlertComp
                    variant = "success"
                    message = "No notification here yet."
                    dismissable = {false}
                />
            }
        </Layout>
        
    )
}

export default Notifications
