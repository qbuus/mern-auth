import { useState } from "react";
import Login from "../hooks/Login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logging, isLoading, error } = Login();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await logging(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Login</h3>

      <label>email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Login</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default LoginPage;
