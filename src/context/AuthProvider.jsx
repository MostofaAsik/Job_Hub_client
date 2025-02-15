import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import axios from 'axios';



export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const createSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)

    }

    const goooleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // const updateUserProfile = (name, photoURL) => {
    //     if (!auth.currentUser) {
    //         console.error('No user is logged in');
    //         return;
    //     }

    //     setLoading(true);
    //     return updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL })
    //         .then(() => {
    //             console.log('User profile updated successfully');
    //             setUser({ ...auth.currentUser });
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error('Error updating user profile:', error);
    //             setLoading(false);
    //         });
    // };


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (curentUser) => {
            console.log('current user from authProvider', curentUser);
            setUser(curentUser)

            //set token in cookie
            if (curentUser) {
                const user = { email: curentUser?.email }
                axios.post(`${import.meta.env.VITE_BASE_URL}/jwt`, user, { withCredentials: true })
                    .then((response) => {
                        console.log('set token', response.data);
                        setLoading(false)

                    })

            }
            // remove token from cookie
            else {
                axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, {}, { withCredentials: true })
                    .then((response) => {
                        console.log('remove token', response.data);
                        setLoading(false)

                    })
            }
        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        createSignIn,
        signOutUser,
        goooleLogin,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;