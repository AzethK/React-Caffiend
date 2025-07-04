import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Authentication = (props) => {
  const { handleCloseModal } = props;
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const { signup, login } = useAuth();

  const validateInputs = () => {
    if (!email) return "Email is required.";
    if (!email.includes("@")) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (isAuthenticating) return "Authentication is already in progress.";
    return null;
  };

  async function handleAuthenticate() {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsAuthenticating(true);
      setError(null);
      if (isRegistration) {
        //register a user
        await signup(email, password);
      } else {
        //login a user
        await login(email, password);
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsAuthenticating(false);
    }
  }
  return (
    <>
      <h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
      <p>
        {isRegistration ? "Create an account!" : "Sign in to your account!"}
      </p>
      {error && <p>❌ {error}</p>}
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="********"
        type="password"
      />
      <button onClick={handleAuthenticate}>
        <p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
      </button>
      <hr />
      <div className="register-content">
        <p>
          {isRegistration
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{isRegistration ? "Sign in" : "Sign up"}</p>
        </button>
      </div>
    </>
  );
};

export default Authentication;
