import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = ({ signIn }) => {
  const initialState = { username: "", password: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdUserToken = await signIn(input);

    if (createdUserToken) {
      console.log("logged in:)")
    } else {
      navigate("/");
    }

    // FORM EMPTIES OUT
    setInput(initialState);
  };


  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          autoComplete="off"
          className="auth-input"
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          autoComplete="off"
          className="auth-input"
          id="password"
          name="password"
          type="password"
          value={input.password}
          onChange={handleChange}
        />
        <br />
        <br />
        <input className="auth-log" type="submit" value="Login User" />
      </form>
    </>
  );
};

export default LoginForm;