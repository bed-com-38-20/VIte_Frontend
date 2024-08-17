import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import User_Registration from './components/User_Registration';
import User_Login from './components/User_Login';
import DeleteAccount from './components/DeleteAccount';
import Delete from './components/Delete';
import Create_Post from './components/Create_Post';
import ChatRoom from './components/ChatRoom';
import { UserProvider } from './components/UserContext';

const ChatRoomWithParams = () => {
    const { roomName } = useParams();
    return <ChatRoom roomName={roomName} />;
};

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/User_Registration" element={<User_Registration />} />
                    <Route path="/User_Login" element={<User_Login />} />
                    <Route path="/DeleteAccount" element={<DeleteAccount />} />
                    <Route path="/Delete" element={<Delete />} />
                    <Route path="/Create_Post" element={<Create_Post />} />
                    <Route path="/chat/:roomName" element={<ChatRoomWithParams />} />
                    <Route path="/ChatRoom" element={<ChatRoom />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
