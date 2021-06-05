import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import UserDetailNormal from '../presentational/UserDetailNormal';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const [ cookies ] = useCookies(['loggedInUserToken']);
    const history = useHistory();

    const [ user, setUser ] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        adminStatus: ""
    });

    useEffect(() => {
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
                setUser(data.data)
                // console.log(data)
            }else{
                history.push("/")
            }
        })
        .catch(err => {
            history.push('/')
        })
    }, [cookies, history])

    const toTitleCase = (str) => {
        if (str) {
            let text = str.split(' ')
                .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ');
            return text;
        }
    }
    return (
        <Layout
            jumboShow = {false}
            pageTitle = "Your Profile"
            titleUnderText = { <span> You can <Link className = "primary-text" to = {`/edit-profile`} >edit your profile.</Link></span> }
        >
            <UserDetailNormal
                label = "Full name." value = {user.fullName}
            />
            <UserDetailNormal
                label = "Email address." value = {user.email}
            />
            <UserDetailNormal
                label = "Mobile number." value = {user.mobileNumber}
            />
            <UserDetailNormal
                label = "BDSP." value = {user.bdsp}
            />
            <UserDetailNormal
                label = "Admin Status." value = {toTitleCase(user.adminStatus)}
            />
        </Layout>
        
    )
}

export default Profile
