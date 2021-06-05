import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../layout/Layout';
import ListEnumerator from '../presentational/ListEnumerator';
import { useCookies } from 'react-cookie';
import AlertComp from '../presentational/AlertComp';
import SearchForm from '../presentational/SearchForm';

const ClientList = () => {

    const history = useHistory();
    
    const [ cookies ] = useCookies(['loggedInUserToken'])
    
    const [ data, setData ] = useState([]);

    const [ dataSearchResults, setDataSearchResults ] = useState([]);

    const [ searchStart, setSearchStart ] = useState(false);
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_HOST}/fetch-clients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : cookies['loggedInUserToken']
            },
        })
        .then(res => res.json())
        .then(data => {
            setData(data.data.reverse())
        })
        .catch(err => {
            history.push('/')
        })
    }, [cookies, history])
    
    const searchData = (input) => {
        let result = [];
        if(input !== ""){
            setSearchStart(true);
            input = input.toLowerCase();
            result = data.filter(item => {
                // if((item.fullName.toLowerCase().indexOf(input) !== -1) || (item.email.toLowerCase().indexOf(input) !== -1) || (item.mobileNumber.toLowerCase().indexOf(input) !== -1)){
                //     return true;
                // }
                return (item.fullName.toLowerCase().indexOf(input) !== -1) || (item.email.toLowerCase().indexOf(input) !== -1) || (item.mobileNumber.toLowerCase().indexOf(input) !== -1)
            })
        }else{
            // setSearchStart(false);
        }
        setDataSearchResults(result)
    }
    
    return (
        <Layout
            jumboShow = {false}
            pageTitle = "Client List"
        >
            {(data.length > 0)?
                <>
                    <SearchForm 
                        placeholder = "Search client's full name, email or phone number." 
                        search = {searchData}
                    />

                
                    {(searchStart && dataSearchResults.length === 0) &&
                    
                        <AlertComp
                        variant = "danger"
                            message = "No Client matches the search query."
                            dismissable = {false}
                        />}
                    <ListEnumerator to = "folder-details" data = {(dataSearchResults.length > 0)? dataSearchResults:  data}/>
                </>
                :
                <AlertComp
                    variant = "success"
                    message = "No folder has been created yet."
                    dismissable = {false}
                />
                
            }
        </Layout>
        
    )
}

export default ClientList
