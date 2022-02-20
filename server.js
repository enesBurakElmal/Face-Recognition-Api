const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 3000,
    user: 'postgres',
    password: 'can12931993can',
    database: 'smart-brain',
  },
})

// db.select('*')
//   .from('users')
//   .then((data) => {
//     console.log(data)
//   })

const app = express()

app.use(bodyParser.json())
app.use(cors())

const database = {
  users: [
    {
      id: '123',
      name: 'enes',
      password: 'enes',
      email: 'enes@gmail.com',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'canberk',
      password: 'canberk',
      email: 'canberk@gmail.com',
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com',
    },
  ],
}

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0])
  } else {
    res.status(400).json('error logining in')
  }
})

app.post('/register', (req, res) => {
  const { email, name, password } = req.body
  db('users')
    .insert({
      email: email,
      name: name,
      joined: new Date(),
    })
    .then(console.log)
  res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params
  let found = false
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true
      return res.json(user)
    }
  })
  if (!found) {
    res.status(400).json('not found')
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body
  let found = false
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json('not found')
  }
})

// // Load hash from your password DB.

app.listen(3000, () => {
  console.log('app is running on port 3000')
})
