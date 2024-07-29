import React from "react";
import "./App.css";
import Main from "./Components/Main";

import { UserContext } from "./data";
import { useState } from "react";

function App() {
  const { Provider: UserInfo } = UserContext;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <UserInfo
        value={{
          isAuthenticated,
          currentUser,
          setAuth: setIsAuthenticated,
          setUser: setCurrentUser,
        }}
      >
        <Main />
      </UserInfo>
    </div>
  );
}

export default App;
