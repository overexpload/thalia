const express = require('express');
const app = express();
require('dotenv').config();
const connect = require("./config/mongodb");
const cors = require('cors')
const morgan = require('morgan')

const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const ORIGIN = process.env.NODE_ENV === 'development' ? "http://localhost:4000" : ''
const corsConfig = {
    origin: ORIGIN,
    credentials: true,
};

//middlewares
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(corsConfig))

//routes
app.use('/', userRouter)
app.use('/admin', adminRouter)

connect();
app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT))