
import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Home from './components/Pages/Home';
import axios from 'axios';

function App() {
  const [isUser,setIsUser] = useState(false);
  const id = setInterval(()=>{
     axios.get("https://sarkul-v5cz.onrender.com")
    .then(response=>{console.log("5 minutes, server revived")
                      console.log(response.data) })
                    },300000)
 
  return (
    <div className="App">
     

     
    {isUser? ( <Login setIsUser={setIsUser}/>):(<Home/>)}
   
    </div>
  );
}

export default App;
