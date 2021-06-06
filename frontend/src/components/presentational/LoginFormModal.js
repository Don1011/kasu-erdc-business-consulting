import { useState } from 'react';
import { Modal, Nav, Button, Form } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import NormalInputField from './NormalInputField'
import AlertComp from '../presentational/AlertComp';
import Loading from './Loading';

const LoginFormModal = ({cookies, setUserLoggedIn, setCookie}) => {
    const [ show, setShow ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    // state for alert
    const [[showAlert, setShowAlert], [alertMessage, setAlertMessage], [alertVariant, setAlertVariant]] = [useState(false), useState(""), useState("")];
    // state for button click disabling
    const [ buttonClicked, setButtonClicked ] = useState(false);

    const handleEmailChange = e => setEmail(e.target.value);
    const handlePasswordChange = e => setPassword(e.target.value);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleClickLink = e => {
        e.preventDefault();
        handleShow();
    }
    
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
        // window.scrollTo(0, 0);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setButtonClicked(true);
        if(email !== "" && password !== ""){
            const admin = { email: email, password: password };
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/login/`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(admin)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    var tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate()+1);//Expires in one day
                    setCookie('loggedInUserToken', `Bearer ${data.data.token}`, {path: "/", expires: tomorrow})
                    setCookie('adminStatus', `${data.data.adminStatus}`, {path: "/", expires: tomorrow})
                    setUserLoggedIn(true);
                }else{
                    displayAlert(data.message, "danger", true);
                    setButtonClicked(false);
                }
            })
            .catch(err => {
                displayAlert(`Login error, because: ${err}`, "danger", true);
                setButtonClicked(false);
            })
        }else{
            displayAlert("Complete filling form before submitting.", "danger", true);
            setButtonClicked(false);
        }
    }

    return (
        <>
            <Nav.Link className = "navbar-custom-links" onClick = {handleClickLink}>
                Login
            </Nav.Link >

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>Admin Login</Modal.Title>
                    <Button variant="danger" onClick={handleClose}>
                        <FaTimes />
                    </Button>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit = {handleSubmit}>
                        {returnAlert()}

                        <NormalInputField 
                            stateValue = {email}
                            onStateValueChange = {handleEmailChange}
                            title = "Email."
                            type = "email"
                            controlId = "email"
                        />
                        <NormalInputField 
                            stateValue = {password}
                            onStateValueChange = {handlePasswordChange}
                            title = "Password."
                            type = "password"
                            controlId = "password"
                        />
                        <div className="text-center">
                            <Button variant = "light" type = "submit" className = "secondary-bg" disabled = {buttonClicked? true : false}> 
                                {buttonClicked? <Loading variant = "button" /> : "Login" }
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
} 

export default LoginFormModal
