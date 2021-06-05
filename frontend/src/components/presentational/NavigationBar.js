import { useState, useEffect, useCallback } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import LoginFormModal from './LoginFormModal'

const Navigationbar = ({ jumboShow }) => {
    const history = useHistory()
    const [ cookies, setCookie, removeCookie ] = useCookies(['loggedInUserToken'])

    // state that decides if the navbar is transparent or has a background
    const [ jumboShowState, setJumboShowState ] = useState(jumboShow);
    const [ userLoggedIn, setUserLoggedIn ] = useState((cookies['loggedInUserToken']) ? true : false );

    const [ adminStatus, setAdminStatus ] = useState("");

    
    // function to handle scroll event
    const handleScroll = () => {
        if(window.pageYOffset >= 100){
            setJumboShowState(false);
        }else{
            setJumboShowState(true);
        }
    }

    const handleLogout = useCallback(() => {
        // e.preventDefault();
        removeCookie('loggedInUserToken');
        removeCookie('adminStatus');
        setUserLoggedIn(false);
        history.push("/");
    }, [history, removeCookie])

    // useEffect hook to add the event listener immediately the component is mounted
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        // fetch user
        if(userLoggedIn){
            fetch(`${process.env.REACT_APP_BACKEND_HOST}/get-admin`,{
                method : "GET",
                headers : {
                    "Content-Type": "application/json",
                    'Authorization' : cookies['loggedInUserToken']
                }
            })
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    setAdminStatus(data.data.adminStatus);
                }
                else{
                    handleLogout();
                }
            })
            .catch(err => {
                handleLogout();
            })
        }
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [cookies, handleLogout, userLoggedIn])

    return (
        <Navbar bg = "" sticky = "top" expand = "lg" collapseOnSelect className = {jumboShowState ? "" : "primary-bg"} variant = "dark">
            <Container>
                <Navbar.Brand href = "/">KASU-ERDC Business Consulting</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className = "" />
                <Navbar.Collapse id="responsive-navbar-nav" className = "d-offset-md-0">
                    {
                    !userLoggedIn ? 
                    <Nav className = "ml-auto text-center">
                        <LoginFormModal cookies = {cookies} setUserLoggedIn = {setUserLoggedIn} setCookie = {setCookie} />
                    </Nav>
                    :
                    <Nav className = "ml-auto text-center">
                        <Nav.Link className = "navbar-custom-links" href = "/">
                            Home
                        </Nav.Link >
                        <Nav.Link className = "navbar-custom-links" href = "/create-folder">
                            Create Folder
                        </Nav.Link >
                        <Nav.Link className = "navbar-custom-links" href = "/client-list">
                            Client List
                        </Nav.Link >
                        <Nav.Link className = "navbar-custom-links" href = "/profile">
                            Profile
                        </Nav.Link >
                        {(adminStatus === "super") &&
                        <>
                            <Nav.Link className = "navbar-custom-links" href = "/create-admin">
                                Create Admin
                                {/* super */}
                            </Nav.Link >
                            <Nav.Link className = "navbar-custom-links" href = "/admin-list">
                                Admin List
                                {/* super */}
                            </Nav.Link >
                            <Nav.Link className = "navbar-custom-links" href = "/notifications">
                                Notifications
                                {/* super */}
                            </Nav.Link >
                        </>
                        }
                        <Nav.Link className = "navbar-custom-links" onClick = {handleLogout}>
                            Logout
                        </Nav.Link >
                    </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

Navigationbar.defaultProps = {
    jumboShow: true
}

export default Navigationbar
