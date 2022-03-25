import axios from "axios";
import React, { useState } from "react";

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState("");

  //   Handle inputs
  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/register", {
        uname: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const [onLogin, setOnLogin] = useState(false);

  const style = {
    visibility: onLogin ? "visible" : "hidden",
    opacity: onLogin ? 1 : 0,
  };

  return (
    <section className="login-page">
      <div className="login create-note">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            id="login-email"
            value={user.email}
            autoComplete="true"
            placeholder="Email"
            onChange={onChangeInputs}
            required
          />
          <input
            type="password"
            name="password"
            id="login-password"
            value={user.password}
            autoComplete="true"
            placeholder="Password"
            onChange={onChangeInputs}
            required
          />

          <button type="submit">Login</button>
          <p>
            You don't have an account
            <span onClick={() => setOnLogin(true)}>Register Now </span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
      <div className="register create-note" style={style}>
        <h2>Register</h2>
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="name"
            id="register-name"
            value={user.name}
            autoComplete="true"
            placeholder="User Name"
            onChange={onChangeInputs}
            required
          />
          <input
            type="email"
            name="email"
            id="register-email"
            value={user.email}
            autoComplete="true"
            placeholder="Email"
            onChange={onChangeInputs}
            required
          />
          <input
            type="password"
            name="password"
            id="register-password"
            value={user.password}
            autoComplete="true"
            placeholder="Password"
            onChange={onChangeInputs}
            required
          />

          <button type="submit">Register</button>
          <p>
            You have an account?
            <span onClick={() => setOnLogin(false)}>Login Now </span>
          </p>
          <h3>{err}</h3>
        </form>
      </div>
    </section>
  );
};

export default Login;
