import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../context/AuthorizationContext";

const Login = () => {
  const [error, setError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<
    boolean | undefined
  >(undefined);
  const dispatch = useDispatch();

  const logging = async (email: string, password: string) => {
    setIsLoading(true);
    setError(false);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch(loginUser(json));
      setIsLoading(false);
    }
  };

  return { logging, isLoading, error };
};

export default Login;
