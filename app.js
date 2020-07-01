require('dotenv').config();
//creates database connection
require("./core/db");

//function that will check all the passed .env variables are set
//if any is missing then it will terminate the server
((names) => {
    let shouldExit = false
    for (let i = 0; i < names.length; i++) {
        if (!process.env[names[i]]) {
            shouldExit = true
            console.log(`Missing ${names[i]} in .env`)
        }
    }
    if (shouldExit) {
        console.log('Recharge Portal Server Terminates')
        process.exit(0)
    }
})([
    'DB_URL',
    'BASE_URL',
    'PORT'
])

//intialize and start express server
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const passport = require('passport');
const app = express()
app.use(cors())

//require morgan for request logging
const morgan = require("morgan");
app.use(morgan("dev"));

app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
require('./core/middleware/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

// handlebar
const path = require('path');
const exbs = require('express-handlebars');
app.engine('.hbs',exbs({ defaultLayout: 'main', layoutDir:'views/layouts',extname:'.hbs' }));
app.set('view engine', '.hbs');

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Home Page',
        name:'Shubham',
        isCompleted:false
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        isDetailed: false
    })
})

app.get('/lookup', (req,res) => {
    res.render('lookup',{
        user:[
        {
            name:'shubham',
            age:'20',
            phone:988856452
        },
        {
            name:'shubh',
            age:'28',
            phone:9785412
        }
    ]
    })
})

app.get('/dashboard', (req,res) => {
    res.render('dashboard',{
        people:[
            'james',
            'peter',
        ],
        user:{
            name:'shubham',
            age:'20',
            phone:987456321
        }
    })
})

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../server/swagger.json');

// swagger api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use("/uploads/",express.static("uploads/"))

app.use(express.json())
app.use('/api/', require('./api/route'))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers","Content-Range")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.listen(process.env.PORT, () => console.log('Project Server Running....'))