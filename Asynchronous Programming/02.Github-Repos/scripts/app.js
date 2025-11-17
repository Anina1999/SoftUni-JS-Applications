function loadRepos() {
	// read input value
	// get user repos using input
	// if no error:
	// - output repos in list
	// otherwise:
	// - show error message

	const list = document.getElementById('repos');
	const username = document.getElementById('username').value;

	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(res => {
			if(!res.ok) {
				throw res.json();
			}

			return res.json();
		})
		.then(data => {
			list.innerHTML = (data.map(r => `<li><a href="${r.html_url}">${r.full_name}</a></li>`).join('\n'));
			console.log(data[0].html_url);
			console.log(data[0].full_name);
		})
		.catch(errPromise => {
			if(errPromise instanceof Promise) {
				errPromise.then(err => handleError(err.message));
			} else {
				handleError(errPromise.message);
			}
			
		});

		function handleError(message) {
			list.innerText = message;
		}
}