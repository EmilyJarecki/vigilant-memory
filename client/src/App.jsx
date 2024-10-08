import React, { useState } from "react";
import "./App.css";
import Main from "./Components/Main";
import Header from "./Components/Header";
import { UserContext } from "./data";
import "./Styles/base.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";


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
        <Header />
        <Main />
      </UserInfo>
    </div>
  );
}

export default App;
