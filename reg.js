document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();


    var loadingSpinner = document.getElementById('loading');
    loadingSpinner.style.display = 'block';


    const fileInput = document.getElementById('profileImage');
    if (fileInput.files.length === 0) {
        alert('Please select an image to upload.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('folder', '/Profile'); // Specify the folder path for profile photos

    // Replace 'your_private_api_key' with your actual private API key from ImageKit.io
    const privateApiKey = 'private_efxCGQMiGGtGBMe+XJseMZwB2FY=';
    const uploadEndpoint = 'https://upload.imagekit.io/api/v1/files/upload';

    fetch(uploadEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(privateApiKey + ':'),
        },
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                console.log('File uploaded successfully:', data.url);
                alert('File uploaded successfully: ' + data.url);

                // Prepare post object using other form data and uploaded image URL
                const otherFormData = new FormData(document.getElementById('registrationForm'));
                const post = {
                    username: otherFormData.get('username'),
                    password: otherFormData.get('password'),
                    profilePhoto: data.url, // Uploaded image URL
                };

                // Example console log to see the post object
                fetch('https://socialbackend-4uk5.onrender.com/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post) // Send post object as JSON string
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        alert('Registration successful!');
                        window.location.href = `index.html`;
                        loadingSpinner.style.display = 'none';
                        // Optionally redirect or do something else after successful registration
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('Registration failed!');
                        loadingSpinner.style.display = 'none';
                    });
            } else {
                console.error('Error uploading file:', data);
                alert('Error uploading file: ' + data.message);
                loadingSpinner.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading file: ' + error.message);
            loadingSpinner.style.display = 'none';
        });
});
