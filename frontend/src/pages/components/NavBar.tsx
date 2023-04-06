import { Link } from "react-router-dom";
import Logout from "../../hooks/Logout";

const NavBar = () => {
  const { loggingout } = Logout();

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
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
