import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

const AlertComp = ({close, variant, message, dismissable}) => {
      
    return (
        <Alert variant={variant} >
            <Container>
                <Row>
                    <Col lg = {10}>
                        <p>
                        {message}
                        </p>
                    </Col>
                    {
                    dismissable
                    &&
                    <Col lg = {2}>
                        <Button variant = "default" onClick={close}>
                            <FaTimes />
                        </Button>
                    </Col>
                    }
                </Row>
            </Container>
        </Alert>
    );
      
}

AlertComp.defaultProps = {
    dismissable : true,
    
}

export default AlertComp
