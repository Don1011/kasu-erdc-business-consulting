import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/pages/Home.js';
import CreateFolder from './components/pages/CreateFolder.js';
import CreateAdmin from './components/pages/CreateAdmin.js';
import AdminList from './components/pages/AdminList.js';
import EditProfile from './components/pages/EditProfile.js';
import FolderDetails from './components/pages/FolderDetails.js';
import AdminDetails from './components/pages/AdminDetails.js';
import Profile from './components/pages/Profile.js';
import ClientList from './components/pages/ClientList.js';
import Notifications from './components/pages/Notifications.js';
import NotFound from './components/pages/NotFound.js';

const App = () => {
    const [ cookies ] = useCookies(['loggedInUserToken']);

    const [ userLoggedIn ] = useState((cookies['loggedInUserToken']) ? true : false );

    const [ adminStatus ] = useState((cookies['adminStatus']) ? cookies['adminStatus'] : "" );

    return (
        <Router>
            <Switch>
                <Route path = '/' exact >
                    <Home />
                </Route>
                <Route path = '/create-folder'>
                    {userLoggedIn ? <CreateFolder /> : <Redirect to = "/" />}
                </Route>
                <Route path = '/create-admin'>
                    {(userLoggedIn && adminStatus === "super") ? <CreateAdmin /> : <Redirect to = "/" />}
                </Route>
                <Route path = '/edit-profile/'>
                    {userLoggedIn ? <EditProfile /> : <Redirect to = "/" />}
                </Route>
                <Route path = '/folder-details/:id' exact>
                    {userLoggedIn ? <FolderDetails /> : <Redirect to = "/" />}
                </Route>
                <Route path = '/profile' exact>
                    {userLoggedIn ? <Profile /> : <Redirect to = "/" />}
                </Route>
                <Route path = '/admin-details/:id' exact>
                    {(userLoggedIn && adminStatus === "super") ? <AdminDetails /> : <Redirect to = "/" />} {/*super only*/}
                </Route>
                <Route path = '/client-list'>
                    {userLoggedIn ? <ClientList /> : <Redirect to = "/" />}
                </Route>
                <Route path = '/admin-list'>
                    {(userLoggedIn && adminStatus === "super") ? <AdminList /> : <Redirect to = "/" />} {/*super only*/}
                </Route>
                <Route path = '/notifications'>
                    {(userLoggedIn && adminStatus === "super") ? <Notifications /> : <Redirect to = "/" />} {/*super only*/}
                </Route>
                <Route path = '*'>
                    <NotFound />
                </Route>
                
            </Switch>
        </Router>
    )
}

export default App
