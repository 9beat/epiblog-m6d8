import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
// routes
import usersRoute from  './routes/users.js'
import loginRoute from  './routes/login.js'
import postsRoute from './routes/posts.js'

dotenv.config()
const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/', usersRoute)
app.use('/', loginRoute)
app.use('/', postsRoute)

// db config
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.once('open', ()=>{
    console.log('Server connected to database')
})
db.on('error', console.error.bind(console, 'Error connecting to database'));


app.listen(PORT, ()=> {
    console.log(`Server connected on port ${PORT}`)
})

