import { useState } from 'react';
import {AppContext} from './AppContext'

import Register from './components/Register';
import Home from './components/Home';
import UserRegister from './components/UserRegister';

function App() {
  const [Token, setToken] = useState(0)

  function updateToken(newToken) {
    setToken(newToken);
  }

  return (
   <AppContext.Provider value={{data:Token, updateToken:updateToken}} >
  <div className="App">
    {Token===0?<Register/>:<Home/>}
  </div>
</AppContext.Provider>
  );
}

export default App;
