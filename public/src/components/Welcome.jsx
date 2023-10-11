import React from "react";
import styled from "styled-components";
import ani from "../assets/icon.webp";

export default function Welcome(user) {
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
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
