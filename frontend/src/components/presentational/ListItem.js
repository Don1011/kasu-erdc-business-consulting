import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const ListItem = ({ linkId, message, client, to, from }) => {
    if(from === "notifications"){
        return (
            <Link className = "no-effect" to = {`/${to}/${linkId}`}>
                <Card className = "secondary-bg-fade client-list-item my-3 p-3">
                    <Container>
                        <Row>
                            <Col className = "p-2">
                                {`${message}`}
                            </Col> 
                        </Row>
                    </Container>
                </Card>
            </Link>
        )
    }else{
        return (
            <Link className = "no-effect" to = {`/${to}/${client._id}`}>
                <Card className = "secondary-bg-fade client-list-item my-3 p-3">
                    <Container>
                        <Row>
                            <Col className = "p-2" md = {4}><FaUser /> &nbsp;{client.fullName}</Col>
                            <Col className = "p-2" md = {4}><FaEnvelope /> &nbsp;{client.email}</Col>
                            <Col className = "p-2" md = {4}>{(from === "adminList")?  <><FaUser /> &nbsp;{client.bdsp}</> : <><FaPhone /> &nbsp;{client.mobileNumber}</>}</Col>
                        </Row>
                    </Container>
                </Card>
            </Link>
        )
    }
}

export default ListItem
