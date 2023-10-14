export const host = 'https://chatoooo.onrender.com';
// export const host = 'http://localhost:4000';
export const apiRoutes = {
    register: `${host}/api/auth/register`,
    login: `${host}/api/auth/login`,
    logout: `${host}/api/auth/logout`,
    setImg: `${host}/api/auth/setimg`,
    getAll: `${host}/api/user/allUsers`,
    currentUser: `${host}/api/user/currentUser`,
    markChatAsSeen: `${host}/api/chat/markChatAsSeen`,
    addMessage: `${host}/api/chat/addMessage`,
    getAllMessages: `${host}/api/chat/getAllMessages`,
}