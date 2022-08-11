import {useState, useEffect} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";

function Contact() {

    const [message, setMessage] = useState('');
    const [owner, setOwner] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();

    const onChange = (e) => setMessage(e.target.value)
    useEffect(() => {

        const getOwner = async () => {
            const docRef = doc(db, 'users', params.listingOwnerId)
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                setOwner(docSnap.data())
            }else {
                toast.error('Could not get the owner data')
            }
        }

        getOwner();

    }, [params.listingOwnerId])

    return (
        <div className="pageContainer">
            <header className="pageHeader">
                Contact the owner
            </header>

            {owner !== null && (
                <main>
                    <div className="contactOwner">
                        <p className="ownerName">Contact {owner?.name}</p>
                    </div>

                    <form className='messageForm'>
                        <div className='messageDiv'>
                            <label htmlFor='message' className='messageLabel'>
                                Message
                            </label>
                            <textarea
                                name='message'
                                id='message'
                                className='textarea'
                                value={message}
                                onChange={onChange}
                            ></textarea>
                        </div>
                        {console.log(owner.email)}
                        <a
                            href={`mailto:${owner.email}?Subject=${searchParams.get(
                                'listingName'
                            )}&body=${message}`}
                        >
                            <button type='button' className='primaryButton'>
                                Send Message
                            </button>
                        </a>
                    </form>
                </main>
            )}

        </div>
    )
}

export default Contact;