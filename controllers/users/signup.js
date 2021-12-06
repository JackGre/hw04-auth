const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const signup = async (req, res) => {
  const { password, email, subscription, token } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const result = await User.create({ password: hashPassword, email, subscription, token })
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        subscription
      }
    }
  })
}

module.exports = signup
