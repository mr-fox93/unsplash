import React from "react";
import { GlobalProvider } from "./global";
import "./App.css";
import MainPage from "./MainPage";

function App() {
  return (
    <GlobalProvider>
      <MainPage />
    </GlobalProvider>
  );
}

export default App;
