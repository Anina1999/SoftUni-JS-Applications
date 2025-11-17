function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;
    const list = document.getElementById('commits');

    list.innerHTML = '';

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error: ${res.status} (Not Found)`);
            }
            return res.json();
        })
        .then(data => {
            data.forEach(commit => {
                const li = document.createElement('li');
                li.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
                list.appendChild(li);
            });
        })
        .catch(error => {
            const li = document.createElement('li');
            li.textContent = error.message;
            list.appendChild(li);
        });
}