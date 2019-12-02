// implement your API here
const express = require('express')
const db = require('./data/db.js')

const server = express()

server.use(express.json())

server.get('/users', (req, res) => {
    db
        .find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            console.log('GET /users', error)
            res.status(500).json({ message: 'Server was unable to get users from database.' })
        })
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id

    db
        .findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json('User not found.')
            } else {
                res.status(200).json(user)
            }
        })
        .catch(error => {
            console.log('GET /users/:id', error)
            res.status(500).json({ message: 'Server was unable to find user.' })
        })
})

server.post('/users', (req, res) => {
    const userData = req.body

    db
        .insert(userData)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            console.log('POST /users', error)
            res.status(500).json({ message: 'Server unable to add user.' })
        })
})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id

    db
        .remove(id)
        .then(removedUser => {
            if (!removedUser) {
                res.status(404).json({ message: 'User not found.' })
            } else {
                res.status(200).json({ message: 'User was successfully deleted!' })
            }
        })
        .catch(error => {
            console.log('DELETE /users/:id', error)
            res.status(500).json({ message: 'Server was unable to delete user.' })
        })
})

server.put('/users/:id', (req, res) => {
    const id =  req.params.id
    const user = req.body

    db
    .update(id, user)
    .then(user => {
        if(!user){
            res.status(400).json({ message: 'Please provide name and bio for the user.' })
        } else {
            res.status(201).json({ message: 'User was successfully updated!' })
        }
    })
    .catch(error => {
        console.log('PUT /users/:id', error)
        res.status(500).json({ message: 'Server was unable to complete updated request.'})
    })
})

const port = 5000
server.listen(port, () => console.log(`\n API running on port ${port} \n`))