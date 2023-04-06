import { useDispatch } from "react-redux";
import { logoutUser } from "../context/AuthorizationContext";

const Logout = () => {
  const dispatch = useDispatch();

  const loggingout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  return { loggingout };
};

export default Logout;
