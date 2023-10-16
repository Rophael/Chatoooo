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
      if (currentUser.img === undefined) {
        currentUser.img =
          "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
      }
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
          <Brand>
            <img src={logo} alt="" />
          </Brand>
          <ContactList>
            {contacts.map((contact, index) => {
              return (
                <Contact
                  className={index === currentSelected ? "selected" : ""}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <ContactImage>
                    <img
                      src={
                        contact.img === undefined
                          ? "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                          : `data:image/jpeg;base64,${contact.img}`
                      }
                      alt="contact profile"
                    />
                  </ContactImage>
                  <ContactUsername>
                    <h3>{contact.username}</h3>
                  </ContactUsername>
                </Contact>
              );
            })}
          </ContactList>
          <CurrentUser>
            <CurrentUserImage>
              <img
                src={
                  currentUserImg === undefined
                    ? "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                    : `data:image/jpeg;base64,${currentUserImg}`
                }
                alt="profile"
              />
            </CurrentUserImage>
            <CurrentUsername>
              <h1>{currentUserName}</h1>
            </CurrentUsername>
          </CurrentUser>
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
  height: 100vh;

  @media screen and (min-width: 768px) {
    grid-template-rows: 15% 65% 20%;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  img {
    height: 4rem;
    width: 8rem;
  }
`;

const ContactList = styled.div`
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

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  }
`;

const Contact = styled.div`
  background-color: #e3e4e6;
  border-radius: 5rem;
  min-height: 5rem;
  cursor: pointer;
  padding: 0.9rem;
  gap: 1rem;
  align-items: center;
  display: flex;
  transition: 0.5s ease-in-out;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 1rem;
  }
`;

const ContactImage = styled.div`
  img {
    height: 4rem;
    border-radius: 1rem;
    width: 4rem;
    border: 2px solid #fff;
  }
`;

const ContactUsername = styled.div`
  h3 {
    color: black;
  }
`;

const CurrentUser = styled.div`
  background-color: #9a86f3;
  height: 7rem;
  width: 100%;
  border-radius: 5rem;
  gap: 3rem;
  display: flex;
  align-items: center;
  transition: 0.5s ease-in-out;
  padding: 0.5rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  }
`;

const CurrentUserImage = styled.div`
  img {
    height: 4rem;
    width: 4rem;
    border-radius: 2rem;
    border: 2px solid #fff;
  }
`;

const CurrentUsername = styled.div`
  h1 {
    color: black;
    font-size: 2rem;

    @media screen and (min-width: 768px) {
      font-size: 1rem;
    }
  }
`;

export default Contacts;
