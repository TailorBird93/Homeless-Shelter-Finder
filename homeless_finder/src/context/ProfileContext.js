import { serverTimestamp } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db, addDoc,collection, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase";


const ProfileContext = createContext();

const useProfile = () => {
    return useContext(ProfileContext);
}

const ProfileProvider = ({children}) => {

    const addProfile=async (profile) => {

        if (!profile.userId) {
            throw new Error("User ID is mandatory.")
        }

        await addDoc(collection(db, "profiles"), {
            ...profile,
            createdAt: serverTimestamp(), 
            updatedAt: serverTimestamp(),

        })
    }

    const exports={

    };

    return (
        <ProfileContext.Provider value={exports}>
             {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
export {useProfile };

