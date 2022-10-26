require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const router = require('./app/routers');
const userMiddleware = require('./app/middlewares/user');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static(path.join(__dirname, './assets')));
app.use(express.urlencoded({ extended : true }));

app.use(session({
   saveUninitialized: true,
   resave: true, //
   secret: process.env.SESSION_SECRET || 'Change Me !'
}));

app.use(userMiddleware);

app.use(router);


app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});