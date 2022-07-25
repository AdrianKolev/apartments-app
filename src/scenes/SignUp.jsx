import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config';
import {doc, serverTimestamp, setDoc} from 'firebase/firestore';
import {ReactComponent as ArrowRightIcon} from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {toast} from "react-toastify";
import OAuth from "../components/OAuth";

function SignUp() {

    // States
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    // End States

    // Consts
    const navigate = useNavigate();
    const {name, email, password} = formData;
    // End consts


    // Functions
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            // gets the target id and value -> passwordId, emailId, and their values
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user
            console.log(user);

            updateProfile(auth.currentUser, {
                displayName: name
            })

            const formDataDuplicate = {...formData}
            // remove password from object because we dont want it in the database
            delete formDataDuplicate.password
            // set server time to insert in database
            formDataDuplicate.timestamp = serverTimestamp();
            // update data base and add data to the users collection
            await setDoc(doc(db, 'users', user.uid), formDataDuplicate)

            navigate('/profile');

        } catch (error) {
            toast.error('Something went wrong!')
        }
    }
    // END Functions

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">
                        Hello, please feel free to register!
                    </p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input
                            type='text'
                            className='nameInput'
                            placeholder='Name'
                            id='name'
                            value={name}
                            onChange={onChange}
                        />

                        <input
                            type='email'
                            className='emailInput'
                            placeholder='Email'
                            id='email'
                            value={email}
                            onChange={onChange}
                        />

                        <div className='passwordInputDiv'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className='passwordInput'
                                placeholder='Password'
                                id='password'
                                value={password}
                                onChange={onChange}
                            />

                            <img
                                src={visibilityIcon}
                                alt='show password'
                                className='showPassword'
                                onClick={() => setShowPassword((prevState) => !prevState)}
                            />
                        </div>
                        <Link to='/forgot-password' className='forgotPasswordLink'>
                            Forgot Password
                        </Link>

                        <div className="signUpBar">
                            <p className="signUpText">
                                Sign Up
                            </p>
                            <button className="signUpButton">
                                <ArrowRightIcon fill="#ffffff" width='34px' height='34px'/>
                            </button>
                        </div>
                    </form>
                    <OAuth/>
                    <div>
                        <Link to='/sign-in' className='registerLink'>Sign in if you registered!</Link>
                    </div>
                </main>
            </div>
        </>
    )

}

export default SignUp;
