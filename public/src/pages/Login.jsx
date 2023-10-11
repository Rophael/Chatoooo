import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo13.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiRoutes } from "../utils/apiRoutes";
import icon from "../assets/logo3.gif";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("Chat-app-user")) {
      navigate("/chat");
    }
  });

  const handelSubmit = async (event) => {
    event.preventDefault();
    if (handelValidate) {
      axios
        .post(apiRoutes.login, values)
        .then((res) => {
          if (res.data.status === true) {
            toast.success("Login Successfully", {
              position: "bottom-right",
              autoClose: 5000,
              pauseOnHover: true,
              draggable: true,
            });
            setTimeout(() => {
              localStorage.setItem("Chat-app-user", res.data.token);
              navigate("/chat");
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

  const handelValidate = () => {
    if (values.email === "" || values.password === "") {
      toast.error("Please fill all the fields");
      return false;
    } else if (!values.email.includes("@")) {
      toast.error("Please enter a valid email", {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });
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
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(event) => {
            handelSubmit(event);
          }}
        >
          <div className="brand">
            <img src={logo} alt="LOGO" />
          </div>
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
            onChange={(e) => {
              handelChange(e);
            }}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
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
    padding: 5rem 5rem 5rem 5rem;
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
`;
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  img {
    width: 100%;
    height: 30rem;
  }
`;
export default Login;
