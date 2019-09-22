'use strict'

const { generateToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcryptjs')
const { User } = require('../models')

class UserController {
  static register (req, res, next) {
    const { name, email, password } = req.body
    User.create({ name, email, password })
      .then((user) => {
        const payload = {
          id: user._id,
          email: user.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          message: 'Successfully registered',
          token: token
        })
      })
      .catch(next)
  }

  static login (req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then((user) => {
        // Return a User object according to email
        if (user) {
          if (checkPassword(password, user.password)) {
            /// Create token using jsonwebtoken
            const payload = {
              id: user._id,
              email: user.email
            }
            const token = generateToken(payload)
            console.log(token)
            res.status(200).json({ message: 'User successfully signed in...', token })
          } else {
            next({ status: 404, message: 'username/password is invalid!' })
          }
        } else {
          next({ status: 404, message: 'username/password is invalid!' })
        }
      }).catch(next)
  }
}

module.exports = UserController
