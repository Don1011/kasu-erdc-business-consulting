import Jumbotron from './Jumbotron';
import NavigationBar from './NavigationBar';
 
const Header = ({ jumboShow }) => {
    return (
        <div  className = {jumboShow ? "jumbotron-navbar-parent primary-bg":"primary-bg"} >
            <NavigationBar jumboShow = {jumboShow} />

            <Jumbotron jumboShow = {jumboShow} />
        </div>
    )
}

export default Header
