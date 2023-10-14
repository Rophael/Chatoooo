// import React, { useEffect, useState, useRef } from "react";
// import styled from "styled-components";
// import Logout from "./Logout";
// import ChatInput from "./ChatInput";
// import { apiRoutes } from "../utils/apiRoutes";
// import { RiCheckDoubleFill } from "react-icons/ri";
// // import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// export default function ChatContainer({ currentChat, currentUser, socket }) {
//   const token = localStorage.getItem("Chat-app-user");
//   const scrollRef = useRef();
//   const [messages, setMessages] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);

//   useEffect(() => {
//     if (currentChat) {
//       axios
//         .get(apiRoutes.getAllMessages, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//             from: currentUser._id,
//             to: currentChat._id,
//           },
//         })
//         .then((res) => {
//           if (res.data.status === true) {
//             setMessages(res.data.messages);
//           }
//           if (res.data.status === false) {
//             console.log(res.data.message);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   });
//   useEffect(() => {
//     if (currentUser) {
//       // Assuming you have an API endpoint to mark the chat as seen
//       axios
//         .post(apiRoutes.markChatAsSeen, { chatId: currentUser._id })
//         .then((res) => {
//           if (res.data.status === true) {
//             console.log(res.data.message);
//           }
//           if (res.data.status === false) {
//             console.log(res.data.message);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [currentUser, token, socket]);

//   const handleSendMsg = async (msg) => {
//     socket.current.emit("send-message", {
//       from: currentUser._id,
//       to: currentChat._id,
//       message: msg,
//     });
//     const msags = [...messages];
//     msags.push({
//       fromSelf: true,
//       message: msg,
//     });
//     setMessages(msags);
//     const data = {
//       from: currentUser._id,
//       to: currentChat._id,
//       message: msg,
//     };
//     await axios
//       .post(apiRoutes.addMessage, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   useEffect(() => {
//     if (socket.current) {
//       socket.current.on("receive-message", (msg) => {
//         setArrivalMessage({ fromSelf: false, message: msg });
//       });
//     }
//   });
//   useEffect(() => {
//     arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <Container>
//         <div className="chat-header">
//           <div className="user-details">
//             <div className="img">
//               <img
//                 src={`data:image/jpeg;base64,${currentChat.img}`}
//                 alt="profile"
//               ></img>
//             </div>
//             <div className="username">
//               <h3>{currentChat.username}</h3>
//             </div>
//             <Logout />
//           </div>
//         </div>
//         <div className="chat-messages">
//           {messages.map((msg) => {
//             return (
//               <div ref={scrollRef} key={uuidv4()}>
//                 <div
//                   className={`message ${msg.fromSelf ? "sended" : "received"}`}
//                 >
//                   <div className="content">
//                     <p>{msg.message}</p>
//                     <div className="message-info">
//                       <span className="timestamp">{msg.sentAt}</span>
//                       {msg.fromSelf && (
//                         <span
//                           className={`seen-indicator ${
//                             msg.seen ? "seen" : "not-seen"
//                           }`}
//                         >
//                           <RiCheckDoubleFill />
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <ChatInput handleSendMsg={handleSendMsg} />
//       </Container>
//       {/* <ToastContainer /> */}
//     </>
//   );
// }

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 10% 80% 10%;
//   gap: 0.1rem;
//   overflow: hidden;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     grid-template-rows: 15% 70% 15%;
//   }
//   .chat-header {
//     background-color: #9a86f3;
//     border-radius: 10rem;
//     padding: 1rem;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 1rem;
//     .user-details {
//       display: flex;
//       align-items: center;
//       gap: 1rem;
//       .img {
//         img {
//           height: 3rem;
//           width: 3rem;
//           border-radius: 50%;
//           position: relative;
//           border: 2px solid #fff;
//           top: 0.2rem;
//         }
//       }
//       .username {
//         h3 {
//           color: black;
//         }
//       }
//     }
//   }
//   .chat-messages {
//     padding: 1rem 1rem;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//     &::-webkit-scrollbar {
//       width: 0.2rem;
//       &-thumb {
//         background-color: #ffffff39;
//         width: 0.1rem;
//         border-radius: 1rem;
//       }
//     }
//     .message {
//       display: flex;
//       align-items: center;
//       .content {
//         max-width: 40%;
//         overflow-wrap: break-word;
//         padding: 1rem;
//         font-size: 1.1rem;
//         border-radius: 1rem;
//         color: #d1d1d1;
//         @media screen and (min-width: 720px) and (max-width: 1080px) {
//           max-width: 70%;
//         }
//         .message-info {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 0.5rem;
//           .timestamp {
//             font-size: 0.8rem;
//           }
//           .seen-indicator {
//             svg {
//               font-size: 1.2rem;
//               color: #ffffff39;
//             }
//             &.seen {
//               svg {
//                 color: white;
//               }
//             }
//             &.not-seen {
//               svg {
//                 color: #ffffff39;
//               }
//             }
//           }
//         }
//       }
//     }
//     .sended {
//       justify-content: flex-end;
//       .content {
//         background-color: #9900ff;
//       }
//     }
//     .received {
//       justify-content: flex-start;
//       .content {
//         background-color: #ffffff39;
//       }
//     }
//   }
// `;

import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import { apiRoutes } from "../utils/apiRoutes";
import { RiCheckDoubleFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const token = localStorage.getItem("Chat-app-user");
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // console.log(socket.current);
  useEffect(() => {
    if (currentChat) {
      axios
        .get(apiRoutes.getAllMessages, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            from: currentUser._id,
            to: currentChat._id,
          },
        })
        .then((res) => {
          if (res.data.status === true) {
            setMessages(res.data.messages);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, currentChat, currentUser]);

  useEffect(() => {
    if (currentUser) {
      axios
        .post(apiRoutes.markChatAsSeen, { chatId: currentUser._id })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentUser, token, socket]);

  const handleSendMsg = useCallback(
    async (msg) => {
      socket.current.emit("send-message", {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      const updatedMessages = [...messages];
      updatedMessages.push({ fromSelf: true, message: msg });
      setMessages(updatedMessages);
      const data = {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      };
      try {
        await axios.post(apiRoutes.addMessage, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    [currentUser, currentChat, messages, socket, token]
  );

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="img">
            <img
              src={`data:image/jpeg;base64,${currentChat.img}`}
              alt="profile"
            ></img>
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
          <Logout />
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div ref={scrollRef} key={uuidv4()}>
            <div className={`message ${msg.fromSelf ? "sended" : "received"}`}>
              <div className="content">
                <p>{msg.message}</p>
                <div className="message-info">
                  <span className="timestamp">{msg.sentAt}</span>
                  {msg.fromSelf && (
                    <span
                      className={`seen-indicator ${
                        msg.seen ? "seen" : "not-seen"
                      }`}
                    >
                      <RiCheckDoubleFill />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    background-color: #9a86f3;
    border-radius: 10rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .img {
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          position: relative;
          border: 2px solid #fff;
          top: 0.2rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
        .message-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.5rem;
          .timestamp {
            font-size: 0.8rem;
          }
          .seen-indicator {
            svg {
              font-size: 1.2rem;
              color: #ffffff39;
            }
            &.seen {
              svg {
                color: white;
              }
            }
            &.not-seen {
              svg {
                color: #ffffff39;
              }
            }
          }
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #9900ff;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #ffffff39;
      }
    }
  }
`;
