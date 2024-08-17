import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeAuthenticatedRequest } from '../utils/api';

const DeleteAccount = () => {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmation) return;

        // Retrieve the access token from localStorage
        const accessToken = localStorage.getItem('access_token');
        console.log('Retrieved Access Token:', accessToken);  // Log the token to verify it's retrieved correctly

        if (!accessToken) {
            alert('No access token found. Please log in again.');
            navigate('/login');
            return;
        }

        try {
            const response = await makeAuthenticatedRequest('/api/delete_account/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
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
            console.error('Error deleting account:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <button onClick={handleDeleteAccount} className="delete-button">
            Delete My Account
        </button>
    );
};

export default DeleteAccount;
