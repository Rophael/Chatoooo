import React from "react";
import styled from "styled-components";
import ani from "../assets/icon.webp";

export default function Welcome(user) {
  console.log(user);
  return (
    <Container>
      <img src={ani} alt="" />
      <h1>
        WELCOME <span>{user.user.username}!</span>
      </h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  img {
    max-width: 100%;
    height: auto;
  }
  h1 {
    font-size: 1.5rem;
    text-align: center;
  }
  span {
    color: #4e00ff;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 2.5rem;
    }
  }
};
`;
