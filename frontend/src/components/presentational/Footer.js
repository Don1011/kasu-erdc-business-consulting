import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaHome } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer primary-bg mt-5">
            <Container className = "py-5">
                <Row className = "justify-content-end text-light">
                    <Col md = {6} className = " align-self-end px-4 ">
                        <h2 className = "text-shadow" id = "contact-us">Contact Us</h2>
                        <p className="small">You can contact us through the following medium:</p>
                        <ListGroup>
                            <ListGroup.Item className = "footer-list-element my-2 text-light">
                                <FaPhoneAlt /> &nbsp; +2348036374503, +2349011221466, +2347069026531
                            </ListGroup.Item>
                            <ListGroup.Item className = "footer-list-element my-2 text-light">
                                <FaEnvelope /> &nbsp; erdc@kasu.edu.ng
                            </ListGroup.Item>
                            <ListGroup.Item className = "footer-list-element my-2 text-light">
                                <FaHome /> &nbsp; Tafawa Balewa Way P.M.B. 2339 Kaduna, Nigeria.
                            </ListGroup.Item>
                        </ListGroup>
                        <p className="text-center d-md-block d-none p-5 text-light">
                            Copyright &copy; 2021 
                        </p>
                    </Col>
                </Row>
                <Row>
                    <p className="text-center d-md-none p-5 text-light">
                        Copyright &copy; 2021 
                    </p>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
