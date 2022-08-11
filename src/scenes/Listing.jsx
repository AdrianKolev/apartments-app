import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {db} from '../firebase.config';
import Spinner from "../components/Spinner";
import shareIcon from '../assets/svg/shareIcon.svg';

function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sharedLinkCopied, setSharedLinkCopied] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const auth = getAuth();

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'lists', params.listingId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setListing(docSnap.data());
                setLoading(false);
            }
        }

        fetchListing();
    }, [navigate, params.listingId])


    if (loading) {
        return <Spinner/>
    }

    return (
        <main>
            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setSharedLinkCopied(true);
                setTimeout(() => {
                    setSharedLinkCopied(false)
                }, 2000)
            }}>
                <img src={shareIcon}/>
            </div>
            {sharedLinkCopied && <p className="linkCopied">Link Copied</p>}
            <div className="listingDetails">
                <p className='listingName'>
                    {listing.name} - $
                    {listing.offer
                        ? listing.discountedPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : listing.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <p className="listingLocation">{listing.location}</p>
                <p className="listingType">For {listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
                {listing.offer && (
                    <p className='discountPrice'>
                        ${listing.regularPrice - listing.discountedPrice} discount
                    </p>
                )}

                <ul>
                    <li>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms > 1 ? `${listing.bedrooms} Bathrooms` : '1 Bathroom'}
                    </li>
                    {listing.parking &&
                        <li>
                            {'parking spot'}
                        </li>
                    }
                    {listing.furnished &&
                        <li>
                            {'Furnished'}
                        </li>
                    }
                </ul>

                <p className="listingLocationTitle">Location</p>


                {auth.currentUser?.uid !== listing.userRef && (
                    <Link
                        to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                        className='primaryButton'
                    >
                        Contact owner
                    </Link>
                )}
            </div>
        </main>
    )
}

export default Listing