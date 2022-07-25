import {Navigate, Outlet} from 'react-router-dom';
import {useAuthStatus} from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

// Reference for protected routes with firebase:
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase
const ProtectedRoute = () => {
    const  { loggedIn, checkingStatus } = useAuthStatus();

    if(checkingStatus) {
        return <Spinner />
    }

    return loggedIn ? <Outlet /> : <Navigate to='/sign-in'/>
}

export default ProtectedRoute;