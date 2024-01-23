// react
import { useState, SyntheticEvent } from "react";
import { UserErrors } from "@/error";

// library
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      alert("Logined Successfully");
    } catch (err) {
      if (err?.response?.data?.type === UserErrors.USER_ALREADY_EXISTS) {
        alert("User already exists");
      } else {
        alert("Something went wrong");
      }
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
