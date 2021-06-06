import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import { useCookies } from 'react-cookie';
import RichTextEditorInput from './RichTextEditorInput';
import AlertComp from '../presentational/AlertComp';
import Loading from './Loading';

const UserDetailEditForm = ({id, stateValue, eventKey, handleEditReadyFalse, handleSetEditedValue}) => {
    const [ cookies ] = useCookies(['loggedInUserToken'])

    const [ newEdit, setNewEdit ] = useState("");
    // state for alert  
    const [[showAlert, setShowAlert], [alertMessage, setAlertMessage], [alertVariant, setAlertVariant]] = [useState(false), useState(""), useState("")];
    // state for button click disabling
    const [ buttonClicked, setButtonClicked ] = useState(false);

    const handleNewEditChange = (e, editor) => setNewEdit(editor.getData());

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
        const newData = {id, eventKey, newEdit}
        if(stateValue !== ""){  
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/update-folder/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization' : cookies['loggedInUserToken']
                },
                body: JSON.stringify(newData)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    handleEditReadyFalse();
                    handleSetEditedValue(newEdit)
                }else{
                    displayAlert(data.message, "danger", true)
                }
                setButtonClicked(false);
            })
            .catch(err => {
                displayAlert(`Error editting field, because: ${err}`, "danger", true)
                setButtonClicked(false);
            })
        }else{
            displayAlert("Form can not be empty.", "danger", true)
            setButtonClicked(false);
        }
    }
    
    return (
        <Form onSubmit = {handleSubmit}>
            {returnAlert()}

            <RichTextEditorInput 
                stateValue = {stateValue} onStateValueChange = {handleNewEditChange}
            /> 
            <Button type = "submit" disabled = {(newEdit === "" || buttonClicked ) ? true : false}>
                {buttonClicked? 
                    <Loading variant = "button" />
                : 
                    <><FaCheck /> Save</>
                }

            </Button>
        </Form>
    )
}

export default UserDetailEditForm
