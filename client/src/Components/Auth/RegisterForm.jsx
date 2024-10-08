import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Auth.css"

const RegisterForm = ({ signUp }) => {
  const initialState = { username: "", password: "", firstName: "", lastName: "" };
  const [input, setInput] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdUserToken = await signUp(input);

    if (createdUserToken) {
      console.log("Created user token:)");
    } else {
      navigate("/dashboard");
    }
    // FORM EMPTIES OUT
    setInput(initialState);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            autoComplete="off"
            className="auth-input"
            label="Username"
            id="standard-basic"
            variant="standard"
            helperText="Please input username"
            name="username"
            value={input.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            autoComplete="off"
            className="auth-input"
            label="Password"
            type="password"
            id="standard-basic"
            variant="standard"
            helperText="Please create a password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            autoComplete="off"
            className="auth-input"
            label="First name"
            id="standard-basic"
            variant="standard"
            helperText="Please input your first name"
            name="firstName"
            value={input.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            autoComplete="off"
            className="auth-input"
            label="Last name"
            id="standard-basic"
            variant="standard"
            helperText="Please input your last name"
            name="lastName"
            value={input.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center mb-4">
          <button type="submit" className="create-account-button auth-sub">
            Create Account
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegisterForm;
