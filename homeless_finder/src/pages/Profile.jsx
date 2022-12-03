import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { processFirebaseErrors } from "../firebase/errors";
const Profile = () => {

const [email,setEmail]= useState("");
const [password, setPassword]= useState("");
const [loading, setLoading]=useState(false);
const [error,setError]=useState('')

const {register}=useAuth();

const navigate=useNavigate();

const onSubmit = async  (e)=>{
    e.preventDefault();
    try{
        setLoading(true);
        // goes to database

        await register({email, password})
        setLoading(false);
        
        // navigate to another page after veryfing registration
        navigate("/");

    }
    catch (err) {
        setLoading(false);
        console.log(err);
        setError(processFirebaseErrors(err.message));
    }
};

if (loading) return <div>loading...</div>

    return (
        <>
        <Link to='/'>Home</Link>
        <form onSubmit={onSubmit}>
            <h1>Profile </h1>
            {error && <p style={{color: "red"}}>{error}</p>}
            <label>Email</label>
            <input 
                type="text"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value);
                } }
            />

            <label>Password</label>
            <input 
                type="password"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                } }
            />
            
            <input type="submit" value="Submit" />

        </form>
        
        </>
    );
};

export default Profile;