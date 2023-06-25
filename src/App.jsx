import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Country from "./pages/Country";
import { useState } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Context } from "./Context";

function App() {
  const [countryName, setCountryName] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [dark, setDark] = useState(true);
  return (
    <>
      <Context.Provider
        value={{
          countryName,
          setCountryName,
          countryList,
          setCountryList,
          dark,
          setDark,
        }}
      >
        <Nav />
        <Router>
          <Routes>
            <Route path="/country-rest-api" element={<Home />} />
            <Route path={`/${"country"}`} element={<Country />} />
          </Routes>
        </Router>
      </Context.Provider>
    </>
  );
}

export default App;
