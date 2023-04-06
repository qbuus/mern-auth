import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./pages/components/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "./context/AuthorizationContext";

function App() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                user === null ? (
                  <Navigate to="/login" />
                ) : (
                  <Home />
                )
              }
            />
            <Route
              path="/login"
              element={
                user === null ? <Login /> : <Navigate to="/" />
              }
            />
            <Route
              path="/signup"
              element={
                user === null ? <Signup /> : <Navigate to="/" />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
