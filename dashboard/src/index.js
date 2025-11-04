import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { UserProvider } from "../src/context/UserContext"; // ✅ import the provider
import { GeneralContextProvider } from "../src/components/GeneralContext";


function App() {
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const userParam = params.get("user");
  if (userParam) {
    const user = JSON.parse(decodeURIComponent(userParam));
    console.log("Logged-in user context:", user);
    localStorage.setItem("dashboardUser", JSON.stringify(user)); // optional cache
  } else {
    console.log("No logged-in user found.");
  }
}, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GeneralContextProvider>
      <App />
    </GeneralContextProvider>
  </React.StrictMode>
);
