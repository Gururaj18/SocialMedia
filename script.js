document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://my-json-server.typicode.com/Gururaj18/socialmedia/users');
        const data = await response.json();

        const user = data.find(u => u.username === username && u.password === password);

        if (user) {
            // Successful login
            alert('Login successful!');

            // Store user information in localStorage
            localStorage.setItem('username', user.username);
            localStorage.setItem('profilePhoto', user.profilePhoto);

            // Redirect to the next page
            window.location.href = 'posts.html';
        } else {
            // Invalid credentials
            document.getElementById('error').textContent = 'Invalid username or password.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'Error processing request. Please try again later.';
    }
});
