import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo13.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import icon from "../assets/logo3.gif";
function Register() {
  // validate password
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const updateRequirements = (password) => {
    setRequirements({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    });
  };
  //
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem("Chat-app-user")) {
      navigate("/");
    }
  });

  const handelSubmit = (event) => {
    event.preventDefault();

    if (handelValidate()) {
      axios
        .post(apiRoutes.register, values)
        .then((res) => {
          if (res.data.status === true) {
            toast.success("Registered Successfully", {
              position: "bottom-right",
              autoClose: 5000,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              localStorage.setItem("Chat-app-user", res.data.token);
              navigate("/setImg");
            }, 1000);
          }
          if (res.data.status === false) {
            toast.error(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              pauseOnHover: true,
              draggable: true,
            });
          }
        })
        .catch((err) => {
          toast.error("Something went wrong", {
            position: "bottom-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
          });
        });
    }
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };
  const handelValidate = () => {
    if (
      values.username === "" ||
      values.email === "" ||
      values.password === "" ||
      values.confirmPassword === ""
    ) {
      toast.error("Please fill all the fields");
      return false;
    } else if (values.username.length < 3) {
      toast.error("Username must be 3 characters long", toastOptions);
      return false;
    } else if (!values.email.includes("@")) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    } else if (values.password.length < 8) {
      toast.error("Password must be 8 characters long", toastOptions);
      return false;
    } else if (values.password !== values.confirmPassword) {
      toast.error("Password and confirm password not matched", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handelChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "password") {
      updateRequirements(event.target.value);
    }
  };
  const [showRequirements, setShowRequirements] = useState(false);
  const handlePasswordInputFocus = () => {
    setShowRequirements(true);
  };
  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handelSubmit(event);
          }}
        >
          <img src={logo} alt="LOGO" />

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              handelChange(e);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handelChange(e);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onFocus={handlePasswordInputFocus} // Show requirements when input is focused
            onBlur={() => setShowRequirements(false)} // Hide requirements when input loses focus
            onChange={(e) => {
              handelChange(e);
            }}
          />
          {showRequirements && (
            <div className="requirements">
              <ul className="password-requirements">
                <li className={requirements.minLength ? "checked" : ""}>
                  8 characters
                </li>
                <li className={requirements.hasUppercase ? "checked" : ""}>
                  one uppercase letter
                </li>
                <li className={requirements.hasLowercase ? "checked" : ""}>
                  one lowercase letter
                </li>
                <li className={requirements.hasNumber ? "checked" : ""}>
                  one number
                </li>
                <li className={requirements.hasSpecialChar ? "checked" : ""}>
                  one special character
                </li>
              </ul>
            </div>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => {
              handelChange(e);
            }}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <IconContainer>
        <img src={icon} alt="ICON" />
      </IconContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 3rem;
    background-color: #fff;
    padding: 2rem 5rem 2rem 5rem;
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
  }
  img {
    width: 20rem;
  }
  input {
    background-color: transparent;
    border: 1px solid #000;
    border-radius: 0.5rem;
    outline: none;
    font-size: 1.5rem;
    &:focus {
      background-color: #fff;
      border: 1px solid #000;
    }
  }
  button {
    width: 100%;
    background-color: #455a64;
    border: none;
    border-radius: 1rem;
    padding: 1rem 2rem;
    width: 100%;
    outline: none;
    font-size: 1.5rem;
    color: #90caf9;
    cursor: pointer;
    &:hover {
      background-color: #90caf9;
      color: #000;
      border: 1px solid #000;
    }
  }
  .checked {
    color: green; /* Change the text color to green */
    font-weight: bold;
  }
  .password-requirements li {
    margin-bottom: 0.1rem;
    font-size: 1rem;
  }

  .password-requirements li:not(.checked) {
    color: red;
  }
  /* Media query for smaller screens */
  @media (max-width: 768px) {
    form {
      margin-top: 13rem;
      overflow-y: auto;
      padding: 2rem 2rem 2rem 2rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 95vw;
    }
    span {
      font-size: 0.7rem;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
    max-height: 30rem; /* Set a maximum height to maintain the aspect ratio */
  }

  @media (max-width: 768px) {
    top: 20%; /* Adjust the vertical position for smaller screens */
    left: 50%; /* Center it horizontally on smaller screens */
    transform: translate(-50%, -50%);
  }
`;

export default Register;
