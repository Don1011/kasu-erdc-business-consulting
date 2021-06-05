import { useState } from 'react';
import { FaAngleDown, FaEdit, FaTimes } from 'react-icons/fa';
import { Accordion, Card, Button } from 'react-bootstrap';
import AddFeedbackForm from './AddFeedbackForm';
import UserDetailEditForm from './UserDetailEditForm';

const UserDetailAccordion = ({id, label, value, eventKey, editable }) => {
    const [ editReady, setEditReady ] = useState(false);
    const [ editedValue, setEditedValue ] = useState(null);
    const handleEditReadyTrue = () => {        
        setEditReady(true);
    }

    const handleEditReadyFalse = () => {
        setEditReady(false);
    }

    const handleSetEditedValue = (val) => {
        setEditedValue(val);
    }
    
    return (
        <Card className = "mx-4 my-3 b-none">
            <Accordion.Toggle as={Card.Header} eventKey={eventKey} className="user-detail-label py-2 px-2">
                <div className="d-flex justify-content-between">
                    <div>
                        {label}
                    </div>
                    <div>
                        <FaAngleDown />
                    </div>
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={eventKey} className="py-2">
                <Card.Body>
                    {editable &&
                        (editReady ? 
                            <Button variant = "danger" onClick = {handleEditReadyFalse} className = "button-in-accordion" >
                                <FaTimes /> Cancel
                            </Button>
                            :
                            <Button variant = "primary" onClick = {handleEditReadyTrue} className = "button-in-accordion" >
                                <FaEdit /> Edit
                            </Button>
                        )
                    }
                    <hr />
                    {(editReady) ? 
                        <UserDetailEditForm 
                            id = {id}
                            stateValue = {editedValue || value}
                            eventKey = {eventKey}
                            handleEditReadyFalse = {handleEditReadyFalse}
                            handleSetEditedValue = {handleSetEditedValue}
                        /> 
                        :
                        <div dangerouslySetInnerHTML = {{ __html: editedValue || value }}></div>
                         
                    }
                    <AddFeedbackForm 
                        id = {id}
                        eventKey = {eventKey}
                    />
                </Card.Body>
            </Accordion.Collapse> 
        </Card>
    )
}

export default UserDetailAccordion
