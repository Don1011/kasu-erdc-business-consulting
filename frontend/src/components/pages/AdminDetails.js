import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useHistory } from 'react-router-dom';
import Layout from '../layout/Layout';
import UserDetailNormal from '../presentational/UserDetailNormal';
import ConfirmDialog from '../presentational/ConfirmDialog';
import AlertComp from '../presentational/AlertComp';

const AdminDetails = () => {
    const [ cookies ] = useCookies(['loggedInUserToken'])
    
    const history = useHistory();

    const [ user, setUser ] = useState({});
    const [ loggedUser, setLoggedUser ] = useState({});
    // const [ loggedUser, setLoggedUser ] = useState();
    const [ deleted, setDeleted ] = useState(false);

    // States for the alert
    const [[showAlert, setShowAlert], [alertMessage, setAlertMessage], [alertVariant, setAlertVariant]] = [useState(false), useState(""), useState("")];

    const { id } = useParams();

    useEffect(() => {
        // Once the component is mounted, fetch the user's data.
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/fetch-admin/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : cookies['loggedInUserToken']
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setUser(data.data.admin);
                setLoggedUser(data.data.loggedUserEmail);
            }else{
                // console.log(data.message);
                history.push(`/`);
            }
        })
        .catch(err => history.push(`/`))
        
    }, [id, cookies, history])

    // function to fetch single Admin

    const toTitleCase = (str) => {
        if (str) {
            let text = str.split(' ')
                .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ');
            return text;
        }
    }

    // function to show alerts
    const returnAlert = () => {
        if(showAlert){
            return (
                <AlertComp
                    close = {() => setShowAlert(false)}
                    variant = {alertVariant}
                    message = {alertMessage}
                    dismissable = {false}
                />
            )
        }
    }

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/delete-admin/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : cookies['loggedInUserToken']
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setDeleted(true);
                setAlertMessage(data.message);
                setAlertVariant("success");
                setShowAlert(true);
            }else{
                setAlertMessage(data.message);
                setAlertVariant("danger");
                setShowAlert(true);
            }
        }).catch(err => {
            setAlertMessage(`A delete error occurred because: ${err}`);
            setAlertVariant("danger");
            setShowAlert(true);
        })
    }
    
    return (
        <Layout
            jumboShow = {false}
            pageTitle = "Admin Details"
            >
                {
                    returnAlert()
                }
                {
                    !deleted 
                    &&
                    <>
                        <UserDetailNormal
                            label = "Full name." value = {user.fullName}
                        />
                        <UserDetailNormal
                            label = "Email address." value = {user.email}
                        />
                        <UserDetailNormal
                            label = "Mobile number." value = {user.mobileNumber}
                        />
                        <UserDetailNormal
                            label = "BDSP." value = {user.bdsp}
                        />
                        <UserDetailNormal
                            label = "Admin Status." value = {toTitleCase(user.adminStatus)}
                        />
                        {(loggedUser !== user.email) 
                            &&
                        <div className="text-center justify-content-center">
                            <ConfirmDialog buttonVariant = "danger" buttonText = "Delete" handleClick = {() => handleDelete(user._id)} confirmMessage = "Are you sure you want to delete this admin?" />
                        </div>
                        }  
                    </>
                }
        </Layout>
        
    )
}

export default AdminDetails
