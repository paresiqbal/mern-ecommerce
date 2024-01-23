// react
import { useState, SyntheticEvent } from "react";

// library
import axios from "axios";

// error
import { UserErrors } from "@/error";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // catch register api
    try {
      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      alert("Registered Successfully");
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
      <h2>Register</h2>
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
