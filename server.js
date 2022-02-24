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
    connectionString: process.env.DATABASE_URL || 'postgres://smartbrain',
    ssl: {
      rejectUnauthorized: true,
    },
  },
})

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send(db.users)
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

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port
  console.log(`Express is working on port ${port}`)
})
