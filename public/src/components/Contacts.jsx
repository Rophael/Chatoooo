/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/logo13.png";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImg, setCurrentUserImg] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImg(currentUser.img);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImg && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt=""></img>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="img">
                    <img
                      src={`data:image/jpeg;base64,${contact.img}`}
                      alt=" contact profile"
                    ></img>
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="img">
              <img
                src={`data:image/jpeg;base64,${currentUserImg}`}
                alt="profile"
              ></img>
            </div>
            <div className="username">
              <h1>{currentUserName}</h1>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #020001;
  border-radius: 3rem;
  height: 100hv;
  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    img {
      height: 4rem;
      width: 8rem;
    }
  }
  .contacts {
    height: 100hv;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: auto;
    padding: 0.5rem;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #000;
        width: 0.4rem;
        border-radius: 0.5rem;
      }
    }

    .contact {
      background-color: #e3e4e6;
      border-radius: 5rem;
      min-height: 5rem;
      width: 80%;
      cursor: pointer;
      padding: 0.9rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .img {
        img {
          height: 4rem;
          border-radius: 1rem;
          width: 4rem;
          border: 2px solid #fff;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #9a86f3;
    height: 7rem;
    width: 100%;
    border-radius: 5rem;
    gap: 3rem;
    display: flex;
    align-items: center;
    transition: 0.5s ease-in-out;
    padding: 0.5rem;
    .img {
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 2rem;
        border: 2px solid #fff;
      }
    }
    .username {
      h1 {
        color: black;
        font-size: 2rem;
      }
    }
    @media screen and(min-width:720px) and (max-width: 1024px) {
      gap: 0.5rem;
      .username {
        h1 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
