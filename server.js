const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3333;

const app = express();

async function getUserData() {
    const users = await fs.promises.readFile('./data.json', 'utf8');

    return JSON.parse(users);
}
async function saveUserData(usersArr) {
    await fs.promises.writeFile('./data.json', JSON.stringify(usersArr, null, 2));

    console.log('User Data Updated')
}



// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

// Route to retrieve/Get all users from the json database
app.get('/api/users', async (requestObj, responseObj) => {
    // Read the json file data
    const users = await fs.promises.readFile('./data.json', 'utf8');

    responseObj.send(users);
});

// Route to add a user to the json database
app.post('/api/users', async (requestObj, responseObj) => {
    const users = await getUserData();

    if (!users.find(user => user.username === requestObj.body.username) && requestObj.body.username) {
        users.push(requestObj.body);

        await saveUserData(users);

        return responseObj.send({
            messgae: 'User added Succesfully'
        })
    }

    responseObj.send({
        error: 402,
        message: 'User already exists'
    });

});


// Start routes listening
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});



































// Get Route - Listening for the client to visit localhost:3333/test

// app.get('/test', (requestObj, responseObj) => {
//     responseObj.send('Hi from the server!');
// });

// app.get('/', (requestObj, responseObj) => {
//     responseObj.send('root visited');
// });

// app.get('/api/recipe', (requestObj, responseObj) => {
//     responseObj.send({
//         name: 'Mac & Cheese',
//         ingredients: ['cheese', 'pasta', 'heavy cream']
//     });
// });

// app.get('/page', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './index.html'));
// });

// app.use((requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './notfound.html'));
// });