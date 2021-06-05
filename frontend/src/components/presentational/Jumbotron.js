import { Jumbotron as Jumbo, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const Jumbotron = ({jumboShow}) => {
    return (
        jumboShow &&
        <Jumbo className = "jumbotron z-index-0 pt-5">
            <Container className = "my-5 text-light">
                <h2 className = "text-shadow mt-5">Consulting by experts.</h2>
                <Row className = "">
                    <Col md = {6} className = "">
                        <p className = "small-md">
                            Have you started or are thinking of starting a business and would like consultation services from experts in the field of business from Kaduna State University Entrepreneurship Research and Development Center? Click on the contact button to learn how to contact us.
                        </p>
                        <div className="my-4">
                            <a href="/#contact-us" className = "custom-btn p-2 mt-1 rounded text-dark secondary-bg">
                                Contact Us
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Jumbo>
        
    )
}

Jumbotron.defaultProps = {
    jumboShow: true
}

export default Jumbotron
