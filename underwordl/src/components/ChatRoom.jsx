import React, { useState, useEffect } from 'react';

const ChatRoom = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    // Ensure roomName is defined and valid
    if (!roomName) {
        return <div>Error: No room name provided.</div>;
    }

    const wsUrl = `ws://127.0.0.1:8000/ws/chat/${roomName}/`;
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(wsUrl);
        setSocket(socket);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };

        socket.onclose = (event) => {
            console.log('WebSocket closed:', event);
        };

        // Clean up on unmount
        return () => {
            socket.close();
        };
    }, [wsUrl]);

    const sendMessage = () => {
        if (socket) {
            socket.send(JSON.stringify({ message: newMessage }));
            setNewMessage('');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-4">
            <div className="mb-4 h-64 overflow-y-auto border border-gray-300 rounded-lg p-2">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Type your message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
