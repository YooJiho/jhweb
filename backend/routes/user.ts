import Koa from 'koa'
import Router from 'koa-router'
import bcrypt from 'bcrypt'
import User from '../models/user'
import passport from 'koa-passport'
import passportConfig from '../passport'

const userRouter: Router = new Router()

userRouter.post('/', async (ctx, next) => {
  const { userId, password, nickname } = ctx.request.body
  const hash = await bcrypt.hash(password, 12)
  try {    
    const newUser = await User.create({
        userId,
        password: hash,
        nickname
    })

    ctx.status = 201
    ctx.body = newUser
  } catch (error) {
    console.log(error)
    return next()
  }
})

userRouter.post('/login', async (ctx, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err)
      return next()
    }
    
    if (info) {
      ctx.status = 401
      ctx.body = info.message
      return ctx
    }
    
    return ctx.login(user, async (error: any) => {
      if (error) {
        console.error(error)
        return next()
      }

      return ctx.json(user)
    })
  })(ctx, next)
})

export default userRouter