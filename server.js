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
<<<<<<< HEAD
    connectionString: process.env.DATABASE_URL,
    ssl: true,
||||||| 87570d42
    host: '127.0.0.1',
    user: 'postgres',
    password: 'enes',
    database: 'smartbrain',
=======
    connectionString:
      process.env.DATABASE_URL ||
      'postgres://zsdncmfhtjyrdd:574eb7fba95eee735e9a8489d18d2ef00823dcd98c3b757e08cc16dc03959509@ec2-3-219-204-29.compute-1.amazonaws.com:5432/de2i88qqbl79qv',
    ssl: {
      rejectUnauthorized: false,
    },
>>>>>>> e4e2f40947c6970f62ba6e6eadc2095fc803700b
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

<<<<<<< HEAD
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
||||||| 87570d42
app.set('port', PORT)
=======
const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port
  console.log(`Express is working on port ${port}`)
})
>>>>>>> e4e2f40947c6970f62ba6e6eadc2095fc803700b
