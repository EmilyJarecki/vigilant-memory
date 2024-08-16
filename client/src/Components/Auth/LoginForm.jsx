import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Auth.css"

const LoginForm = ({ signIn }) => {
  const initialState = { username: "", password: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdUserToken = await signIn(input);

    if (createdUserToken) {
      navigate("/dashboard");
    } else {
      // navigate("/auth");
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
        {/* <label htmlFor="username">Username: </label>
        <input
          autoComplete="off"
          className="auth-input"
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
        /> */}
        <div>
          <TextField
            label="Username"
            autoComplete="off"
            className="auth-input"
            id="standard-basic"
            variant="standard"
            name="username"
            helperText="Please input username"
            value={input.username}
            onChange={handleChange}
          />
        </div>
        {/* <br />
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
        /> */}

        <div>
          <TextField
            label="Password"
            name="password"
            autoComplete="off"
            className="auth-input"
            id="standard-basic"
            variant="standard"
            type="password"
            helperText="Please input password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        {/* <input className="auth-log" type="submit" value="Login User" /> */}
        <div class="flex justify-center mb-4">
          <button type="submit" className="login-button auth-log">
            Log In
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
