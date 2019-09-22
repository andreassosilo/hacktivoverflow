'use strict'

const router = require('express').Router()
// const userRouter = require('./user')
// const {authentication} = require('../middlewares/authentication')

router.get('/', (req, res) => {
  res.status(200).json({ page: 'Home', message: 'Connected to HacktivOverflow Apps!' })
})

// Routing
// router.use('/users', userRouter)
// router.use(authentication)

module.exports = router
