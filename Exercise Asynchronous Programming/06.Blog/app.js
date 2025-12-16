function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/blog/';
    const loadPostBtn = document.getElementById('btnLoadPosts');
    const viewPostBtn = document.getElementById('btnViewPost');
    const select = document.getElementById('posts');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    const blog = {
        posts: 'posts',
        comments: 'comments'
    };

    let allPosts = {};

    loadPostBtn.addEventListener('click', loadPosts);
    viewPostBtn.addEventListener('click', viewPosts);

    async function loadPosts() {
        const response = await fetch(BASE_URL + blog.posts);
        const data = await response.json();

        allPosts = data; 
        select.innerHTML = '';

        Object.values(data).forEach(p => {
            const option = document.createElement('option');
            option.value = p.id;  
            option.textContent = p.title;
            select.appendChild(option);
        });
    }

    async function viewPosts() {
        const postId = select.value;
        const currentPost = Object.values(allPosts).find(p => p.id === postId);

        postTitle.textContent = currentPost.title;
        postBody.textContent = currentPost.body;
        postComments.innerHTML = '';

        const commentsResponse = await fetch(BASE_URL + blog.comments);
        const commentsData = await commentsResponse.json();

        Object.values(commentsData)
            .filter(c => c.postId === postId)
            .forEach(c => {
                const li = document.createElement('li');
                li.textContent = c.text;
                postComments.appendChild(li);
            });
    }
}

attachEvents();