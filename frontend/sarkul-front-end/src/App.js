
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Pages/Home';


function App() {
  const [isUser,setIsUser] = useState(false);
 
  return (
    <div className="App">
     

     
    {!isUser? ( <Login setIsUser={setIsUser}/>):(<Home/>)}
   
    </div>
  );
}

export default App;
