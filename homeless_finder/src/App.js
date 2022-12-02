import { useAuth } from './context/authContext';
import './App.css';

function App() {

  const {user}= useAuth();

  if (user) return <div>{user.email}</div>
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
