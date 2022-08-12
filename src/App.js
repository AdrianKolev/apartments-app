import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Find from "./scenes/Find";
import Offers from "./scenes/Offers";
import Profile from "./scenes/Profile";
import SignIn from "./scenes/SignIn";
import SignUp from "./scenes/SignUp";
import Category from "./scenes/Category";
import ForgotPassword from "./scenes/ForgotPassword";
import CreateListing from "./scenes/CreateListing";
import EditListing from "./scenes/EditListing";
import Listing from "./scenes/Listing";
import Contact from "./scenes/Contact";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Find/>}/>
                    <Route path='/sellers' element={<Offers/>}/>
                    <Route path='/category/:categoryName' element={<Category/>}/>
                    <Route path='/profile' element={<ProtectedRoute />}>
                        <Route path='/profile' element={<Profile/>}/>
                    </Route>
                    <Route path='/sign-in' element={<SignIn/>}/>
                    <Route path='/sign-up' element={<SignUp/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path='/create-listing' element={<CreateListing/>}/>
                    <Route path='/edit-listing/:listingId' element={<EditListing/>}/>
                    <Route path='/category/:categoryName/:listingId' element={<Listing/>}/>
                    <Route path='/contact/:listingOwnerId' element={<Contact/>}/>
                </Routes>
                <NavBar/>
            </Router>
            {/* Toastify documentation -> https://fkhadra.github.io/react-toastify/introduction/ */}
            <ToastContainer />
        </>
    );
}

export default App;
