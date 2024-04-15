import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Routes, Route } from "react-router-dom";

import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import ProtectedRoute from "./utilities/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SignIn />} path="/login" />
        <Route element={<Signup />} path="/register" />
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="/" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
