import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Form, Button } from 'react-bootstrap';
import NormalInputField from '../presentational/NormalInputField';
import AlertComp from './AlertComp';
import Loading from '../presentational/Loading';

const CreateAdminForm = () => {
    const [ cookies ] = useCookies(['loggedInUserToken'])
    // Routes History 
    const history = useHistory();
    // States for the alert
    const [[showAlert, setShowAlert], [alertMessage, setAlertMessage], [alertVariant, setAlertVariant]] = [useState(false), useState(""), useState("")];
    // state for button click disabling
    const [ buttonClicked, setButtonClicked ] = useState(false);

    // States for the form inputs
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ mobileNumber, setMobileNumber ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ accountStatus, setAccountStatus ] = useState('');
    const [ bdsp, setBdsp ] = useState('');

    // Target the form
    const createAdminForm = useRef(null)

    const handleNameChange = e => setName(e.target.value);
    const handleEmailChange = e => setEmail(e.target.value);
    const handleMobileNumberChange = e => setMobileNumber(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);
    const handleAccountStatusChange = e => setAccountStatus(e.target.value);
    const handleBdspChange = e => setBdsp(e.target.value);

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
    const displayAlert = (message, variant, showState) => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(showState);
        window.scrollTo(0, 0);
    }

    // function to submit form
    const handleSubmit = (e) => {
        e.preventDefault()
        setButtonClicked(true);
        if(name !== "" && email !== "" && mobileNumber !== "" && password !== "" && confirmPassword !== "" && accountStatus !== "" && bdsp !== "" ){
            if(password === confirmPassword){
                const newAdmin = { fullname: name.trim(), email: email.trim(), mobileNumber: mobileNumber.trim(), password: password, adminStatus: accountStatus, bdsp: bdsp.trim() }

                fetch(`${process.env.REACT_APP_BACKEND_HOST}/create-admin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : cookies['loggedInUserToken']
                    },
                    body: JSON.stringify(newAdmin)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.success){
                        history.push(`/admin-details/${data.data._id}`)
                    }else{
                        displayAlert(data.message, "danger", true);
                        setButtonClicked(false);
                    }
                })
                .catch(err => {
                    displayAlert(`Error: ${err}`, "danger", true);
                    setButtonClicked(false);
                })
            }else{
                displayAlert("Passwords do not match.", "danger", true);
                setButtonClicked(false);
            }
        }else{
            displayAlert("You have to fill all input fields before submitting.", "danger", true);
            setButtonClicked(false);
        }

    }
    
    return (
        <Form onSubmit = {handleSubmit} ref = {createAdminForm}>
            {returnAlert()}
            <NormalInputField 
                stateValue = {name} onStateValueChange = {handleNameChange} title = "Full name" type = "text" controlId = "fullname"
            />

            <NormalInputField 
                stateValue = {email} onStateValueChange = {handleEmailChange} title = "Email address." type = "email" controlId = "email"
            />

            <NormalInputField 
                stateValue = {mobileNumber} onStateValueChange = {handleMobileNumberChange} title = "Mobile number." type = "text" controlId = "mobileNumber"
            />

            <NormalInputField 
                stateValue = {password} onStateValueChange = {handlePasswordChange} title = "Password." type = "password" controlId = "password"
            />

            <NormalInputField 
                stateValue = {confirmPassword} onStateValueChange = {handleConfirmPasswordChange} title = "Confirm Password." type = "password" controlId = "confirmPassword"
            />

            <NormalInputField 
                stateValue = {bdsp} onStateValueChange = {handleBdspChange} title = "BDSP." type = "text" controlId = "bdsp"
            />

            <Form.Group>
                <Form.Label className = "font-weight-bold">Account Type.</Form.Label>
                <Form.Check
                    type = "radio"
                    id = "super"
                    label = "Super"
                    value = "super"
                    name = "accountStatus"
                    onClick = {handleAccountStatusChange}
                />
                <Form.Check
                    type = "radio"
                    id = "sub"
                    label = "Sub"
                    value = "sub"
                    name = "accountStatus"
                    onClick = {handleAccountStatusChange}
                />
            </Form.Group>

            <div className="text-center">
                <Button variant = "light" type = "submit" className = "secondary-bg" disabled = {buttonClicked? true : false}>
                    {buttonClicked? <Loading variant = "button" /> : "Create" }
                </Button>
            </div>
        </Form>

    )
}

export default CreateAdminForm
