const router = require('express').Router()
const bcrypt = require('bcrypt')

const jwtConfig = require('../config/jwtConfig')
const generateTokens = require('../utils/generateTokens')
const verifyRefreshToken = require('../middleware/verifyRefreshToken')

const UserAuthRegService = require('../services/UserAuthReg.service')

router.post('/registration', async (req, res) => {
  try {
    const { email, password } = req.body
    if (email.trim === '' || password.trim() === '') {
      console.log('Please, fill the fields');
      return res.status(400).json({ message: 'Please, fill the fields' })
    }

    let user = await UserAuthRegService.getUserByEmail(email)

    if (!user) {
      user = await UserAuthRegService.addUser({
        email, 
        password: await bcrypt.hash(password, 10)
      })

      delete user.password
      res.locals.user = user

      const { accessToken, refreshToken } = generateTokens({ user })
      res.status(201).cookie(jwtConfig.refresh.type, refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      }).json({ message: 'success', user, accessToken })
      return
    }
    res.status(400).json({ message: 'This email already existing' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body
    if (email.trim() === '' || password.trim() === '') {
      console.log('Please, fill the fields');
    }

    const user = await UserAuthRegService.getUserByEmail(email)
    if (user) {
      const comparePassword = await bcrypt.compare(password, user.password)
      if (comparePassword) {
        delete user.password
        res.locals.user = user

        const { accessToken, refreshToken } = generateTokens({ user })
        res.status(201).cookie(jwtConfig.refresh.type, refreshToken, {
          httpOnly: true,
          maxAge: jwtConfig.refresh.expiresIn,
        }).json({ message: 'success', user, accessToken })
        return
      }
    }
    res.status(400).json({ message: 'Email or password is not correct' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/logout', async (req, res) => {
  try {
    res.locals.user = null

    res.clearCookie('refreshToken').status(204).json({ message: 'Success logout' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/refresh', verifyRefreshToken, async (req, res) => {
  try {
    const { user } = res.locals
    const { accessToken, refreshToken } = generateTokens({ user })
    res.status(200).cookie(jwtConfig.refresh.type, refreshToken, {
      httpOnly: true,
      maxAge: jwtConfig.refresh.expiresIn
    }).json({ message: 'success', user, accessToken })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})