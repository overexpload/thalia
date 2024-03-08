const express = require('express');
const app = express();
require('dotenv').config();
const connect = require("./config/mongodb");

connect();
app.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        message: 'connected successfully'
    })
})
app.listen(process.env.PORT,()=>console.log('listening on port '+process.env.PORT))