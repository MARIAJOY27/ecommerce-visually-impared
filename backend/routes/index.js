const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'group3ProjectEcommerce'
const authenticateToken = require('../middlewares/authMiddleware')
const db = require('../firebase/db')

router.get('/', authenticateToken, (req, res) => {
    res.json({ user: req.user })
})

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    db.checkUserExists(username).then((user) => {
        if (user)
            return res.status(409).json({ message: 'Username exists, try different!' })

        db.addUser(username, password).then(() => {
            const token = jwt.sign({ username, password }, SECRET_KEY);
            res.json({ message: "success", token, user: username })
        }).catch(() => {
            return res.status(409).json({ message: 'Please try again!' })
        })
    }).catch(() => res.status(409).json({ message: 'Username exists, try different!' }))

})

router.post('/login', (req, res) => {
    const { username, password } = req.body;


    db.getUser(username).then((user) => {
        if (user.password !== password)
            return res.status(401).json({ message: "Invalid credentials" })
        else {
            const token = jwt.sign({ username, password }, SECRET_KEY);
            res.json({ message: 'Login Success', token, user: username })
        }
    }).catch(() => res.status(401).json({ message: "Invalid credentials" }))

    /*
       const user = db.getUser(username);
       if (!user)
           return res.status(401).json({ message: "No account found, create one how!" })
   
       if (user.password !== password)
           return res.status(401).json({ message: "Invalid credentials" })
   
       const token = jwt.sign({ username, password }, SECRET_KEY);
       res.json({ message: 'Login Success', token, user: username })
   */
})

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "access granted", user: req.user })
})

module.exports = router