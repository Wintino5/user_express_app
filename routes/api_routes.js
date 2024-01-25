const router = require('express').Router();

const db = require('../db/connection');
// const { v4 } = require('uuid');
// const {getUserData, saveUserData} = require('../db');

router.get('/users', async (requestObj, responseObj) => {
    // Make a query to the db and get all rows from the users table
    try {
        const [users] = await db.query('SELECT * FROM users');

        responseObj.json(users);
    } catch (err) {
        console.log(err);
    }   
    
    // Read the json file data
    // const users = await getUserData();

    // responseObj.send(users);
});

// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
    // const users = await getUserData();
    const userData = requestObj.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [userData.username]);

        if (results.length) {
            return responseObj.json({
                error: 402,
                message: 'That user already exists'
            });
        }

        const [data] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [userData.username, userData.email, userData.password]);

            responseObj.json({
                message: 'User added Successfully',
                insertId: data.insertId
            });
            
    } catch (err) {
        console.log(err);
    }

    // Run a query to INSERT a new user into the users table, with our requestObj.body data (username, email, password)
    

    // if (!users.find(user => user.username === userData.username) && userData.username) {
        
    //     userData.id = v4();
        
    //     users.push(userData);

    //     await saveUserData(users);

    //     return responseObj.send({
    //         messgae: 'User added Succesfully'
    //     })
    // }

    // responseObj.send({
    //     error: 402,
    //     message: 'User already exists'
    // });

});

// GET Route to return a user by ID
router.get('/users/:id', async (requestObj, responseObj) => {
    const user_id = requestObj.params.id;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE id = ?', [user_id]);
    
            if (results.length) {
                return responseObj.json(results[0]);
            }
            responseObj.json({
                error: 404,
                message: 'User not found with that ID'
            })
    } catch (err) {
        console.log(err);
    }


    // const users = await getUserData();

    // const user = users.find(user => user.id === user_id);

    // if (user) {
    //     return responseObj.send(user);
    // }

});

// DELETE Route to remove a user from the database
router.delete('/users/:id', async (requestObj, responseObj) => {
    const user_id = requestObj.params.id;
    // Get the user data

    try {
        const [results] = await db.query('DELETE FROM users WHERE id = ?', [user_id]);

            // if (results.length) {
            //     return responseObj.json(results[0]);
            // }

        
            responseObj.send({
                message: 'User deleted succesfully!'
            });
    } catch (err) {
        console.log(err)
    }
    // const users = await getUserData();

    // Filter out the object matching our param id from the users array
    // const filtered = users.filter(usrObj => usrObj.id !== user_id);

    
    // Overwrite the old array with the updated array (missing the user object)
    // await saveUserData(filtered);
    
    
});

module.exports = router;



















// // Get the index of the user
// const index = users.indexOf(user);

// // Splice the users array, starting at the index of the user object matching the id from out parameter
// users.splice(index, 1);