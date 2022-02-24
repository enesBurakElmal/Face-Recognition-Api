const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'enes',
    database: 'smartbrain',
  },
})

const app = express()
app.use(express.json())

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('it is working!')
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is runing on port ${process.env.PORT}`)
})

// CREATE TABLE login (
//   id serial PRIMARY KEY,
//   hash varchar(100) NOT NULL,
//   email text UNIQUE NOT NULL
// );

// CREATE TABLE USERS (
//   id serial PRIMARY KEY,
//   name VARCHAR(100),
//   email text UNIQUE NOT NULL,
//   entries BIGINT DEFAULT 0,
//   joined TIMESTAMP NOT NULL
// );
