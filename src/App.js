import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Find from "./scenes/Find";
import Sellers from "./scenes/Sellers";
import Profile from "./scenes/Profile";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import ForgotPassword from "./scenes/ForgotPassword";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Find/>}/>
                    <Route path='/sellers' element={<Sellers/>}/>
                    <Route path='/profile' element={<ProtectedRoute />}>
                        <Route path='/profile' element={<Profile/>}/>
                    </Route>
                    <Route path='/sign-in' element={<SignIn/>}/>
                    <Route path='/sign-up' element={<SignUp/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                </Routes>
                <NavBar/>
            </Router>
            {/* Toastify documentation -> https://fkhadra.github.io/react-toastify/introduction/ */}
            <ToastContainer />
        </>
    );
}

export default App;
