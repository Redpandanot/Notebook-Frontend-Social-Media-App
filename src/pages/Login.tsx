import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/profileSlice.ts";
import { login } from "../api/auth.ts";

const Login = () => {
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggingIn, setLoggingIn] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoggingIn(true);
    e.preventDefault();
    try {
      const result = await login({
        emailId,
        password,
      });
      console.log(result);

      dispatch(addUser(result));
      return navigate("/");
    } catch (error) {
      setLoggingIn(false);
      window.alert("Login Failed : " + error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card lg:card-side bg-base-100 shadow-sm h-1/3">
        <form onSubmit={handleLogin}>
          <div className="card-body text-center">
            <div className="card-title flex justify-center">Log In</div>
            <div>
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </div>
            <div>
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=" cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    // eye-off
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[1em] opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.94M9.53 9.53A3 3 0 0 1 14.47 14.47" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    // eye
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[1em] opacity-50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                      <circle cx="12" cy="12" r={3} />
                    </svg>
                  )}
                </button>
              </label>
            </div>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loggingIn}
              >
                Login
              </button>
            </div>
            <div className="card-actions justify-center">
              <p>
                Don't have an account ?<br />
                <a
                  className="link link-hover link-info"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
