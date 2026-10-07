const callApi = async (url, method = 'GET', body = null) => {
    return await fetch(url, { method, body, headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            console.log('API response data:', data);
            return data;
        })
        .catch(error => console.error('Error loading songs:', error));
};

export { callApi };