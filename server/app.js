const express = require('express');
const app = express();
require('dotenv').config();
const connect = require("./config/mongodb");
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')

const userRoute = require('./routes/indexRoute.js')
const adminRoute = require('./routes/adminRoute.js')
const ORIGIN = process.env.NODE_ENV === 'development' ? "http://localhost:4000" : 'https://thalia.vercel.app'
const corsConfig = {
    origin: ORIGIN,
    credentials: true,
};

//middlewares
connect();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors(corsConfig))

//routes
app.use('/api', userRoute)
app.use('/api/admin', adminRoute)

//error handler
app.use('*', notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => console.log('listening on port ' + process.env.PORT))