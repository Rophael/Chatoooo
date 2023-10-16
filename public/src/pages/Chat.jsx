import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiRoutes, host } from "../utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentChat, setCurrentChat] = useState(undefined);

  const token = localStorage.getItem("Chat-app-user");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      handelCurrentUser();
      handelAllContacts();
    }
  });

  useEffect(() => {
    socket.current = io(host, {
      reconnection: true,
      reconnectionDelay: 1000, // Delay before the first reconnection attempt
      reconnectionAttempts: 3, // Number of reconnection attempts
    });

    socket.current.emit("add-user", currentUser._id);
  }, [currentUser]);

  const handleApiError = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === "jwt expired") {
        localStorage.removeItem("Chat-app-user");
        navigate("/login");
      }
      toast.error(error.response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      console.error(error);
    }
  };

  async function handelCurrentUser() {
    try {
      const response = await axios.get(apiRoutes.currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === true) {
        setCurrentUser(response.data.data);
      } else {
        handleApiError(response);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handelAllContacts() {
    try {
      const response = await axios.get(apiRoutes.getAll, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === true) {
        setContacts(response.data.data);
      } else {
        handleApiError(response);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  const handelChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="chat">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handelChatChange}
          />
          {currentChat === undefined ? (
            <Welcome user={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  .chat {
    height: 98vh;
    width: 98vw;
    background-color: #333768;
    display: grid;
    border-radius: 3rem;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1024px) {
      grid-template-columns: 35% 65%;
    }
    @media screen and (max-width: 719px) {
      grid-template-columns: 100%; /* Full-width for smaller screens */
    }
  }
`;
export default Chat;
