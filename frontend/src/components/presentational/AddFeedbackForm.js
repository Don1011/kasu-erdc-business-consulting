import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import RichTextEditorInput from './RichTextEditorInput';
import AlertComp from './AlertComp';
import { useCookies } from 'react-cookie';
import Loading from './Loading';

const AddFeedbackForm = ({id, eventKey}) => {
    const [ newFeedback, setNewFeedback ] = useState('');
    const [ cookies ] = useCookies(['loggedInUserToken'])

    // States for the alert
    const [[showAlert, setShowAlert], [alertMessage, setAlertMessage], [alertVariant, setAlertVariant]] = [useState(false), useState(""), useState("")];
    // state for button click disabling
    const [ buttonClicked, setButtonClicked ] = useState(false);

    const onChangeNewFeedback = (e, editor) => setNewFeedback(editor.getData());

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
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonClicked(true);
        if(newFeedback !== ""){
            const newFeedbackToBeAdded = {id, feedback: newFeedback}
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/add-feedback/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization' : cookies['loggedInUserToken']
                },
                body: JSON.stringify(newFeedbackToBeAdded)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    displayAlert(data.message, "success", true);
                    setNewFeedback("");
                    setButtonClicked(false);
                }else{
                    displayAlert(data.message, "danger", true);
                    setButtonClicked(false);
                }
            })
            .catch(err => {
                displayAlert(`Error adding feedback because: ${err}`, 'danger', true)
                setButtonClicked(false);
            })
        }else{
            displayAlert("Complete filling the form before submitting.", "danger", true)
            setButtonClicked(false);
        }
    }

    if(eventKey === "ffu"){
        return (
            <div>
                <hr />
                <Form onSubmit = {handleSubmit}>
                    {returnAlert()}

                    <RichTextEditorInput 
                        stateValue = {newFeedback} onStateValueChange = {onChangeNewFeedback} title = "Add feedback." formText = "Add new feedback/follow up details." controlId = "nfb"
                    />
                    <div className="text-center">
                        <Button variant = "light" type = "submit" className = "secondary-bg" disabled = {buttonClicked? true : false}>
                            {buttonClicked? <Loading variant = "button" /> : "Add" }
                        </Button>
                    </div>                    
                </Form>
            </div>
        )
    }else{
        return <span></span>
    }
}

export default AddFeedbackForm
