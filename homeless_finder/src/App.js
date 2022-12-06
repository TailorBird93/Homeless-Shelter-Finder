import { useAuth } from './context/authContext';
import './App.css';
import { useNavigate } from 'react-router-dom';
import image from "./assets/images/background.jpg";
function App() {

  const {user, logout}= useAuth();
  const navigate=useNavigate();

  if (user) return (
    <div className='userMain'>
      <h2>Hello {user.email}</h2>
       <h2>who can you give shelter to today? </h2>
      <button onClick={logout}>Logout</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
    </div>
  )
  
  
  return (
    <div className="App">
      
        <h1>Homeless Shelter Finder</h1>
        <h2>Offer your home as an emergency shelter.</h2>

        <div className='buttons'>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        </div>
    
    </div>
  );
}

export default App;
