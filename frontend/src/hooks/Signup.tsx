import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../context/AuthorizationContext";
import { User } from "../models/User";

export const SignupHook = () => {
  const [error, setError] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(
    null
  );
  const dispatch = useDispatch();

  const signing = async (email: User, password: User) => {
    setIsLoading(true);
    setError(false);

    const response = await fetch("/api/user/signup", {
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

  return { signing, isLoading, error };
};

export default SignupHook;
