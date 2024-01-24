const express = require('express');
// const cors = require('cors');



const PORT = 3333;

const app = express();

// Create connection to our mysql database


// db.query('INSERT INTO users (username, email, password) VALUES ("Tino", "tino@test.com", "pass789")', (err, results) => {
//     if (err) return console.log(err);

//     console.log(results)
// });

// db.query('SELECT * FROM users', (err, results) => {
//     if (err) return console.log(err);

//     console.log(results);
// });

const api_routes = require('./routes/api_routes');




// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());

app.use(express.static('./public'));

// Load Routes
app.use('/api', api_routes);

// Start routes listening
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});



























// app.use(cors());
// app.get('/', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/index.html'))
// });

// app.get('/css/styles.css', (requestObj, responseObj) => {
//     responseObj.sendFile(path.join(__dirname, './public/css/style.css'))
// });

// Route to retrieve/Get all users from the json database








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