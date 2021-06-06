import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Layout from '../layout/Layout';
import NormalInputField from '../presentational/NormalInputField';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import AlertComp from '../presentational/AlertComp';
import Loading from '../presentational/Loading';

const EditProfile = () => {
    // state for alert
    const [[showAlert, setShowAlert], [alertMessage, setAlertMessage], [alertVariant, setAlertVariant]] = [useState(false), useState(""), useState("")];

    const [ cookies ] = useCookies(['loggedInUserToken']);
    const history = useHistory();

    const [ name, setName ] = useState('');
    const [ bdsp, setBdsp ] = useState('');
    const [ mobileNumber, setMobileNumber ] = useState('');

    // state for page loading
    const [ loading, setLoading ] = useState(true);
    // state for button click disabling
    const [ buttonClicked, setButtonClicked ] = useState(false);

    const handleNameChange = e => setName(e.target.value)
    const handleBdspChange = e => setBdsp(e.target.value)
    const handleMobileNumberChange = e => setMobileNumber(e.target.value)

    // function to show alerts
    const returnAlert = () => {
        if(showAlert){
            return (
                <AlertComp
                    close = {() => setShowAlert(false)}
                    variant = {alertVariant}
                    message = {alertMessage}
                />
            )
        }
    }

    // function to display alerts
    const displayAlert = useCallback((message, variant, showState) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(showState);
        // window.scrollTo(0, 0);
    }, [ setAlertMessage, setAlertVariant, setShowAlert ])

    useEffect(() => {
        
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/get-admin`,{
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                'Authorization' : cookies['loggedInUserToken']
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                setName(data.data.fullName);
                setBdsp(data.data.bdsp);
                setMobileNumber(data.data.mobileNumber);
                setLoading(false);
            }else{
                history.push("/")
            }
        })
        .catch(err => {
            displayAlert(`An error has occurred because: ${err}. Please, refresh the page or contact the developer`, "danger", true)
        })

    }, [cookies, history, displayAlert])

    const handleSubmit = (e) => {
        e.preventDefault()
        setButtonClicked(true);
        if(name!== "" && bdsp !== "" && mobileNumber !== ""){
            const newData = {name, bdsp, mobileNumber};
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/update-profile`,{
                method : "PUT",
                headers : {
                    "Content-Type": "application/json",
                    'Authorization' : cookies['loggedInUserToken']
                },
                body: JSON.stringify(newData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    history.push("/profile")
                }else{
                    displayAlert(data.message, "danger", true)
                    setButtonClicked(false);
                }
            })
            .catch(err => {
                displayAlert(`Error updating, because: ${err}`, "danger", true)
                setButtonClicked(false);
            })
        }else{
            displayAlert("Complete the form before submitting", "danger", true)
            setButtonClicked(false);
        }
    }
    
    return (
        <Layout
            jumboShow = {false}
            pageTitle = "Edit Your Profile"
            titleUnderText = { <p> Go back to <Link className = "primary-text" to = "/profile" >your profile.</Link></p>}
        >
            {loading?
                <Loading variant = "page" />
            :
            <>
                <Form onSubmit = {handleSubmit}>
                    {returnAlert()}

                    <NormalInputField 
                        stateValue = {name} onStateValueChange = {handleNameChange} title = "Full name." type = "text" controlId = "fullname"
                    />

                    <NormalInputField 
                        stateValue = {mobileNumber} onStateValueChange = {handleMobileNumberChange} title = "Mobile number." type = "text" controlId = "mobileNumber"
                    />

                    <NormalInputField 
                        stateValue = {bdsp} onStateValueChange = {handleBdspChange} title = "BDSP." type = "text" controlId = "bdsp"
                    />
                    <div className="text-center">
                        <Button variant = "light" type = "submit" className = "secondary-bg" disabled = {buttonClicked? true : false}>
                            {buttonClicked? <Loading variant = "button" /> : "Update" }
                        </Button>
                    </div>
                </Form>
            </>
            }
        </Layout>
        
    )
}

export default EditProfile;
