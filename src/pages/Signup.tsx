import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/profileSlice";

const Signup = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (password !== verifyPassword || firstName.length < 3) return;
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const namePattern = /^[\p{L}][\p{L}' -]{2,29}$/u;

    if (
      !passwordPattern.test(password) ||
      !emailPattern.test(emailId) ||
      namePattern.test(firstName) ||
      (lastName.length > 0 && namePattern.test(lastName))
    )
      return;
    try {
      const result = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      });
      dispatch(addUser(result.data));
      window.alert("Signed up successfully: Please login");
      navigate("/login");
    } catch (error) {
      window.alert("Signup failed " + error.response.data.error);
    }
  };
  return (
    <div className="flex justify-center items-center mt-24">
      <div className="card lg:card-side bg-base-100 shadow-sm w-1/2">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <div>
            <label className="input validator">
              <input
                type="text"
                placeholder="John"
                required
                onChange={(e) => setFirstName(e.target.value.trim())}
                pattern="[A-Za-z][A-Za-z' -]{2,29}"
                minLength={3}
                maxLength={30}
                title="Only letters, spaces, apostrophes, and hyphens are allowed."
                lang="en"
                inputMode="text"
              />
            </label>
            <div className="validator-hint hidden">
              Should be greater than 3 Characters
            </div>
          </div>

          <div>
            <label className="input validator">
              <input
                type="text"
                placeholder="Doe"
                required
                maxLength={30}
                onChange={(e) => setLastName(e.target.value.trim())}
              />
            </label>
          </div>
          <div>
            <label className="input validator">
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
                onChange={(e) => setEmailId(e.target.value.trim())}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <div>
            <label className="input validator">
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
                type="password"
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}"
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter <br />
              At least one specail character
            </p>
          </div>
          <div>
            <label className="input validator">
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
                type="password"
                placeholder="Confirm Password"
                pattern={password}
                onChange={(e) => setVerifyPassword(e.target.value.trim())}
              />
            </label>
            <p className="validator-hint">Passwords do not match</p>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>
          <div className="card-actions justify-center">
            <p>
              Have an account ?<br />
              <span
                className=" cursor-pointer text-blue-600"
                onClick={() => navigate("/login")}
              >
                LogIn
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
