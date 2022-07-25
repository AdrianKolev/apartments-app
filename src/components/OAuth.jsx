import {useLocation, useNavigate} from "react-router-dom";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../firebase.config"
import {toast} from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg"

function OAuth() {

    const navigate = useNavigate();
    const location = useLocation();

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check for user in database
            const userRef = doc(db, 'users', user.uid);
            const snapUser = await getDoc(userRef);

            // If user doesn't exist create user
            if (!snapUser.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });
            }
            navigate('/');

        } catch (error) {
            toast.error('Could not authorize with google')
        }
    }

    return (
        <div className="socialLogin">
            <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
            <button className="socialIconDiv" onClick={onGoogleClick}>
                <img className="socialIconImg" src={googleIcon} alt="google"/>
            </button>
        </div>
    );
}

export default OAuth;