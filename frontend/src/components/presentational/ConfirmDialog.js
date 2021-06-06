import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const ConfirmDialog = ({ buttonVariant, buttonText, handleClick, confirmMessage }) => {
    const [ display, setDisplay ] = useState(false);
    const handleOpen = () => setDisplay(true)
    const handleClose = () => setDisplay(false)
    return (
        <>
            <Button variant = {buttonVariant} onClick = {handleOpen}>
                {buttonText}
            </Button >

            <Modal show={display} onHide={handleClose}>
                <Modal.Header className = 'justify-content-end'>
                    <Button variant="danger" onClick={handleClose}>
                        <FaTimes />
                    </Button>
                </Modal.Header>

                <Modal.Body>
                    <p>{confirmMessage}</p>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="success" onClick={() => {
                        handleClose();
                        handleClick();
                    }}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}

export default ConfirmDialog
