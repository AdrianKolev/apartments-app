import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
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
              <Route path='/' element={<Find />}/>
              <Route path='/sellers' element={<Sellers />}/>
              <Route path='/profile' element={<SignIn />}/>
              <Route path='/sign-in' element={<SignIn />}/>
              <Route path='/sign-up' element={<SignUp />}/>
              <Route path='/forgot-password' element={<ForgotPassword />}/>
          </Routes>
          <NavBar />
      </Router>
    </>
  );
}

export default App;
