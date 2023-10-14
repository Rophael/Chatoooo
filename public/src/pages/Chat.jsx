// // import React, { useEffect, useState, useRef } from "react";
// // import styled from "styled-components";
// // import axios from "axios";
// // import { useNavigate } from "react-router-dom";
// // import { apiRoutes, host } from "../utils/apiRoutes";
// // import { ToastContainer, toast } from "react-toastify";
// // import Contacts from "../components/Contacts";
// // import Welcome from "../components/Welcome";
// // import ChatContainer from "../components/ChatContainer";
// // import { io } from "socket.io-client";

// // function Chat() {
// //   const socket = useRef();
// //   const navigate = useNavigate();
// //   const [contacts, setContacts] = useState([]);
// //   const [currentUser, setCurrentUser] = useState({});
// //   const [currentChat, setCurrentChat] = useState(undefined);

// //   useEffect(() => {
// //     if (!localStorage.getItem("Chat-app-user")) {
// //       navigate("/login");
// //     }
// //   });
// //   useEffect(() => {
// //     socket.current = io(host);
// //     socket.current.emit("add-user", currentUser._id);
// //   }, [currentUser]);

// //   const token = localStorage.getItem("Chat-app-user");
// //   const handelCurrentUser = async () => {
// //     await axios
// //       .get(apiRoutes.currentUser, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "multipart/form-data",
// //         },
// //       })
// //       .then((res) => {
// //         if (res.data.status === true) {
// //           setCurrentUser(res.data.data);
// //           // console.log("am here in current user success");
// //         }
// //         if (res.data.status === false) {
// //           if (res.data.message === "jwt expired") {
// //             localStorage.removeItem("Chat-app-user");
// //             navigate("/login");
// //           }
// //           console.log("am here in current user error");
// //           toast.error(res.data.message, {
// //             position: "bottom-right",
// //             autoClose: 5000,
// //             pauseOnHover: true,
// //             draggable: true,
// //           });
// //         }
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };
// //   const handelAllContacts = async () => {
// //     await axios
// //       .get(apiRoutes.getAll, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "multipart/form-data",
// //         },
// //       })
// //       .then((res) => {
// //         if (res.data.status === true) {
// //           // console.log("am here in all contacts success");
// //           setContacts(res.data.data);
// //         }
// //         if (res.data.status === false) {
// //           if (res.data.message === "jwt expired") {
// //             localStorage.removeItem("Chat-app-user");
// //             navigate("/login");
// //           }
// //           console.log("am here in all contacts error");
// //           toast.error(res.data.message, {
// //             position: "bottom-right",
// //             autoClose: 5000,
// //             pauseOnHover: true,
// //             draggable: true,
// //           });
// //         }
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };
// //   handelCurrentUser();
// //   useEffect(() => {
// //     handelAllContacts();
// //   });
// //   const handelChatChange = (chat) => {
// //     setCurrentChat(chat);
// //   };

// //   return (
// //     <>
// //       <Container>
// //         <div className="chat">
// //           <Contacts
// //             contacts={contacts}
// //             currentUser={currentUser}
// //             changeChat={handelChatChange}
// //           />
// //           {currentChat === undefined ? (
// //             <Welcome user={currentUser} />
// //           ) : (
// //             <ChatContainer
// //               currentChat={currentChat}
// //               currentUser={currentUser}
// //               socket={socket}
// //             />
// //           )}
// //         </div>
// //       </Container>
// //       <ToastContainer />
// //     </>
// //   );
// // }
// // const Container = styled.div`
// //   height: 100vh;
// //   width: 100vw;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: center;
// //   align-items: center;
// //   gap: 1rem;

// //   .chat {
// //     height: 98vh;
// //     width: 98vw;
// //     background-color: #333768;
// //     display: grid;
// //     border-radius: 3rem;
// //     grid-template-columns: 25% 75%;
// //     @media screen and(min-width:720px) and (max-width: 1024px) {
// //       grid-template-columns: 35% 65%;
// //     }
// //   }
// // `;

// // export default Chat;
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
  }
};
`;
export default Chat;

// import React, { useEffect, useState, useCallback } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";
// import ChatContainer from "../components/ChatContainer";
// import { io } from "socket.io-client";
// import { apiRoutes, host } from "../utils/apiRoutes";

// function Chat() {
//   const navigate = useNavigate();
//   const [contacts, setContacts] = useState([]);
//   const [currentUser, setCurrentUser] = useState({});
//   const [currentChat, setCurrentChat] = useState(undefined);

//   const socket = React.useRef(io(host));

//   useEffect(() => {
//     const token = localStorage.getItem("Chat-app-user");

//     if (!token) {
//       navigate("/login");
//     } else {
//       async function fetchData() {
//         try {
//           const currentUserRes = await axios.get(apiRoutes.currentUser, {
//             headers: {
// // // // // // Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           const { data } = currentUserRes;
//           if (data.status) {
//             setCurrentUser(data.data);
//           } else {
//             if (data.message === "jwt expired") {
//               localStorage.removeItem("Chat-app-user");
//               navigate("/login");
//             } else {
//               toast.error(data.message, {
//                 position: "bottom-right",
//                 autoClose: 5000,
//                 pauseOnHover: true,
//                 draggable: true,
//               });
//             }
//           }

//           const contactsRes = await axios.get(apiRoutes.getAll, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           const contactsData = contactsRes.data;
//           if (contactsData.status) {
//             setContacts(contactsData.data);
//           } else {
//             if (contactsData.message === "jwt expired") {
//               localStorage.removeItem("Chat-app-user");
//               navigate("/login");
//             } else {
//               toast.error(contactsData.message, {
//                 position: "bottom-right",
//                 autoClose: 5000,
//                 pauseOnHover: true,
//                 draggable: true,
//               });
//             }
//           }
//         } catch (error) {
//           console.error(error);
//         }
//       }

//       fetchData();
//     }
//   }, [navigate]);

//   const handelChatChange = useCallback((chat) => {
//     setCurrentChat(chat);
//   }, []);

//   return (
//     <Container>
//       <div className="chat">
//         <Contacts
//           contacts={contacts}
//           currentUser={currentUser}
//           changeChat={handelChatChange}
//         />
//         {currentChat === undefined ? (
//           <Welcome user={currentUser} />
//         ) : (
//           <ChatContainer
//             currentChat={currentChat}
//             currentUser={currentUser}
//             socket={socket}
//           />
//         )}
//       </div>
//       <ToastContainer />
//     </Container>
//   );
// }

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 1rem;

//   .chat {
//     height: 98vh;
//     width: 98vw;
//     background-color: #333768;
//     display: grid;
//     border-radius: 3rem;
//     grid-template-columns: 25% 75%;
//     @media screen and (min-width: 720px) and (max-width: 1024px) {
//       grid-template-columns: 35% 65%;
//     }
//   }
// }`;

// export default Chat;
