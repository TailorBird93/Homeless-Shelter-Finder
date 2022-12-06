import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import '../App.css';
const Login = () => {

const [email,setEmail]= useState("");
const [password, setPassword]= useState("");
const [loading, setLoading]=useState(false);
const [error,setError]=useState('')

const {login}=useAuth();

const navigate=useNavigate();

const onSubmit = async  (e)=>{
    e.preventDefault();
    try{
        setLoading(true);
        // goes to database

        await login({email, password})
        setLoading(false);
        
        // navigate to another page after veryfing registration
        navigate("/");

    }
    catch (err) {
        setLoading(false);
        console.log(err);
        setError(err.message)
    }
};

if (loading) return <div>loading...</div>

if (error) return <div>{error}</div>

    return (
        <div className="loginForm">
        <Link to='/'>Home</Link>
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            {error && <p>{error}</p>}
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
        <p>
            Haven't got an account? <Link to='/register'>Register</Link>
        </p>
        </div>
    );
};

export default Login;