import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";

export const useAuthStatus = () => {
    // States
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    // End States


    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true)
            }
            setCheckingStatus(false);
        })
    })

    return {loggedIn, checkingStatus}

}
