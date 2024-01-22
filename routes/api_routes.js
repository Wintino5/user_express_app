const router = require('express').Router();
const { v4 } = require('uuid');
const {getUserData, saveUserData} = require('../db');

router.get('/users', async (requestObj, responseObj) => {
    // Read the json file data
    const users = await getUserData();

    responseObj.send(users);
});

// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
    const users = await getUserData();
    const userData = requestObj.body;

    if (!users.find(user => user.username === userData.username) && userData.username) {
        
        userData.id = v4();
        
        users.push(userData);

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

// GET Route to return a user by ID
router.get('/users/:id', async (requestObj, responseObj) => {
    const user_id = requestObj.params.id;

    const users = await getUserData();

    const user = users.find(user => user.id === user_id);

    if (user) {
        return responseObj.send(user);
    }

    responseObj.send({
        error: 404,
        message: 'User not found with that ID'
    })
});

// DELETE Route to remove a user from the database
router.delete('/user/:id', async (requestObj, responseObj) => 
{
    // Get the user data
    const users = await getUserData();
    const user_id = requestObj.params.id;

    // Filter out the object matching our param id from the users array
    const filtered = users.filter(usrObj => usrObj.id !== user_id);

    
    // Overwrite the old array with the updated array (missing the user object)
    await saveUserData(filtered);
    
    responseObj.send({
        message: 'User deleted succesfully!'
    });
});

module.exports = router;



















// // Get the index of the user
// const index = users.indexOf(user);

// // Splice the users array, starting at the index of the user object matching the id from out parameter
// users.splice(index, 1);