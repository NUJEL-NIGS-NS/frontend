import { useState } from 'react';
import {AppContext} from './AppContext'

import Register from './components/Register';
import Home from './components/Home';
import UserRegister from './components/UserRegister';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [Token, setToken] = useState(0)

  function updateToken(newToken) {
    setToken(newToken);
  }

  return (
   <AppContext.Provider value={{data:Token, updateToken:updateToken}} >
  <div className="App">
    {Token===0?<Register/>:Token === 1?<UserRegister/>:<Home/>}
  </div>
</AppContext.Provider>
  );
}

export default App;
