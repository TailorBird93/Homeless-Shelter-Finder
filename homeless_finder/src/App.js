import { useAuth } from './context/authContext';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {

  const {user, logout}= useAuth();
  const navigate=useNavigate();

  if (user) return (
    <div>
      <h2>Hello {user.email} </h2>
      <button onClick={logout}>Logout</button>
    </div>
  )
  
  
  return (
    <div className="App">

      <h1>Homeless Shelter Finder</h1>
      <h2>Home, not a house.</h2>

      <div className='buttons'>
      <button onClick={() => navigate("/login")}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
      </div>


    </div>
  );
}

export default App;
