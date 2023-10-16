import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 5rem;

  svg {
    font-size: 1.3rem;
    color: #9a86f3;
  }
  @media (max-width: 768px) {
    svg {
      font-size: 0.8rem;
    }
    right: 10%;
    padding: 0.4rem;
    margin-top: 0;
  }
`;
