import {getAuth, updateProfile} from "firebase/auth";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg';



function Profile() {
    const auth = getAuth();

    // States
    const [changeDetails, setChangeDetails] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    // End States

    const {name, email} = formData;


    // Functions
    const onLogout = () => {
        auth.signOut();
        navigate('/')
    }

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {

                //Update Display Name in Firebase
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })

                //Update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }
        } catch (error) {
            toast.error("Could not update profile details")
        }
    }

    const onChange = (e) => {
        setFormData((prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        })))
    }
    // End functions

    return <div className="profile">
        <header className="profileHeader">
            <p className="pageHeader">

            </p>
            <button type="button" onClick={onLogout} className="logOut">Logout</button>
        </header>
        <main>
            <div className="profileDetailsHeader">
                <p className="profileDetailsText">
                    Personal Details
                </p>
                <p className="changePersonalDetails" onClick={() => {
                    changeDetails && onSubmit()
                    setChangeDetails((prevState => !prevState))
                }
                }>
                    {changeDetails ? "Done" : "Change"}
                </p>
            </div>

            <div className="profileCard">
                <form>
                    <input
                        type="text"
                        id="name"
                        className={!changeDetails ? 'profileName' : 'profileNameActive'}
                        disabled={!changeDetails}
                        value={name}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        id="email"
                        className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                        disabled={!changeDetails}
                        value={email}
                        onChange={onChange}
                    />
                </form>
            </div>

            <Link to='/create-listing' className="createListing">
                <img src={homeIcon} alt="home"/>
                <p>Sell or rent your home</p>
                <img src={arrowRight} alt="arrow" />
            </Link>
        </main>
    </div>
}

export default Profile;
