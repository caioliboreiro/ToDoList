import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username: formData.get("username"),
        password: formData.get("password"),
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <section className="login-section">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="login-header">Log in</h1>

        <div className="form-main">
          <label htmlFor="username">Username</label>
          <input
            className="username"
            name="username"
            type="text"
            id="username"
          />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          {error && <small style={{ color: "red" }}>{error}</small>}
          <button className="submit-btn" type="submit">
            Log in
          </button>

          <small>
            Don't have an Account? <Link to="/sign-up">Sign up</Link>
          </small>
        </div>
      </form>
    </section>
  );
}

export default Login;
