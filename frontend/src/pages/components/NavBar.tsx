import { Link } from "react-router-dom";
import Logout from "../../hooks/Logout";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { loggingout } = Logout();

  const userState = useSelector((state: any) => state.user);

  const handleClick = () => {
    loggingout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <nav>
          {userState === null ? (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">signup</Link>
            </div>
          ) : (
            <div>
              <span>{userState.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
