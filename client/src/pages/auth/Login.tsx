// react
import { useState, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// library
import axios from "axios";

// error
import { UserErrors } from "@/error";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // catch login api
    try {
      const result = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      setCookie("access_token", result.data.token);
      localStorage.setItem("userID", result.data.token);
      navigate("/");
    } catch (err) {
      let errorMessage: string = "";
      switch (err.response.data.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User not found";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username or password";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert("Error" + errorMessage);
    }
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username :</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  );
}
