import { useState } from 'react';
import { AppContext, StateContext } from './AppContext';

import Register from './components/Register';
import Home from './components/Home';
import UserRegister from './components/UserRegister';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState(0);
  const [StatePath, setStatePath] = useState(0);
  const [stateName, setStateName] = useState(0)

  function updateToken(newToken) {
    setToken(newToken);
  }

  function updateState(newState) {
    setStatePath(newState);
  }
  
  function updateStateName(State) {
    setStateName(State);
  }

  return (
    <AppContext.Provider value={{ data: token, updateToken: updateToken }}>
      <StateContext.Provider value={{ StatePath: StatePath,stateName:stateName, updateState: updateState ,updateStateName: updateStateName }}>
        <div className="App">
          {token === 0 ? <Register /> : token === 1 ? <UserRegister /> : <Home />}
        </div>
      </StateContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
