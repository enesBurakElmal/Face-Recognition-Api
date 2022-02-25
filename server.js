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
    connectionString:
      process.env.DATABASE_URL ||
      'postgres://zsdncmfhtjyrdd:574eb7fba95eee735e9a8489d18d2ef00823dcd98c3b757e08cc16dc03959509@ec2-3-219-204-29.compute-1.amazonaws.com:5432/de2i88qqbl79qv',
    ssl: {
      rejectUnauthorized: false,
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
