import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Delete = () => {
    
    const navigate = useNavigate();


    // Example of including token in headers for authenticated requests
const fetchUserData = async () => {
    const token = localStorage.getItem('access_token');
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/delete_account//', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


    

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
    
        try {
            // Assuming you need to include a token in the headers (e.g., for authentication):
            const token = localStorage.getItem('access_token'); // Retrieve any existing token if needed
    
            const response = await fetch('http://127.0.0.1:8000/api/delete_account/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Uncomment the following line if a token is required in the headers
                     'Authorization': `Token ${token}`,
                },
                
            });
    

            if (response.status === 204) {
                alert('Your account has been deleted.');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/');
            } else if (response.status === 401) {
                alert('Failed to delete account. Unauthorized access. Please log in again.');
                navigate('/login');
            } else {
                const responseData = await response.json();
                console.log('Delete response data:', responseData);
                alert('Failed to delete account.');
            }
            
        } catch (error) {
            setError('Error during login');
        }
    };
    
    return (
        <button 
        onClick={handleDeleteAccount} 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
        Delete My Account
    </button>
    );
};

export default Delete;
