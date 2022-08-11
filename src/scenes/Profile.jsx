import {getAuth, updateProfile} from "firebase/auth";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {collection, doc, getDocs, orderBy, query, updateDoc, where, deleteDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg';
import ListingItem from "../components/ListingItem";

function Profile() {
    const auth = getAuth();

    // States
    const [changeDetails, setChangeDetails] = useState(false);
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    // End States

    const {name, email} = formData;

    useEffect(() => {
        const fetchUserListing = async  () => {
            const listingsRef = collection(db, 'lists');
            const q = query(
                listingsRef,
                where('userRef', '==', auth.currentUser.uid),
                orderBy('timestamp', 'desc')
            )

            const querySnap = await getDocs(q);

            const listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings(listings);
            setLoading(false);

        }

        fetchUserListing();
    }, [auth.currentUser.uid])


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

    const onDelete = async (listingId) => {
        if (window.confirm('Are you sure you want to delete?')) {
            await deleteDoc(doc(db, 'lists', listingId))
            const updatedListings = listings.filter(
                (listing) => listing.id !== listingId
            )
            setListings(updatedListings)
            toast.success('Successfully deleted property')
        }
    }

    const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)

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

            {!loading && listings?.length > 0 && (
                <>
                    <p className='listingText'>Your Listings</p>
                    <ul className='listingsList'>
                        {listings.map((listing) => (
                            <ListingItem
                                key={listing.id}
                                listing={listing.data}
                                id={listing.id}
                                onDelete={() => onDelete(listing.id)}
                                onEdit={() => onEdit(listing.id)}
                            />
                        ))}
                    </ul>
                </>
            )}

        </main>
    </div>
}

export default Profile;
