import { Container, Row } from 'react-bootstrap'
import Header from '../presentational/Header';
import HomepageCard from '../presentational/HomepageCard';
import Footer from '../presentational/Footer';

const Home = () => {
    return (
        <>
            <Header jumboShow = {true} />
            <Container className = "mt-4">
                <Row className = "justify-content-center">
                    <HomepageCard
                        imageUrl = '../../img/expert.svg' 
                        imagePosition = "left"
                        body = "Expert business leaders and teachers at your service to ensure that your business succeeds."
                    />
                </Row>
                <Row className = "justify-content-center">                    
                    <HomepageCard
                        imageUrl = '../../img/consulting.svg' 
                        imagePosition = "right"
                        body = "Reputable and friendly customer service for the customer's comfort during service experience." 
                    />
                </Row>
                <Row className = "justify-content-center">                    
                    <HomepageCard
                        imageUrl = '../../img/data_security.svg' 
                        imagePosition = "left"
                        body = "Secure management of data gathered during consultation to ensure confidentiality." 
                    />
                </Row>
            </Container>
            <Footer />
        </>
    )
}

export default Home
