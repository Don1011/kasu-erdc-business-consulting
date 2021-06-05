import { Container, Col, Row, Form } from 'react-bootstrap';

const SearchForm = ({placeholder, search}) => {
    const handleInput = e => {
        search(e.target.value)
    }
    return (
        <Container >
            <Row>
                <Col>
                    <Form className = "my-3">
                        <Form.Group>
                            <Form.Control onInput = {handleInput} placeholder = {placeholder} />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )  
}

export default SearchForm
