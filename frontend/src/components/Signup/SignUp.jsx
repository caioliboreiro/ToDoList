import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const user = {
      first: formData.get("first"),
      last: formData.get("last"),
      username: formData.get("username"),
      password: formData.get("password"),
    };

    await axios.post(`http://localhost:3000/register`, user);

    navigate("/");
  }

  return (
    <section className="sign-up-section">
      <form onSubmit={handleSubmit} className="signUp-form">
        <h1 className="signUp-header">Create an account</h1>

        <div className="form-main">
          <div className="field-container">
            <label htmlFor="first">Name</label>
            <div className="name-container">
              <input type="text" name="first" id="first" />
              <label htmlFor="first" className="name-label">
                First Name
              </label>
            </div>

            <div className="name-container">
              <input type="text" name="last" id="last" />
              <label htmlFor="last" className="name-label">
                Last Name
              </label>
            </div>
          </div>

          <div className="field-container">
            <label htmlFor="username">Username</label>
            <input
              className="username"
              name="username"
              id="username"
              type="text"
            />
          </div>

          <div className="field-container">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <button className="submit-btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </section>
  );
}

export default SignUp;
