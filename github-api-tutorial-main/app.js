// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');
    let repoInput = document.getElementById('repoInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;
    let gitHubRepo = repoInput.value;

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername, gitHubRepo)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
            for (let i in data) {
                // Get the ul with id of userRepos

                if (data.message === "Not Found") {
                    let alertContainer = document.getElementById('alertContainer');
                    alertContainer.innerHTML = (`
                    <div class="alert alert-warning alert-dismissible" role="alert">
                        <strong>Catapimbas!</strong> Esse usuário ou repositório não existe.
                    </div>
                    `);
                    alertContainer.classList.remove('d-none')
                    let tableBody = document.getElementById('commitData');
                    tableBody.innerHTML = ''
                } else {
                    let alertContainer = document.getElementById('alertContainer');
                    alertContainer.classList.add('d-none')

            //         let ul = document.getElementById('userRepos');

            //         // Create variable that will create li's to be added to ul
            //         let li = document.createElement('li');

            //         // Add Bootstrap list item class to each li
            //         li.classList.add('list-group-item')

            //         // Create the html markup for each li
            //         li.innerHTML = (`
            //     <p><strong>Repo:</strong> ${data[i].commit.author.name}</p>
            //     <p><strong>Description:</strong> ${data[i].commit.author.date}</p>
            //     <p><strong>Description:</strong> ${data[i].commit.message}</p>
            //     <p><strong>URL:</strong> <a href="${data[i].commit.url}">${data[i].commit.url}</a></p>
            // `);
                    let tableBody = document.getElementById('commitData');

                    let tableRow = document.createElement('tr');
                    tableRow.innerHTML = (`
                    <td>${data[i].commit.author.date}</td>
                    <td>${data[i].commit.author.name}</td>
                    <td>${data[i].commit.message}</td>
                    <td><a href="${data[i].commit.url}">${data[i].commit.url}</a></td>
                    `);

                    tableBody.appendChild(tableRow);

                    // Append each li to the ul
                    // ul.appendChild(li);
                }
            }
        })
})

function requestUserRepos(username, repos) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${repos}/commits`));
}
