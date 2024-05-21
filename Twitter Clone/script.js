document.addEventListener("DOMContentLoaded", function() {
    const usersSelect = document.getElementById("users");
    const postsContainer = document.getElementById("posts");
    const commentsContainer = document.getElementById("comments");
    const profileArea = document.querySelector('.profileArea');

    localStorage.setItem("userId", 1);
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const option = document.createElement("option");
                option.value = user.id;
                option.textContent = user.name;
                usersSelect.appendChild(option);
            });
            usersSelect.value = 1;
            loadPosts(1);
            profileInfo();
        });

    usersSelect.addEventListener("change", function() {
        localStorage.setItem("userId", usersSelect.value);
        loadPosts(usersSelect.value);
        profileInfo();
    });

    function profileInfo() {
        fetch(`https://jsonplaceholder.typicode.com/users/${localStorage.getItem("userId")}`)
            .then(response => response.json())
            .then(user => {
                const { name, username, website, company: { catchPhrase }, address: { city } } = user;
                profileArea.innerHTML = `
                    <h2>${name}</h2> <br>
                    <p>@${username}</p> <br>
                    <p>${website}</p> <br>
                    <p>${catchPhrase}</p> <br>
                    <p><ion-icon name="location"></ionicon> ${city}</p>
                `;
            });
    }

    function loadPosts(userId) {
        postsContainer.innerHTML = "";
        commentsContainer.innerHTML = "";
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    const postItem = document.createElement("div");
                    postItem.className = "post-item";
                    postItem.dataset.postId = post.id;

                    

                    


                    const postImage = document.createElement("img");
                    postImage.src = "/pictures/pexels-moh-adbelghaffar-783941.jpg";
                    postImage.alt = "Post Image";

                    const postTitle = document.createElement("p");
                    postTitle.textContent = post.title;

                    const postReaction = document.createElement("div");
                    postReaction.className = "postReaction";
                    postReaction.innerHTML = `<br><p><ion-icon name="chatbox-ellipses-outline"></ion-icon>200</p><br>
                                              <p><ion-icon name="repeat-outline"></ion-icon>200</p>
                                              <p><ion-icon name="heart" style="color: red"></ion-icon>200</p>`


                    postItem.appendChild(postImage);
                    postItem.appendChild(postTitle);
                    postsContainer.appendChild(postItem);
                    postItem.appendChild(postReaction);
                });
                if (posts.length > 0) {
                    loadComments(posts[0].id);
                }
            });
    }

    postsContainer.addEventListener("click", function(event) {
        const postItem = event.target.closest(".post-item");
        if (postItem) {
            loadComments(postItem.dataset.postId);
        }
    });

    function loadComments(postId) {
        commentsContainer.innerHTML = "";
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comments => {
                comments.forEach(comment => {
                    const commentDiv = document.createElement("div");
                    commentDiv.className = 'pics';

                    const postImage = document.createElement("img");
                    postImage.src = "/pictures/pexels-moh-adbelghaffar-783941.jpg";
                    postImage.alt = "Post Image";


                    const commentName = document.createElement("h4");
                    commentName.textContent = comment.name;

                    const commentBody = document.createElement("p");
                    commentBody.textContent = comment.body;

                    const postReaction = document.createElement("div");
                    postReaction.className = "postReaction";
                    postReaction.innerHTML = `<br><p><ion-icon name="chatbox-ellipses-outline"></ion-icon>200</p><br>
                                              <p><ion-icon name="repeat-outline"></ion-icon>200</p>
                                              <p><ion-icon name="heart" style="color: red"></ion-icon>200</p>`

                    

                    commentDiv.appendChild(postImage);
                    commentDiv.appendChild(commentName);
                    commentDiv.appendChild(commentBody);
                    commentsContainer.appendChild(commentDiv);
                    commentDiv.appendChild(postReaction);
                });
            });
    }
});
