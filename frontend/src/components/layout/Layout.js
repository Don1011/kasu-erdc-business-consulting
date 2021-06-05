import { Container, Row, Col } from 'react-bootstrap';
import Header from '../presentational/Header';

const Layout = ({children, jumboShow, pageTitle, titleUnderText }) => {
    return (
        <>
            <Header jumboShow = {jumboShow} />

            <Container className = "my-5">
                <Row className = "text-center p-4">
                    <h2 className = "font-weight-bold">{pageTitle}</h2>
                    <p>{titleUnderText ? titleUnderText : ''}</p>
                </Row>
                <Row className = "justify-content-center">
                    <Col md = {8}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Layout
