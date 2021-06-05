import { Form } from 'react-bootstrap';

const NormalInputField = ({ stateValue, onStateValueChange, title, type, formText, controlId }) => {
    return (
        <Form.Group className = "py-3" controlId = {controlId}>
            <Form.Label className = "font-weight-bold d-block">{title}</Form.Label>
            <Form.Text className = "text-muted">{formText}</Form.Text>
            <Form.Control type = {type} value = {stateValue} onChange = {onStateValueChange}/>
        </Form.Group>
    )
}

export default NormalInputField
