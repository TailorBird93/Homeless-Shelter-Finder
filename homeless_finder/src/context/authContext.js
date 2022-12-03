import { createContext, useContext, useEffect, useState } from "react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase";


const AuthContext = createContext();



const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {

    // needs state to hold user information
    const [user,setUser] = useState()

    // signup-register
    const register = async ({email, password}) => {
        await createUserWithEmailAndPassword(auth, email, password)
    } 
    // signIn- login
    const login = async ({email,password}) => {
        await signInWithEmailAndPassword (auth, email, password);
    }
    // signOut- logout
    const logout = async () => {
        await auth.signOut();
    }



    //  FIREBASE LISTENST TO ANY CHANGES IN USER STATUS 
    // When the component loads we want to check if the user logged in

    useEffect(() => {
        const unsubscribe= auth.onAuthStateChanged(async (user)=>{
            setUser(user);
        })
        return () => {
            unsubscribe();
        }
    }, []) // Only runs once


    const exports={
     user,
     register,
     login,
     logout,
    };

    return (
        <AuthContext.Provider value={exports}> {children} </AuthContext.Provider>
    );
};

export default AuthProvider;
export {useAuth};

