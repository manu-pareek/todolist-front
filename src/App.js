import "./App.css";
import TextField from "@mui/material/TextField";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import AdminPage from "./pages/AdminPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  useEffect(() => {
    localStorage.getItem("role") ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);
  return (
    <div className="App">
      {/* <Signup /> */}
      <Router>
        <Routes>
          {isLoggedin && localStorage.getItem("role") === "user" && (
            <Route path="/" exact element={<Homepage />} />
          )}
          {isLoggedin && localStorage.getItem("role") === "admin" && (
            <Route path="/" exact element={<AdminPage />} />
          )}

          {!isLoggedin && <Route path="/" exact element={<Signup />} />}
          {/* {isLoggedin && <Route path="/" exact element={<Homepage />} />} */}
        </Routes>
      </Router>
      {/* <Homepage /> */}
      {/* <AdminPage /> */}
    </div>
  );
}

export default App;
