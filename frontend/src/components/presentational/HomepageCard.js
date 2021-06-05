import { Card, Container, Row, Col } from 'react-bootstrap';

const HomepageCard = ({ imageUrl, imagePosition, body }) => {
    if(imagePosition === "left"){
        return (
            <Card className = "p-2 m-2">
                <Container>
                    <Row>
                        <Col md = {6}>
                            <Card.Img className = "card-image-height " src = {imageUrl} />
                        </Col>
                        <Col md = {6} className = " my-auto">
                            <Card.Body>
                                <p> 
                                    {body}
                                </p>
                            </Card.Body> 
                        </Col>
                    </Row>
                </Container>
            </Card>
        )
    }else if(imagePosition === "right"){
        return (
            <Card className = "p-2 m-2">
                <Container>
                    <Row>
                        <Col md = {6} className = " my-auto">
                            <Card.Body>
                                <p> 
                                    {body}
                                </p>
                            </Card.Body> 
                        </Col>
                        <Col md = {6}>
                            <Card.Img className = "card-image-height " src = {imageUrl} />
                        </Col>
                    </Row>
                </Container>
            </Card>
        )
    }
    
}

export default HomepageCard
