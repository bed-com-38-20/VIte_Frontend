export const makeAuthenticatedRequest = async (endpoint, options = {}) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const url = `http://127.0.0.1:8000${endpoint}`;

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${accessToken}`,  // Ensure this header is correctly set
        },
    });

    if (!response.ok && response.status === 401) {
        console.error('Unauthorized: Token may have expired.');
        // Handle unauthorized case (e.g., redirect to login)
    }

    return response;
};
