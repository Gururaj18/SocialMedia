document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://my-json-server.typicode.com/Gururaj18/socialmedia/posts'; // Adjust the base URL as per your server setup

    // Function to fetch posts from the server
    function fetchPosts() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                const feeds = document.querySelector('.feeds');
                feeds.innerHTML = ''; // Clear existing posts before re-rendering

                data.reverse().forEach(post => {
                    const feed = createPostElement(post);
                    feeds.appendChild(feed);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    // Function to create HTML structure for each post
    function createPostElement(post) {
        const feed = document.createElement('div');
        feed.className = 'feed';
        feed.dataset.postId = post.id; // Store post id as a dataset attribute

        feed.innerHTML = `
            <div class="head">
                <div class="user">
                    <div class="profile-photo">
                        <img src="${post.profilePhoto}">
                    </div>
                    <div class="info">
                        <h3>${post.username}</h3>
                        <small>${post.location}</small>
                    </div>
                </div>
                <div class="actions">
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                </div>
            </div>
            <div class="photo">
                <img src="${post.postPhoto}">
            </div>
            <div class="action-buttons">
                <div class="interaction-buttons">
                    <span><i class="uil uil-heart"></i></span>
                    <span><i class="uil uil-comment-dots"></i></span>
                    <span><i class="uil uil-share-alt"></i></span>
                </div>
                <div class="bookmark">
                    <span><i class="uil uil-bookmark-full"></i></span>
                </div>
            </div>
            <div class="caption">
                <p><b>${post.username}</b> ${post.caption}
                ${post.hashtags.map(tag => `<span class="harsh-tag">${tag}</span>`).join('')}</p>
            </div>
        `;

        // Add event listeners for edit and delete buttons
        const editButton = feed.querySelector('.edit-button');
        const deleteButton = feed.querySelector('.delete-button');

        editButton.addEventListener('click', () => {
            // Implement edit functionality
            const newCaption = prompt('Enter new caption:', post.caption);
            if (newCaption !== null && newCaption.trim() !== '') {
                // Update caption in UI
                feed.querySelector('.caption p').innerHTML = `<b>${post.username}</b> ${newCaption}`;
                // Create updated post object
                const updatedPost = {
                    id: post.id,
                    username: post.username,
                    location: post.location,
                    profilePhoto: post.profilePhoto,
                    postPhoto: post.postPhoto,
                    caption: newCaption,
                    hashtags: post.hashtags
                };
                // Update post on server
                updatePost(post.id, updatedPost);
            }
        });

        deleteButton.addEventListener('click', () => {
            // Implement delete functionality
            const confirmDelete = confirm('Are you sure you want to delete this post?');
            if (confirmDelete) {
                // Remove post from UI
                feed.remove();
                // Delete post from server
                deletePost(post.id);
            }
        });

        return feed;
    }

    // Function to update a post on the server
    function updatePost(postId, updatedPost) {
        fetch(`${baseUrl}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update post');
            }
            console.log('Post updated successfully');
        })
        .catch(error => console.error('Error updating post:', error));
    }

    // Function to delete a post on the server
    function deletePost(postId) {
        fetch(`${baseUrl}/${postId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            console.log('Post deleted successfully');
        })
        .catch(error => console.error('Error deleting post:', error));
    }

    // Initial fetch of posts when DOM content is loaded
    fetchPosts();
});
