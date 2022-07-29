import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loggedInState, loggedInUser } from "./atom";
import Header from "./routes/Header";

function App() {
  const [isLogin, setIsLogin] = useRecoilState(loggedInState);

  useEffect(() => {
    if (sessionStorage.getItem("loggedIn")) {
      setIsLogin(true);
    }
  });

  return (
    <BrowserRouter>
      <Header />

      <Router />
    </BrowserRouter>
  );
}

export default App;
