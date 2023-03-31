require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const User = require('../jwt/model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const auth = require('./middleware/auth');
const cors = require('cors');


app.use(express.json());
app.use(cors());

//register function
app.post('/register', async (req, res, next) => {
    try {
        const { username, password, email  } = req.body;

        if(!(username && password && email)) {
            res.status(400).send("All inputs are required");
        }
        
        const olduser = await User.findOne({email});

        if (olduser){
            return res.status(409).send("User already exists");
        }

        encrytedpassword = await bcrypt.hash(password, 10);

        //crateuser
        const user = await User.create({
            username,
            password: encrytedpassword,
            email: email.toLowerCase()
        })

        //craetetoken
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        )
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
})

//login function
app.post('/api/login', async (req, res, next) => {
    try{
        // Get user input
        const { username, password} = req.body;
        
        // Validata user input
        if(!(username && password)){
            res.status(400).send("All inputs are required");
        }

        // Validate user exist
        const user = await User.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))){
            //create token
            const token = jwt.sign(
                { user_id: user._id, username},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h"
                }
            )
            user.token = token;
            res.status(200).json(user);
        }else{
            res.status(400).send("Invalid Credentials");
        }

    }
    catch(err){
        console.log(err);
    }
})

app.post('/welcome', auth, (req, res) =>{
    res.status(200).send("Welcome");
})

module.exports = app;