//Asynchronous
console.log('before');

//Callback implementation
////////////////////////////
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//         });
//     });
// })

//Promise implementation
////////////////////////////
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits: ',commits))
//     .catch(err => console.log('Error',err.message));

//Async and Await
////////////////////////////
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error',err.message);
    }
}
displayCommits();

console.log('after');

function getCommits(repo) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Calling Github API...');
            resolve(['commit']);
        }, 2000);
    });
}


function getUser(id) {
    return new Promise((resolve,reject) => {
        //Kick off some async work
        setTimeout(()=> {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('calling Github API...');
            reject(new Error('Couldnt get Repos'));
        }, 2000);
    })
}